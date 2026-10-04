"""SEAM's original architectural study. Blender 5.2, no downloaded geometry.

blender -b --python tools/build_scene.py -- --output /absolute/staging --preview
blender -b --python tools/build_scene.py -- --output /absolute/staging --animate
The same camera path supplies every poster, room still and scrub frame.
"""
import bpy, math, random, argparse, sys, os, json
from mathutils import Vector

parser = argparse.ArgumentParser()
parser.add_argument('--output', required=True)
parser.add_argument('--preview', action='store_true')
parser.add_argument('--animate', action='store_true')
parser.add_argument('--width', type=int, default=1280)
parser.add_argument('--samples', type=int, default=32)
args = parser.parse_args(sys.argv[sys.argv.index('--') + 1:])
os.makedirs(args.output, exist_ok=True)
random.seed(23)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
s = bpy.context.scene
s.render.engine = 'BLENDER_EEVEE'
s.eevee.taa_render_samples = args.samples
s.eevee.use_raytracing = True
s.eevee.use_fast_gi = True
s.eevee.fast_gi_method = 'GLOBAL_ILLUMINATION'
s.eevee.fast_gi_distance = 6
s.eevee.fast_gi_ray_count = 2
s.eevee.shadow_ray_count = 2
s.eevee.shadow_step_count = 6
s.render.resolution_x = args.width
s.render.resolution_y = round(args.width * 9 / 16)
s.render.resolution_percentage = 100
s.render.image_settings.file_format = 'PNG'
s.render.fps = 20
s.frame_start, s.frame_end = 1, 481
s.view_settings.view_transform = 'AgX'
s.view_settings.look = 'AgX - Medium High Contrast'
s.view_settings.exposure = -.3
s.world.use_nodes = True
wn=s.world.node_tree.nodes; wl=s.world.node_tree.links
coord=wn.new('ShaderNodeTexCoord'); separate=wn.new('ShaderNodeSeparateXYZ')
wl.new(coord.outputs['Normal'], separate.inputs[0])
sky_ramp=wn.new('ShaderNodeValToRGB')
sky_ramp.color_ramp.elements[0].position=.0
sky_ramp.color_ramp.elements[0].color=(.78,.88,.97,1)
sky_ramp.color_ramp.elements[1].position=.65
sky_ramp.color_ramp.elements[1].color=(.18,.39,.68,1)
sky_direction=wn.new('ShaderNodeMath'); sky_direction.operation='MULTIPLY'; sky_direction.inputs[1].default_value=-1
wl.new(separate.outputs['Z'],sky_direction.inputs[0]); wl.new(sky_direction.outputs[0],sky_ramp.inputs[0])
wl.new(sky_ramp.outputs[0],wn['Background'].inputs[0])
wn['Background'].inputs[1].default_value=.8

