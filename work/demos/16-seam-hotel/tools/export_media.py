"""Encode the locally rendered camera sequence into bounded web assets.

Use the bundled Python runtime with Pillow. Sources remain in the staging job.
python tools/export_media.py /absolute/staging
"""
from pathlib import Path
from PIL import Image
import argparse, subprocess, json

parser = argparse.ArgumentParser()
parser.add_argument('staging', type=Path)
parser.add_argument('--posters-only', action='store_true')
args = parser.parse_args()
assets = Path(__file__).resolve().parents[1] / 'assets'
assets.mkdir(exist_ok=True)
for source_name, target_name in [('arrival','poster'),('courtyard','courtyard'),('lobby','lobby'),('room','room'),('terrace','terrace')]:
    with Image.open(args.staging/'previews'/f'{source_name}.png') as image:
        image.convert('RGB').save(assets/f'{target_name}.webp',quality=88,method=6)
if not args.posters_only:
    frames = sorted((args.staging/'frames').glob('frame-*.png'))
    if len(frames) != 481:
        raise ValueError(f'Expected 481 complete frames, found {len(frames)}')
    folder=assets/'frames'; folder.mkdir(exist_ok=True)
    for index, source in enumerate(frames):
        with Image.open(source) as image:
            image.convert('RGB').save(folder/f'{index:04}.webp',quality=78,method=4)
    subprocess.run(['ffmpeg','-y','-loglevel','error','-framerate','20','-i',str(args.staging/'frames'/'frame-%04d.png'),'-c:v','libx264','-preset','slow','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart','-an',str(assets/'seam-journey.mp4')],check=True)
    size=sum(p.stat().st_size for p in folder.glob('*.webp'))
    print(json.dumps({'frames':len(frames),'sequence_bytes':size,'movie_bytes':(assets/'seam-journey.mp4').stat().st_size}))
