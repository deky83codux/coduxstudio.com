// Three.js scene for the home hero: a particle planet with a Keplerian
// ring. Everything is GPU-driven (one ShaderMaterial per layer, no textures),
// plus a small rocket orbiting inside the ring with a particle exhaust trail.
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  BufferAttribute,
  Points,
  ShaderMaterial,
  AdditiveBlending,
  Group,
  Color,
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
  MeshLambertMaterial,
  CylinderGeometry,
  ConeGeometry,
  BoxGeometry,
  AmbientLight,
  DirectionalLight,
  Vector3,
  Quaternion,
} from "three";

const VIOLET = new Color("#6c5ce7");
const LAVENDER = new Color("#a29bfe");
const TEAL = new Color("#00cec9");
const AMBER = new Color("#fdcb6e");

const pointFrag = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, vAlpha * soft);
  }
`;

const planetVert = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform vec3 uColA;
  uniform vec3 uColB;
  uniform vec3 uColC;
  attribute float aRand;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    // latitude bands drifting like a gas giant
    float lat = p.y / 1.6;
    float band = sin(lat * 9.0 + uTime * 0.35 + sin(atan(p.z, p.x) * 2.0 + uTime * 0.2) * 0.6);
    vec3 col = mix(uColA, uColB, smoothstep(-0.6, 0.9, lat + band * 0.18));
    col = mix(col, uColC, smoothstep(0.75, 1.0, band) * 0.35);
    // light from the upper left; night side fades out
    vec3 n = normalize(p);
    float light = clamp(dot(n, normalize(vec3(-0.7, 0.55, 0.6))) * 0.75 + 0.35, 0.06, 1.0);
    // intro: points condense from a loose cloud
    float spread = 1.0 + (1.0 - uIntro) * (1.2 + aRand * 1.6);
    p *= spread;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float twinkle = 0.75 + 0.25 * sin(uTime * 2.0 + aRand * 40.0);
    gl_PointSize = uSize * (0.6 + aRand * 0.8) * uPixelRatio * (16.0 / -mv.z);
    vColor = col * light * twinkle;
    vAlpha = (0.2 + light * 0.8) * uIntro;
  }
`;

const ringVert = /* glsl */ `
  uniform float uTime;
  uniform float uIntro;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform vec3 uColA;
  uniform vec3 uColB;
  attribute float aRadius;
  attribute float aAngle;
  attribute float aRand;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    // Keplerian speed: inner particles orbit faster
    float speed = 0.55 / pow(aRadius, 1.5);
    float a = aAngle + uTime * speed;
    float r = aRadius * (1.0 + (1.0 - uIntro) * (1.5 + aRand));
    float a2 = a - (1.0 - uIntro) * 2.4;
    vec3 p = vec3(cos(a2) * r, (aRand - 0.5) * 0.035, sin(a2) * r);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.5 + aRand) * uPixelRatio * (16.0 / -mv.z);
    float t = smoothstep(2.2, 3.5, aRadius);
    vColor = mix(uColA, uColB, t);
    vAlpha = (0.35 + aRand * 0.6) * uIntro;
  }
`;

const starVert = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aRand;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.0 + aRand * 1.6) * uPixelRatio;
    vColor = vec3(0.85, 0.85, 1.0);
    vAlpha = 0.25 + 0.45 * (0.5 + 0.5 * sin(uTime * (0.6 + aRand) + aRand * 30.0));
  }
`;

// rocket exhaust: CPU-updated trail, each point knows its age (0 = newest)
const trailVert = /* glsl */ `
  uniform float uPixelRatio;
  uniform float uIntro;
  attribute float aAge;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (5.5 * (1.0 - aAge) + 1.0) * uPixelRatio * (16.0 / -mv.z);
    vColor = mix(vec3(1.0, 0.82, 0.45), vec3(0.42, 0.36, 0.91), smoothstep(0.0, 0.55, aAge));
    vAlpha = (1.0 - aAge) * 0.85 * uIntro;
  }