def material(name, color, rough=.7, noise=None, metal=0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    n = m.node_tree.nodes; l = m.node_tree.links; p = n.get('Principled BSDF')
    p.inputs['Base Color'].default_value = (*color, 1)
    p.inputs['Roughness'].default_value = rough
    p.inputs['Metallic'].default_value = metal
    if noise:
        tex = n.new('ShaderNodeTexNoise'); tex.inputs['Scale'].default_value = noise[0]
        tex.inputs['Detail'].default_value = 3
        ramp = n.new('ShaderNodeValToRGB')
        ramp.color_ramp.elements[0].color = (*[c*.82 for c in color], 1)
        ramp.color_ramp.elements[1].color = (*color, 1)
        l.new(tex.outputs['Fac'], ramp.inputs[0]); l.new(ramp.outputs[0], p.inputs['Base Color'])
        bump = n.new('ShaderNodeBump'); bump.inputs['Strength'].default_value = noise[1]
        bump.inputs['Distance'].default_value = .06
        l.new(tex.outputs['Fac'], bump.inputs['Height']); l.new(bump.outputs[0], p.inputs['Normal'])
    return m

plaster = material('Chalk lime plaster', (.76,.72,.65), .84, (28,.19))
stone = material('Grey warm limestone', (.48,.47,.43), .8, (7,.22))
dark = material('Smoked oak', (.13,.082,.049), .53, (5,.25))
wood = material('Oak deck', (.40,.27,.16), .6, (7,.16))
linen = material('Ivory linen', (.89,.86,.78), .94, (90,.26))
beige = material('Boucle upholstery', (.61,.56,.45), .98, (60,.3))
rug = material('Woven sand rug', (.49,.44,.34), .99, (80,.35))
olive = material('Olive silver green', (.18,.23,.12), .92)
brass = material('Brushed bronze', (.36,.26,.13), .36, metal=.7)
black = material('Graphite', (.032,.038,.036), .6)
sand = material('Dry coastal earth', (.51,.49,.42), .96, (2,.32))
glass = material('Clear architectural glass', (.83,.91,.94), .06)
glass.node_tree.nodes['Principled BSDF'].inputs['Transmission Weight'].default_value = 1
gn=glass.node_tree.nodes; gl=glass.node_tree.links
clear=gn.new('ShaderNodeBsdfTransparent'); mix=gn.new('ShaderNodeMixShader'); mix.inputs[0].default_value=0
gl.new(clear.outputs[0],mix.inputs[1]); gl.new(gn['Principled BSDF'].outputs[0],mix.inputs[2])
gl.new(mix.outputs[0],gn['Material Output'].inputs['Surface'])
water = material('Slate sea', (.12,.24,.29), .21, (18,.16), .25)
pool = material('Still courtyard water', (.16,.22,.19), .13, (3,.08), .3)

def box(name, at, size, mat, bevel=.025):
    bpy.ops.mesh.primitive_cube_add(size=1, location=at)
    o = bpy.context.object; o.name = name; o.dimensions = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    o.data.materials.append(mat)
    if bevel:
        b = o.modifiers.new('Soft manufactured edges', 'BEVEL'); b.width = bevel; b.segments = 3
        o.modifiers.new('Weighted corner normals', 'WEIGHTED_NORMAL')
    return o

def cylinder(name, at, radius, depth, mat, vertices=32):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=at)
    o=bpy.context.object; o.name=name; o.data.materials.append(mat)
    b=o.modifiers.new('Edge', 'BEVEL'); b.width=.025; b.segments=2
    o.modifiers.new('Normals', 'WEIGHTED_NORMAL'); return o

def sphere(name, at, scale, mat, subdivisions=2):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=subdivisions, radius=1, location=at)
    o=bpy.context.object; o.name=name; o.scale=scale; o.data.materials.append(mat)
    for p in o.data.polygons: p.use_smooth=True
    return o

def area(name, at, target, power, size, color=(1,.91,.78)):
    bpy.ops.object.light_add(type='AREA', location=at); o=bpy.context.object; o.name=name
    o.data.energy=power; o.data.shape='DISK'; o.data.size=size; o.data.color=color
    o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()

def line(name, points, mat, radius=.018):
    c=bpy.data.curves.new(name, 'CURVE'); c.dimensions='3D'; c.bevel_depth=radius; c.bevel_resolution=3
    spline=c.splines.new('POLY'); spline.points.add(len(points)-1)
    for p,co in zip(spline.points,points): p.co=(*co,1)
    o=bpy.data.objects.new(name,c); s.collection.objects.link(o); o.data.materials.append(mat); return o

def tree(x,y,height=3):
    line('Olive trunk',[(x,y,0),(x+.12,y+.03,1.7),(x-.12,y+.1,height)],dark,.085)
    verts=[]; faces=[]
    for i in range(12):
        a=i*2.399; tip=(x+math.cos(a)*.95,y+math.sin(a)*.8,1.6+random.random()*height*.65)
        line('Olive branch',[(x,y,1.3),tip],dark,.02)
        for j in range(28):
            q=[tip[0]+random.uniform(-.45,.45),tip[1]+random.uniform(-.4,.4),tip[2]+random.uniform(-.26,.26)]
            # One mesh per tree avoids costly updates for thousands of objects.
            a=random.random()*math.tau; start=len(verts)
            for ring in range(7):
                phi=math.pi*ring/6
                for segment in range(10):
                    theta=math.tau*segment/10
                    lx=.14*math.sin(phi)*math.cos(theta); ly=.055*math.sin(phi)*math.sin(theta)
                    verts.append((q[0]+lx*math.cos(a)-ly*math.sin(a),q[1]+lx*math.sin(a)+ly*math.cos(a),q[2]+.025*math.cos(phi)))
            for ring in range(6):
                for segment in range(10):
                    base=start+ring*10; nxt=(segment+1)%10
                    faces.append((base+segment,base+nxt,base+10+nxt,base+10+segment))
    mesh=bpy.data.meshes.new('Merged olive leaves'); mesh.from_pydata(verts,[],faces); mesh.update()
    o=bpy.data.objects.new('Olive foliage',mesh); s.collection.objects.link(o); mesh.materials.append(olive)
    for p in mesh.polygons: p.use_smooth=True

