import * as THREE from "./vendor/three.js";

// Real, indexed 3D ribbon surfaces. UV coordinates parameterize geometry;
// no image texture is sampled by the live sculpture.
const shapeShader = `
  uniform float uTime, uOpen, uResolve, uPulse, uImpact, uIndex, uMood;
  uniform vec2 uPointer;
  varying vec2 vRibbonUv;
  vec3 ribbon(vec2 q) {
    float t = q.x * 6.2831853;
    float s = (q.y - .5) * 2.;
    float phase = uIndex * 1.37;
    float radius = 1.34 + .36 * cos(t*3.);
    radius += .08*uMood*sin(t*(3.-uMood));
    float breath = sin(t*2.+uTime*.34)*.085;
    float twist = t * mix(1.5,.5,uResolve) + uMood*.24 + sin(uTime*.22)*.15;
    float width = (.145 + .012*sin(t)) * (1.+uPulse*.035);
    float flute = 0.;
    float sweep = mix(t*2.,t,uResolve);
    vec3 radial = vec3(cos(sweep),sin(sweep),0.);
    vec3 p = vec3(cos(sweep)*radius, sin(sweep)*radius*.94, .68*sin(t*3.));
    p += radial * breath;
    p += (radial*cos(twist)+vec3(0.,0.,1.)*sin(twist))*(s*width+(uIndex-1.5)*.32+flute);
    p.z += .10 * sin(t*4.+uTime*.45);
    // The middle chapter opens the closed sculpture into separated silk bands.
    vec3 open = vec3((q.x-.5)*7.8, (uIndex-1.5)*.50 + .25*sin(t+phase+uTime*.3), sin(t*.5+phase)*.45);
    float taper = pow(max(sin(q.x*3.14159265),.001),.5);
    open.y += s*.24*cos(t*.45+phase)*taper;
    open.z += s*.33*sin(t*.45+phase)*taper + flute;
    p = mix(p,open,uOpen);
    float distanceToPointer = length(p.xy-uPointer*vec2(2.8,2.));
    p.z += exp(-distanceToPointer*distanceToPointer*.8)*.20;
    float wave = sin(length(p.xy)*5.-uImpact*6.);
    float impulse = exp(-uImpact*1.25) * min(uImpact*8.,1.);
    p += normalize(p+vec3(.001)) * wave * impulse * .20;
    p *= 1.+impulse*.09;
    return p;
  }
`;