`;

function material(vertexShader, uniforms) {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader: pointFrag,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
}

export function createPlanetScene(
  canvas,
  { reduced = false, mobile = false, stars: withStars = true } = {},
) {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: "high-performance",
  });
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0.6, 13);
  camera.lookAt(0, 0, 0);

  const system = new Group();
  scene.add(system);

  // --- planet: Fibonacci sphere ---
  const PLANET = mobile ? 3200 : 7000;
  const pPos = new Float32Array(PLANET * 3);
  const pRand = new Float32Array(PLANET);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < PLANET; i++) {
    const y = 1 - (i / (PLANET - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    const R = 1.6 + (Math.random() - 0.5) * 0.04;
    pPos[i * 3] = Math.cos(th) * rad * R;
    pPos[i * 3 + 1] = y * R;
    pPos[i * 3 + 2] = Math.sin(th) * rad * R;
    pRand[i] = Math.random();
  }
  const pGeo = new BufferGeometry();
  pGeo.setAttribute("position", new BufferAttribute(pPos, 3));
  pGeo.setAttribute("aRand", new BufferAttribute(pRand, 1));
  const uniformsBase = () => ({
    uTime: { value: 0 },
    uIntro: { value: reduced ? 1 : 0 },
    uPixelRatio: { value: pixelRatio },
  });
  const pMat = material(planetVert, {
    ...uniformsBase(),
    uSize: { value: mobile ? 3.2 : 2.6 },
    uColA: { value: VIOLET },
    uColB: { value: TEAL },
    uColC: { value: LAVENDER },
  });
  const planet = new Points(pGeo, pMat);
  planet.rotation.z = 0.25;

  // --- ring: banded particle disc with a Cassini-style gap ---
  const RING = mobile ? 4200 : 9000;
  const rRadius = new Float32Array(RING);
  const rAngle = new Float32Array(RING);
  const rRand = new Float32Array(RING);
  const rPos = new Float32Array(RING * 3); // required by three, positions come from the shader
  for (let i = 0; i < RING; i++) {
    let r;
    do {
      r = 2.15 + Math.pow(Math.random(), 0.8) * 1.45;
    } while (r > 2.78 && r < 2.9 && Math.random() > 0.08);
    rRadius[i] = r;
    rAngle[i] = Math.random() * Math.PI * 2;
    rRand[i] = Math.random();
  }
  const rGeo = new BufferGeometry();
  rGeo.setAttribute("position", new BufferAttribute(rPos, 3));
  rGeo.setAttribute("aRadius", new BufferAttribute(rRadius, 1));
  rGeo.setAttribute("aAngle", new BufferAttribute(rAngle, 1));
  rGeo.setAttribute("aRand", new BufferAttribute(rRand, 1));
  rGeo.boundingSphere = null;
  const rMat = material(ringVert, {
    ...uniformsBase(),
    uSize: { value: mobile ? 2.4 : 2.0 },
    uColA: { value: AMBER },
    uColB: { value: LAVENDER },
  });
  const ring = new Points(rGeo, rMat);
  ring.frustumCulled = false;

  // invisible depth-only sphere: hides the far half of the ring and the
  // planet's back-facing points, so the planet reads as a solid body
  const occGeo = new SphereGeometry(1.56, 32, 16);
  const occMat = new MeshBasicMaterial({ colorWrite: false });
  const occluder = new Mesh(occGeo, occMat);
  occluder.renderOrder = -1;

  const tilt = new Group();
  tilt.rotation.set(0.32, 0, -0.38);
  tilt.add(occluder, planet, ring);
  system.add(tilt);

  // --- rocket: orbits inside the ring, weaving slightly above/below it ---
  // Built along +Z so it can be pointed along the orbit's tangent.
  scene.add(new AmbientLight(0xb8b0ff, 1.1));
  const sun = new DirectionalLight(0xffffff, 2.2);
  sun.position.set(-4, 3, 5);
  scene.add(sun);

  const rocket = new Group();
  const craft = new Group(); // rolls around its own axis
  rocket.add(craft);
  const rGeos = [];
  const rMats = [];
  const part = (geo, color, opts = {}) => {
    const mat = opts.basic
      ? new MeshBasicMaterial({ color, transparent: !!opts.additive, blending: opts.additive ? AdditiveBlending : undefined, depthWrite: !opts.additive })
      : new MeshLambertMaterial({ color, emissive: color, emissiveIntensity: 0.18 });
    rGeos.push(geo);
    rMats.push(mat);
    const m = new Mesh(geo, mat);
    craft.add(m);
    return m;
  };
  const toZ = (g) => g.rotateX(Math.PI / 2); // cylinder/cone axis Y -> Z
  part(toZ(new CylinderGeometry(0.07, 0.075, 0.26, 16)), 0xe8e8f0); // body
  part(toZ(new ConeGeometry(0.07, 0.15, 16)), 0x6c5ce7).position.z = 0.205; // nose
  part(toZ(new CylinderGeometry(0.06, 0.05, 0.04, 16)), 0x2a2a3a).position.z = -0.15; // nozzle
  const win = part(new SphereGeometry(0.03, 12, 8), 0x00cec9, { basic: true });
  win.position.set(0, 0.062, 0.06);
  for (let k = 0; k < 3; k++) {
    const fin = part(new BoxGeometry(0.012, 0.09, 0.09), 0xa29bfe);
    const ang = (k / 3) * Math.PI * 2;
    fin.position.set(Math.sin(ang) * 0.085, Math.cos(ang) * 0.085, -0.1);
    fin.rotation.z = -ang;
  }
  const flame = part(toZ(new ConeGeometry(0.045, 0.16, 12)).rotateX(Math.PI), 0xfdcb6e, { basic: true, additive: true });
  flame.position.z = -0.24;
  rocket.scale.setScalar(mobile ? 1.35 : 1.25);
  tilt.add(rocket);

  const ORBIT_R = 1.92; // in the gap between the planet (1.6) and the ring (2.15+)
  const ORBIT_INC = 0.08; // tilt of the rocket's orbit vs the ring plane
  const ORBIT_SPEED = 0.2; // rad/s
  const orbitAt = (a, out) =>
    out.set(Math.cos(a) * ORBIT_R, Math.sin(a) * ORBIT_R * Math.sin(ORBIT_INC), Math.sin(a) * ORBIT_R * Math.cos(ORBIT_INC));
  const fwdZ = new Vector3(0, 0, 1);
  const rp = new Vector3();
  const rn = new Vector3();
  const rq = new Quaternion();

  const TRAIL = mobile ? 28 : 46;
  const tPos = new Float32Array(TRAIL * 3);
  const tAge = new Float32Array(TRAIL);
  for (let i = 0; i < TRAIL; i++) tAge[i] = i / (TRAIL - 1);
  const tGeo = new BufferGeometry();
  tGeo.setAttribute("position", new BufferAttribute(tPos, 3));
  tGeo.setAttribute("aAge", new BufferAttribute(tAge, 1));
  const tMat = new ShaderMaterial({
    vertexShader: trailVert,
    fragmentShader: pointFrag,
    uniforms: { uPixelRatio: { value: pixelRatio }, uIntro: { value: reduced ? 1 : 0 } },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const trail = new Points(tGeo, tMat);
  trail.frustumCulled = false;
  tilt.add(trail);

  function placeRocket(t, intro) {
    const a = 2.2 + t * ORBIT_SPEED;
    orbitAt(a, rp);
    orbitAt(a + 0.01, rn).sub(rp).normalize();
    rocket.position.copy(rp);
    rocket.quaternion.copy(rq.setFromUnitVectors(fwdZ, rn));
    craft.rotation.z = t * 0.9;
    // arrive after the planet has formed
    const s = Math.max(0, Math.min(1, (intro - 0.55) / 0.45));
    rocket.visible = s > 0.01;
    rocket.scale.setScalar((mobile ? 1.35 : 1.25) * s);
    flame.scale.set(1, 1, 0.75 + Math.sin(t * 38) * 0.18 + Math.sin(t * 23) * 0.1);
    // exhaust: points spaced back along the orbit, slightly scattered
    for (let i = 0; i < TRAIL; i++) {
      orbitAt(a - 0.035 - i * 0.011, rn);
      const j = Math.sin(i * 12.9898 + t * 3) * 0.012 * (i / TRAIL);
      tPos[i * 3] = rn.x + j;
      tPos[i * 3 + 1] = rn.y + j;
      tPos[i * 3 + 2] = rn.z - j;
    }
    tGeo.attributes.position.needsUpdate = true;
    tMat.uniforms.uIntro.value = s;
  }

  // --- distant stars ---
  const STARS = mobile ? 250 : 500;
  const sPos = new Float32Array(STARS * 3);
  const sRand = new Float32Array(STARS);
  for (let i = 0; i < STARS; i++) {
    sPos[i * 3] = (Math.random() - 0.5) * 40;
    sPos[i * 3 + 1] = (Math.random() - 0.5) * 24;
    sPos[i * 3 + 2] = -8 - Math.random() * 20;
    sRand[i] = Math.random();
  }
  const sGeo = new BufferGeometry();
  sGeo.setAttribute("position", new BufferAttribute(sPos, 3));
  sGeo.setAttribute("aRand", new BufferAttribute(sRand, 1));
  const sMat = material(starVert, uniformsBase());
  const stars = new Points(sGeo, sMat);
  if (withStars) scene.add(stars);

  const mats = [pMat, rMat, sMat];

  // --- interaction state ---
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let scroll = 0;
  let running = false;
  let raf = 0;
  let start = performance.now();
  let started = false;
  let last = start;
  let elapsed = 0;

  function resize() {
    const parent = canvas.parentElement;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the planet framed on narrow screens
    camera.position.z = w < 700 ? 14 : 12.5;
    camera.updateProjectionMatrix();
  }
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement);

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    elapsed += dt;
    // intro runs on wall-clock time so slow devices don't drag it out
    const introT = reduced ? 1 : Math.min((now - start) / 2600, 1);
    const intro = 1 - Math.pow(1 - introT, 4); // easeOutQuart
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    for (const m of mats) {
      m.uniforms.uTime.value = elapsed;
      if (m.uniforms.uIntro) m.uniforms.uIntro.value = intro;
    }
    planet.rotation.y = elapsed * 0.06;
    placeRocket(elapsed, intro);
    system.rotation.y = pointer.x * 0.35;
    system.rotation.x = pointer.y * 0.18 + scroll * 0.35;
    system.position.y = -scroll * 1.2;
    stars.position.x = -pointer.x * 0.4;
    stars.position.y = pointer.y * 0.25;
    renderer.render(scene, camera);
    if (running) raf = requestAnimationFrame(frame);
  }

  return {
    start() {
      if (running) return;
      if (reduced) {
        elapsed = 4;
        frame(performance.now());
        return;
      }
      running = true;
      last = performance.now();
      if (!started) {
        start = last;
        started = true;
      }
      raf = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    setPointer(x, y) {
      pointer.tx = x;
      pointer.ty = y;
    },
    setScroll(v) {
      scroll = v;
      if (reduced) frame(performance.now());
    },
    destroy() {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      [pGeo, rGeo, sGeo, occGeo, tGeo, ...rGeos].forEach((g) => g.dispose());
      [...mats, occMat, tMat, ...rMats].forEach((m) => m.dispose());
      renderer.dispose();
    },
  };
}