def chair(x,y,z=0,angle=0):
    # Curve-backed lounge, all parts transformed together.
    before=set(bpy.data.objects)
    for dx in [-.43,.43]:
        for dy in [-.38,.38]: box('Lounge leg',(x+dx,y+dy,z+.25),(.06,.06,.5),dark)
    box('Lounge seat',(x,y,z+.52),(.93,.93,.19),beige,.09)
    box('Lounge back',(x,y+.4,z+.94),(.93,.18,.65),beige,.08)
    for dx in [-.5,.5]: box('Lounge arm',(x+dx,y,z+.75),(.07,1.02,.1),dark)
    for o in set(bpy.data.objects)-before:
        v=o.location-Vector((x,y,z)); ca,sa=math.cos(angle),math.sin(angle)
        o.location=(x+v.x*ca-v.y*sa,y+v.x*sa+v.y*ca,z+v.z); o.rotation_euler.z+=angle

# Coast and the visible horizon. Water meets land behind the terrace.
box('Coastal site',(0,-20,-.4),(120,91,.7),sand)
box('Ocean',(0,1025,-.65),(6000,2000,.08),water,0)
box('Hotel podium',(0,10,-.12),(21,26,.2),stone)
# Limestone slabs create real joints rather than painted lines.
for x in range(-5,5):
    for y in range(0,10): box('Limestone slab',(x*2+1,y*2+1,.01),(1.985,1.985,.04),stone,.008)
for y in range(-8,0): box('Approach slab',(0,y*1.5+.3,.015),(3.2,1.48,.06),stone,.012)
box('Reflecting pool basin',(-5.4,-4.4,.03),(5.7,5.3,.12),dark)
box('Reflecting pool surface',(-5.4,-4.4,.12),(5.5,5.1,.025),pool,0)
tree(-5.8,-7.8,3.1); tree(8,-4.9,3.3)
for i in range(18):
    x=random.uniform(6,10); y=random.uniform(-10,-1)
    for j in range(5):
        line('Coastal grasses',[(x,y,0),(x+random.uniform(-.12,.12),y+.1,random.uniform(.4,.9))],olive,.012)

# Exterior low horizontal volume, open door on the central axis.
box('Facade left',(-5.8,0,1.7),(8.4,.35,3.4),plaster)
box('Facade right',(5.8,0,1.7),(8.4,.35,3.4),plaster)
box('Entrance lintel',(0,0,3.1),(3.2,.48,.6),plaster)
for x in [-1.56,1.56]: box('Entrance oak jamb',(x,0,1.45),(.15,.54,2.9),dark)
box('Entrance oak header',(0,0,2.9),(3.27,.54,.15),dark)
box('Roof shadow line',(0,10,3.39),(20.8,20.8,.2),dark)
box('Flat chalk roof',(0,10,3.58),(21,21,.22),plaster)
box('West enclosure',(-10,10,1.7),(.35,20,3.4),plaster)
box('East enclosure',(10,10,1.7),(.35,20,3.4),plaster)
# Exterior plaque, deterministic 3D lettering.
bpy.ops.object.text_add(location=(-4.25,-.19,1.75),rotation=(math.pi/2,0,0))
o=bpy.context.object; o.name='SEAM engraved facade lettering'; o.data.body='S E A M'; o.data.size=.36; o.data.extrude=.002; o.data.materials.append(dark)

# Lobby, gallery-like furniture and a framed passage to the right.
box('Lobby rug',(-3.8,3,.065),(4.5,3.5,.025),rug,.01)
box('Lobby sofa seat',(-4.4,4,.43),(3.6,1,.4),beige,.14)
box('Lobby sofa back',(-4.4,4.45,.9),(3.6,.26,.8),beige,.1)
for x in [-6,-2.8]: box('Sofa arm',(x,4,.7),(.25,1.05,.65),beige,.1)
cylinder('Travertine low table',(-4,2.4,.36),.85,.14,plaster)
cylinder('Table plinth',(-4,2.4,.18),.46,.28,plaster)
chair(-1.65,3,angle=-.35)
box('Reception monolith',(7.4,3,.55),(3.5,1.3,1.1),dark,.035)
box('Reception stone top',(7.4,3,1.12),(3.57,1.37,.08),plaster)
for x in [6.1,6.7,7.3,7.9,8.5]: box('Reception fluting',(x,2.32,.55),(.06,.035,1.08),wood,.01)
box('Gallery wall left',(-3.8,6.25,1.65),(12.8,.25,3.3),plaster)
box('Gallery wall right',(8,6.25,1.65),(4,.25,3.3),plaster)
box('Corridor left wall',(2.6,8.5,1.65),(.25,4.5,3.3),plaster)
box('Corridor right wall',(5.75,8.5,1.65),(.25,4.5,3.3),plaster)
box('Room entry left wall',(-.6,11,1.65),(6.15,.25,3.3),plaster)
box('Room entry right wall',(6.95,11,1.65),(2.4,.25,3.3),plaster)
box('Room entry lintel',(4.1,11,3),(3.25,.3,.6),plaster)
for x in [2.52,5.66]: box('Room entry oak jamb',(x,11,1.45),(.12,.42,2.9),dark)
box('Room entry oak header',(4.1,11,2.9),(3.28,.42,.12),dark)
for y in [7.4,9.7]:
    box('Bronze corridor sconce',(5.59,y,1.75),(.12,.22,.48),brass)
    area('Corridor wall light',(5.43,y,1.75),(2.8,y,1.3),70,.5)