export class AuroraScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ready = false;
    this.lastState = null;
    this.resources = [];
    this.time = 0;
    this.impactAge = 100;
    this.visible = true;
    this.mobile = innerWidth < 700;
    this.quality = this.mobile ? 1.15 : Math.min(devicePixelRatio, 1.6);
    try {
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      this.renderer.setPixelRatio(this.quality);
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.05;
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
      this.camera.position.set(0, 0, 8.2);
      this.sculpture = new THREE.Group();
      this.scene.add(this.sculpture);
      this.makeEnvironment();
      this.makeSculpture();
      this.makeDust();
      this.ready = true;
      this.resize();
      this.render({
        time: 0,
        progress: 0,
        pointer: { x: 0, y: 0 },
        pulse: 0,
        mood: 0,
        impactAge: 100,
      });
      canvas.parentElement.classList.add("ready");
      canvas.dataset.renderer = "three-webgl2";
      canvas.dataset.geometry = "4-indexed-ribbon-surfaces";
      canvas.dataset.triangles = String(this.renderer.info.render.triangles);
    } catch (error) {
      this.ready = false;
      this.renderer?.dispose();
      console.warn(
        "3D unavailable; the original artwork remains visible.",
        error,
      );
    }
    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      this.ready = false;
      canvas.parentElement.classList.remove("ready");
    });
    canvas.addEventListener("webglcontextrestored", () => {
      this.ready = true;
      this.resize();
      canvas.parentElement.classList.add("ready");
    });
  }
  makeEnvironment() {
    const env = new THREE.Scene();
    env.background = new THREE.Color("#151722");
    const box = new THREE.BoxGeometry(1, 1, 1);
    const panels = [
      [[-4, 3, 2], [1, 6, 4], 0xe5dbff, 9],
      [[4, 2, 1], [1, 5, 5], 0xb7dfff, 12],
      [[0, 5, -1], [5, 0.2, 4], 0xffffff, 10],
      [[1, -3, 2], [5, 0.15, 2], 0xf2b5aa, 4],
      [[0, 1, -5], [4, 4, 0.2], 0xa0aaff, 7],
    ];
    for (const [position, scale, color, intensity] of panels) {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).multiplyScalar(intensity),
      });
      const panel = new THREE.Mesh(box, material);
      panel.position.fromArray(position);
      panel.scale.fromArray(scale);
      env.add(panel);
    }
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const target = pmrem.fromScene(env, 0.14, 0.1, 50, { size: 128 });
    this.scene.environment = target.texture;
    this.resources.push(target);
    env.traverse((object) => {
      if (object.material) object.material.dispose();
    });
    box.dispose();
    pmrem.dispose();
    this.scene.add(new THREE.HemisphereLight(0xbdbfff, 0x1a102b, 0.6));
    const key = new THREE.DirectionalLight(0xf2e5ff, 1.8);
    key.position.set(-3, 4, 4);
    this.scene.add(key);
    this.fill = new THREE.PointLight(0x928aff, 28, 16, 2);
    this.fill.position.set(3, -1, 3);
    this.scene.add(this.fill);
    const rim = new THREE.DirectionalLight(0xa5e4ee, 2.7);
    rim.position.set(3, 2, -3);
    this.scene.add(rim);
  }
  makeSculpture() {
    this.uniformSets = [];
    this.materials = [];
    const geometry = new THREE.PlaneGeometry(
      1,
      1,
      this.mobile ? 200 : 480,
      this.mobile ? 28 : 40,
    );
    geometry.computeBoundingSphere();
    this.resources.push(geometry);
    for (let i = 0; i < 4; i++) {
      const uniforms = {
        uTime: { value: 0 },
        uOpen: { value: 0 },
        uResolve: { value: 0 },
        uPulse: { value: 0 },
        uImpact: { value: 100 },
        uIndex: { value: i },
        uMood: { value: 0 },
        uPointer: { value: new THREE.Vector2() },
      };
      const material = new THREE.MeshPhysicalMaterial({
        color: [0xc8c3e6, 0xbfcbd8, 0xdac5d4, 0xc2c9df][i],
        metalness: 0.92,
        roughness: 0.22,
        iridescence: 1,
        iridescenceIOR: 1.36,
        iridescenceThicknessRange: [160, 410],
        clearcoat: 0.65,
        clearcoatRoughness: 0.2,
        side: THREE.DoubleSide,
        envMapIntensity: 1.0,
      });
      material.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, uniforms);
        shader.vertexShader = shader.vertexShader
          .replace("#include <common>", "#include <common>\n" + shapeShader)
          .replace(
            "#include <beginnormal_vertex>",
            `#include <beginnormal_vertex>
            vec3 p0=ribbon(uv);
            vec3 pu=ribbon(uv+vec2(.0005,0.))-p0;
            vec3 pv=ribbon(uv+vec2(0.,.0005))-p0;
            objectNormal=normalize(cross(pu,pv));
            vRibbonUv=uv;`,
          )
          .replace("#include <begin_vertex>", "vec3 transformed = ribbon(uv);");
        shader.fragmentShader = shader.fragmentShader
          .replace(
            "#include <common>",
            "#include <common>\nvarying vec2 vRibbonUv;",
          )
          .replace(
            "#include <roughnessmap_fragment>",
            "#include <roughnessmap_fragment>\nroughnessFactor += .045*(.5+.5*sin(vRibbonUv.y*263.89));",
          );
      };
      material.customProgramCacheKey = () => `aurora-ribbon-v2`;
      const mesh = new THREE.Mesh(geometry, material);
      mesh.frustumCulled = false;
      this.sculpture.add(mesh);
      this.uniformSets.push(uniforms);
      this.materials.push(material);
      this.resources.push(material);
    }
    this.sculpture.rotation.set(0.2, -0.3, -0.36);
  }
  makeDust() {
    const count = this.mobile ? 340 : 850;
    const positions = new Float32Array(count * 3),
      seeds = new Float32Array(count);
    let seed = 871;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < count; i++) {
      const angle = random() * Math.PI * 2,
        r = 2.25 + random() * 1.7;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = Math.sin(angle) * r;
      positions[i * 3 + 2] = (random() - 0.5) * 3;
      seeds[i] = random();
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    this.dustUniforms = {
      uTime: { value: 0 },
      uOpen: { value: 0 },
      uPulse: { value: 0 },
      uSize: { value: this.quality },
    };
    const material = new THREE.ShaderMaterial({
      uniforms: this.dustUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `attribute float aSeed; uniform float uTime,uOpen,uPulse,uSize; varying float vLight; void main(){vec3 p=position;p.xy*=1.+uOpen*.6;float a=uTime*.045*(.3+aSeed);p.xy=mat2(cos(a),-sin(a),sin(a),cos(a))*p.xy;p.z+=sin(uTime*.25+aSeed*30.)*.25;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(1.2+aSeed*1.5)*uSize*(8./-mv.z);vLight=(.15+aSeed*.45)*(1.+uPulse*.3);}`,
      fragmentShader: `varying float vLight; void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(.65,.73,1.,pow(1.-d*2.,2.)*vLight);}`,
    });
    this.dust = new THREE.Points(geometry, material);
    this.sculpture.add(this.dust);
    this.resources.push(geometry, material);
  }
  resize() {
    if (!this.renderer) return;
    const { width, height } = this.canvas.parentElement.getBoundingClientRect();
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.mobile = width < 700;
    if (this.lastState && this.ready) this.render(this.lastState);
  }
  render(state) {
    if (!this.ready) return;
    this.lastState = state;
    const { time, progress, pointer, pulse, mood, impactAge } = state;
    const smooth = (a, b, v) => THREE.MathUtils.smoothstep(v, a, b);
    const open =
      smooth(0.14, 0.43, progress) * (1 - smooth(0.49, 0.82, progress));
    const resolve = smooth(0.53, 0.94, progress);
    for (const u of this.uniformSets) {
      u.uTime.value = time;
      u.uOpen.value = open;
      u.uResolve.value = resolve;
      u.uPulse.value = pulse;
      u.uImpact.value = impactAge;
      u.uPointer.value.set(pointer.x, pointer.y);
      u.uMood.value = mood;
    }
    const warm = new THREE.Color("#e1b9bd"),
      cool = new THREE.Color("#c6c4e9"),
      deep = new THREE.Color("#9abfcc");
    const tint =
      mood < 1
        ? cool.clone().lerp(warm, mood)
        : warm.clone().lerp(deep, mood - 1);
    this.materials.forEach((material, i) => {
      material.color.copy(tint).multiplyScalar(1 - i * 0.035);
    });
    this.sculpture.position.x = this.mobile
      ? this.canvas.clientHeight < 700
        ? 0.5
        : 0
      : 1.52 * (1 - smooth(0.2, 0.46, progress)) +
        1.25 * smooth(0.66, 0.91, progress);
    this.sculpture.position.y = this.mobile
      ? this.canvas.clientHeight < 700
        ? -1.8
        : -1.6
      : -1.1 * open;
    const rotation = -0.4 + Math.sin(time * 0.13) * 0.22 + resolve * 0.65;
    this.sculpture.rotation.set(
      0.17 + pointer.y * 0.15 + Math.sin(time * 0.18) * 0.07,
      -0.22 + pointer.x * 0.22 + resolve * 0.45,
      rotation * (1 - open) - 0.06 * open,
    );
    this.sculpture.scale.setScalar(
      (this.mobile ? (this.canvas.clientHeight < 700 ? 0.65 : 0.55) : 1) *
        (1 - open * 0.24) +
        pulse * 0.008,
    );
    this.camera.position.z = this.mobile
      ? 11.8
      : 8.2 - open * 0.6 - resolve * 0.15;
    this.camera.updateProjectionMatrix();
    this.fill.intensity = 28 + pulse * 8;
    this.dustUniforms.uTime.value = time;
    this.dustUniforms.uOpen.value = open;
    this.dustUniforms.uPulse.value = pulse;
    this.renderer.render(this.scene, this.camera);
  }
  dispose() {
    this.ready = false;
    for (const resource of this.resources) resource.dispose();
    this.renderer?.dispose();
  }
}
