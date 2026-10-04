"""Export the selected Flow footage, preserving its complete physical path.

Source selection is 8 + 6 + 6 + 6 seconds. Uniform 13/12 speed converts
26 seconds into 24; no dissolves, freezes, synthetic interpolation or new scenes.
Run with source files in the canonical Desktop production job.
"""
import argparse
import json
import shutil
import subprocess
from pathlib import Path
from PIL import Image


def run(*args):
    subprocess.run([str(a) for a in args], check=True)


parser = argparse.ArgumentParser()
parser.add_argument('--source-dir', type=Path, required=True)
parser.add_argument('--ffmpeg', default='ffmpeg')
parser.add_argument('--ffprobe', default='ffprobe')
parser.add_argument('--web-only', action='store_true', help='Reuse the existing master for web export')
args = parser.parse_args()
source = args.source_dir.resolve()
assets = Path(__file__).resolve().parents[1] / 'assets' / 'flow-journey'
frames = assets / 'frames'
frames.mkdir(parents=True, exist_ok=True)
clips = [
    ('SEAM-clip-01-repair-1080p.mp4', 192),
    ('SEAM-clip-02a-lobby-turn-1080p.mp4', 144),
    ('SEAM-clip-02b-repair-room-entry-1080p.mp4', 144),
    ('SEAM-clip-03-terrace-1080p.mp4', 144),
]
inputs = []
filters = []
for i, (name, count) in enumerate(clips):
    path = source / name
    info = json.loads(subprocess.check_output([
        args.ffprobe, '-v', 'error', '-show_streams', '-of', 'json', str(path)
    ]))
    video = next(s for s in info['streams'] if s['codec_type'] == 'video')
    assert (video['width'], video['height'], video['avg_frame_rate']) == (1920, 1080, '24/1'), name
    assert int(video['nb_frames']) >= count, name
    inputs += ['-i', path]
    filters.append(f'[{i}:v]trim=end_frame={count},setpts=PTS-STARTPTS[v{i}]')
filters.append('[v0][v1][v2][v3]concat=n=4:v=1:a=0,setpts=PTS*12/13,fps=24:round=near,trim=end_frame=576,setpts=N/(24*TB)[out]')
master = source / 'SEAM-full-journey-24s-1080p.mp4'
if not args.web_only:
    run(args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-y',
        '-filter_complex_threads', '2', *inputs, '-filter_complex', ';'.join(filters),
        '-map', '[out]', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17',
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', master)
info = json.loads(subprocess.check_output([
    args.ffprobe, '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(master)
]))
assert len(info['streams']) == 1
assert info['streams'][0]['nb_frames'] == '576'
assert float(info['format']['duration']) == 24.0
run(args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-i', master, '-f', 'null', '-')
shutil.copy2(master, assets / 'seam-full-journey.mp4')
decoder = subprocess.Popen([
    args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-i', str(master),
    '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'
], stdout=subprocess.PIPE)
size = 1920 * 1080 * 3
for index in range(576):
    pixels = decoder.stdout.read(size)
    assert len(pixels) == size, f'Incomplete frame {index}'
    Image.frombytes('RGB', (1920, 1080), pixels).save(
        frames / f'{index:04d}.webp', quality=82, method=5)
assert not decoder.stdout.read(1), 'Unexpected trailing frame'
assert decoder.wait() == 0
assert len(list(frames.glob('*.webp'))) == 576
for name, index in [('poster', 0), ('courtyard', 69), ('lobby', 259), ('room', 437), ('terrace', 575)]:
    shutil.copy2(frames / f'{index:04d}.webp', assets / f'{name}.webp')
print(json.dumps({'master': str(master), 'frames': 576, 'bytes': sum(p.stat().st_size for p in frames.glob('*.webp'))}))