# A quiet artwork, not a simulated branded print.
box('Art oak frame',(-4.2,6.09,1.9),(1.65,.08,1.5),dark)
box('Art linen canvas',(-4.2,6.035,1.9),(1.53,.015,1.38),linen)
box('Art raised clay block',(-4.4,6.02,1.95),(.48,.025,.7),stone)
box('Art raised chalk block',(-3.95,6.005,1.65),(.34,.025,.42),beige)

# One room, with the bed to the left of the uninterrupted walking axis.
box('Room west wall',(-4.1,15.5,1.65),(.25,9,3.3),plaster)
box('Room east wall',(8.1,15.5,1.65),(.25,9,3.3),plaster)
box('Bedroom woven rug',(-.6,15.4,.067),(5,4.9,.03),rug,.02)
box('Smoked oak bed base',(-.9,15.6,.23),(3.25,3.8,.35),dark,.06)
box('Mattress',(-.9,15.6,.53),(3.08,3.65,.35),linen,.17)
box('Duvet',(-.9,15.9,.76),(3.12,2.9,.18),linen,.13)
box('Sand folded throw',(-.9,16.7,.87),(3.13,.7,.1),beige,.04)
box('Upholstered headboard',(-.9,13.8,1.1),(3.75,.18,1.5),beige,.08)
for x in [-1.73,-.15]:
    p=box('Linen pillow',(x,14.35,.9),(1.3,.64,.24),linen,.11); p.rotation_euler.z=.05 if x<-.5 else -.05
for x in [-3,1.1]:
    box('Bedside oak block',(x,14.4,.41),(.64,.75,.7),dark)
    cylinder('Bedside lamp foot',(x,14.4,.85),.12,.18,brass)
    sphere('Opal lamp shade',(x,14.4,1.04),(.19,.19,.16),linen)
    area('Bedside warmth',(x,14.3,1.1),(x,13.8,1.45),22,.38)
box('Full height oak wardrobe',(7.65,13.3,1.6),(.7,3.8,3.1),dark)
for y in [11.7,12.7,13.7,14.7]: box('Wardrobe door joint',(7.285,y,1.65),(.02,.014,2.94),black,0)
chair(6.75,18.1,angle=-.65)
cylinder('Reading table',(5.9,18.1,.42),.38,.08,wood)
cylinder('Reading table stem',(5.9,18.1,.22),.04,.4,brass)
# Fixed glazing on each side, centre portal remains physically open.
for x,w in [(-.7,6.45),(6.9,2.25)]:
    box('Fixed sea-facing glass',(x,20,1.5),(w,.025,2.95),glass,0)
for x in [-4, -.8, 2.58, 5.6,8]: box('Sea window oak mullion',(x,20,1.5),(.085,.17,3.1),dark)
box('Sea window header',(2,20,3.06),(12.2,.25,.15),dark)
box('Sea window sill',(2,20,.09),(12.2,.25,.08),dark)
# Light linen curtains, articulated geometry avoids changing generated folds.
for x0 in [-3.85,7.65]:
    for i in range(9): cylinder('Curtain fold',(x0+i*.075,19.78,1.56),.061,2.9,linen,12)

# Continuous outdoor deck, bronze railing and two lounge chairs.
for x in range(42): box('Terrace oak board',(-4+x*.3,22,.04),(.292,4.1,.08),wood,.006)
chair(-1.5,22.9,angle=2.95); chair(.15,22.9,angle=3.2)
cylinder('Terrace table',(-.65,23,.43),.38,.07,stone)
cylinder('Terrace table foot',(-.65,23,.2),.12,.4,dark)
for x in [-4,-1,2,5,8]: cylinder('Terrace bronze post',(x,24.1,.48),.024,.96,brass,12)
line('Terrace top rail',[(-4,24.1,.96),(8,24.1,.96)],brass,.027)
line('Terrace lower rail',[(-4,24.1,.25),(8,24.1,.25)],brass,.015)
# Coastal plants beneath the deck, to frame the view without obscuring it.
for x,y,r in [(-8,25,1.4),(-6,28,1.6),(9,27,1.7),(13,32,2)]:
    sphere('Coastal rock',(x,y,-.06),(r,r*.7,.8),stone)
    tree(x,y,2.2)

