// Art-directed image surface. The original silk artwork supplies its fine
// material detail; WebGL adds restrained refraction, light and local ripples.
// This is an image-based effect, not a model of the sculpture.
export class AuroraSilk {
  constructor(canvas) {
    this.canvas = canvas;
    this.ready = false;
    this.failed = false;
    this.lastState = null;
    this.hit = { x: 0.65, y: 0.5 };
    this.lastImpact = 100;
    this.gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!this.gl) {
      this.failed = true;
      return;
    }
    try {
      this.init();
    } catch (error) {
      this.failed = true;
      console.warn("Static silk artwork fallback.", error);
    }
    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      this.ready = false;
      canvas.parentElement.classList.remove("ready");
    });
    canvas.addEventListener("webglcontextrestored", () => {
      try {
        this.init();
      } catch {
        this.ready = false;
      }
    });
  }
  init() {
    const gl = this.gl;
    const vertex =
      "attribute vec2 a_position; varying vec2 v_uv; void main(){v_uv=a_position*.5+.5;gl_Position=vec4(a_position,0.,1.);}";
    const fragment = `precision highp float;
      varying vec2 v_uv;
      uniform sampler2D u_art;
      uniform vec2 u_size,u_pointer,u_hit;
      uniform float u_time,u_scroll,u_impact,u_pulse,u_mood;
      void main(){
        float aspect=u_size.x/u_size.y;
        vec2 p=v_uv;
        // Slow, small, nonuniform flow keeps the silk's folds legible.
        p+=vec2(sin(p.y*5.2+u_time*.19),cos(p.x*4.8-u_time*.16))*.005;
        p+=vec2(sin(p.y*11.+u_time*.31),sin(p.x*8.+u_time*.22))*.0018;
        vec2 cursorDelta=p-u_pointer;cursorDelta.x*=aspect;
        float influence=exp(-dot(cursorDelta,cursorDelta)*7.);
        p+=(p-u_pointer)*influence*.014;
        vec2 delta=p-u_hit;delta.x*=aspect;
        float distance=length(delta);
        float ring=sin(distance*26.-u_impact*5.5)*exp(-abs(distance-u_impact*.24)*8.5)*exp(-u_impact*.85);
        p+=normalize(delta+vec2(.0001))*ring*.013;
        p=(p-.5)/(1.+u_scroll*.11+u_pulse*.0025)+.5;
        vec2 cover=vec2(min(aspect/1.5,1.),min(1.5/aspect,1.));
        vec2 uv=(p-.5)*cover+.5;
        uv+=vec2((u_pointer.x-.5)*.004,(u_pointer.y-.5)*.003);
        vec3 color=texture2D(u_art,uv).rgb;
        float light=pow(max(0.,sin(p.x*2.4-p.y*1.7+u_time*.18)),10.);
        float surface=smoothstep(.07,.45,dot(color,vec3(.21,.72,.07)));
        color+=vec3(.038,.026,.055)*light*surface;
        color*=1.+u_pulse*.025;
        color=mix(color,color*vec3(1.06,.94,.96),clamp(u_mood,0.,1.));
        color=mix(color,color*vec3(.92,1.,1.05),clamp(u_mood-1.,0.,1.));
        gl_FragColor=vec4(color,1.);
      }`;
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(shader));
      return shader;
    };
    const program = gl.createProgram(),
      vs = compile(gl.VERTEX_SHADER, vertex),
      fs = compile(gl.FRAGMENT_SHADER, fragment);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw new Error(gl.getProgramInfoLog(program));
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.useProgram(program);
    this.program = program;
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const attribute = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
    this.uniforms = Object.fromEntries(
      [
        "u_art",
        "u_size",
        "u_pointer",
        "u_hit",
        "u_time",
        "u_scroll",
        "u_impact",
        "u_pulse",
        "u_mood",
      ].map((name) => [name, gl.getUniformLocation(program, name)]),
    );
    const image = new Image();
    image.onload = () => {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      this.ready = true;
      this.resize();
      this.render(
        this.lastState || {
          time: 0,
          progress: 0,
          pointer: { x: 0, y: 0 },
          pulse: 0,
          mood: 0,
          impactAge: 100,
        },
      );
      this.canvas.parentElement.classList.add("ready");
      this.canvas.dataset.renderer = "webgl-silk";
      this.canvas.dataset.material = "original-image-refraction";
    };
    image.onerror = () => {
      this.ready = false;
    };
    image.src = "/rebrand/assets/resonance.webp";
  }
  resize() {
    if (!this.gl) return;
    const rect = this.canvas.getBoundingClientRect();
    this.origin = {
      x: rect.left,
      y: rect.top + scrollY,
      width: rect.width,
      height: rect.height,
    };
    const dpr = Math.min(devicePixelRatio, innerWidth < 700 ? 1.25 : 1.5);
    this.canvas.width = Math.round(rect.width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    if (this.ready && this.lastState) this.render(this.lastState);
  }
  render(state) {
    this.lastState = state;
    if (!this.ready) return;
    const gl = this.gl,
      u = this.uniforms;
    const px =
      ((state.pointer.x + 1) * 0.5 * innerWidth - this.origin.x) /
      this.origin.width;
    const py =
      1 -
      ((1 - state.pointer.y) * 0.5 * innerHeight + scrollY - this.origin.y) /
        this.origin.height;
    if (state.impactAge < this.lastImpact) {
      this.hit = {
        x: Math.max(0, Math.min(1, px)),
        y: Math.max(0, Math.min(1, py)),
      };
    }
    this.lastImpact = state.impactAge;
    gl.useProgram(this.program);
    gl.uniform2f(u.u_size, this.canvas.width, this.canvas.height);
    gl.uniform2f(u.u_pointer, px, py);
    gl.uniform2f(u.u_hit, this.hit.x, this.hit.y);
    gl.uniform1f(u.u_time, state.time);
    gl.uniform1f(u.u_scroll, state.progress);
    gl.uniform1f(u.u_impact, state.impactAge);
    gl.uniform1f(u.u_pulse, state.pulse);
    gl.uniform1f(u.u_mood, state.mood);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}