# Physical lighting. Broad fill behaves like window bounce in this fast render.
bpy.ops.object.light_add(type='SUN', location=(0,0,8)); sun=bpy.context.object
sun.name='Afternoon sun'; sun.rotation_euler=(.68,-.48,-.75); sun.data.energy=1.8; sun.data.angle=.06
area('Lobby sky bounce',(0,2.7,3.1),(0,3,0),320,8,(.87,.92,1))
area('Lobby facade daylight',(0,-2,3),(0,4,1),650,5,(1,.94,.83))
area('Corridor ceiling bounce',(4.1,8.6,3.1),(4.1,8.6,0),230,3,(1,.94,.83))
area('Bedroom sky bounce',(2,17,3.1),(1,16,0),440,8,(.90,.95,1))
area('Sea window daylight',(3,21.5,3.8),(0,14,1),900,7,(1,.94,.83))

bpy.ops.object.camera_add(); cam=bpy.context.object; cam.name='Continuous guest journey'
s.camera=cam; cam.data.lens=23; cam.data.sensor_width=36; cam.data.clip_end=2200
# (progress, physical position, gaze target). Eyeline height stays 1.62 metres.
knots=[
 (0,(7,-17,1.62),(0,1,1.65)),
 (.16,(1.4,-7.6,1.62),(0,2,1.65)),
 (.28,(0,-2.2,1.62),(0,4,1.6)),
 (.38,(.1,2.1,1.62),(-3,3.8,1.3)),
 (.44,(2,4.5,1.62),(4.1,8,1.6)),
 (.50,(4.1,6.5,1.62),(4.1,11,1.6)),
 (.57,(4.1,9.5,1.62),(3.3,15.9,1.6)),
 (.66,(4.1,12.3,1.62),(0,16.3,1.15)),
 (.75,(4.1,16.3,1.62),(2.8,21.7,1.62)),
 (.85,(4.1,20.4,1.62),(3.4,33,1.6)),
 (1,(3.9,21.0,1.62),(-1.5,30,.9))]

def catmull(a,b,c,d,t):
    return .5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t)

def state(p):
    i=next((i for i in range(len(knots)-1) if p<=knots[i+1][0]),len(knots)-2)
    t=(p-knots[i][0])/(knots[i+1][0]-knots[i][0]); t=max(0,min(1,t))
    values=[]
    for k in [1,2]:
        a,b,c,d=[Vector(knots[max(0,min(len(knots)-1,j))][k]) for j in [i-1,i,i+1,i+2]]
        values.append(catmull(a,b,c,d,t))
    cam.location=values[0]
    cam.rotation_euler=(values[1]-values[0]).to_track_quat('-Z','Y').to_euler()
    return [list(v) for v in values]

samples=[]
for f in range(1,482):
    p=(f-1)/480; samples.append({'frame':f,'progress':p,'camera':state(p)})
    cam.keyframe_insert(data_path='location',frame=f)
    cam.keyframe_insert(data_path='rotation_euler',frame=f)
if cam.animation_data and cam.animation_data.action:
    # Per-frame keys retain the analytic physical path exactly at export frames.
    for layer in cam.animation_data.action.layers:
        for strip in layer.strips:
            for bag in strip.channelbags:
                for curve in bag.fcurves:
                    for key in curve.keyframe_points: key.interpolation='LINEAR'
with open(os.path.join(args.output,'camera-path.json'),'w') as file: json.dump(samples,file)

if args.preview:
    os.makedirs(os.path.join(args.output,'previews'),exist_ok=True)
    for name,p in [('arrival',0),('courtyard',.27),('lobby',.38),('corridor',.54),('room',.67),('terrace',1)]:
        s.frame_set(round(p*480)+1); s.render.filepath=os.path.join(args.output,'previews',name+'.png')
        bpy.ops.render.render(write_still=True)
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(args.output,'seam-scene.blend'))
if args.animate:
    os.makedirs(os.path.join(args.output,'frames'),exist_ok=True)
    s.render.filepath=os.path.join(args.output,'frames','frame-')
    bpy.ops.render.render(animation=True)
