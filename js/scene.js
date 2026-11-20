/* Nuvance and Co — 3D scenes (Three.js) */
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

function hasWebGL() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); }
  catch (e) { return false; }
}

/* Shared: renderer sized to its canvas, paused when off-screen */
function makeRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  return renderer;
}
function fit(renderer, camera, canvas) {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
}
function visibility(el) {
  const state = { visible: true };
  new IntersectionObserver(([e]) => { state.visible = e.isIntersecting; }, { rootMargin: "100px" }).observe(el);
  return state;
}
/* Drag-to-rotate with inertia */
function dragControl(el) {
  const s = { vx: 0, vy: 0, rx: 0, ry: 0, down: false, lx: 0, ly: 0 };
  el.addEventListener("pointerdown", e => { s.down = true; s.lx = e.clientX; s.ly = e.clientY; el.setPointerCapture(e.pointerId); });
  el.addEventListener("pointermove", e => {
    if (!s.down) return;
    s.vy = (e.clientX - s.lx) * 0.006; s.vx = (e.clientY - s.ly) * 0.004;
    s.lx = e.clientX; s.ly = e.clientY;
  });
  const up = () => { s.down = false; };
  el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
  s.step = () => {
    s.ry += s.vy; s.rx = THREE.MathUtils.clamp(s.rx + s.vx, -0.8, 0.8);
    s.vx *= 0.92; s.vy *= 0.94;
    if (!s.down) s.rx *= 0.97;
  };
  return s;
}

/* =========================================================
   HERO — extruded 3D "N" logo, orbit rings, floating coins
   ========================================================= */
function hero() {
  const canvas = document.getElementById("heroCanvas");
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 9.5);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(4, 5, 6); scene.add(key);
  const rim = new THREE.PointLight(0xff3d7f, 30, 20); rim.position.set(-3, -2, 3); scene.add(rim);

  const logo = new THREE.Group();
  scene.add(logo);

  // Logo silhouette (matches the flyer mark): dark left stroke + diagonal, wine right stroke
  const sx = (x, y) => new THREE.Vector2(x + y * 0.42, y); // italic shear
  const shape = (pts) => { const s = new THREE.Shape(); pts.forEach(([x, y], i) => { const v = sx(x, y); i ? s.lineTo(v.x, v.y) : s.moveTo(v.x, v.y); }); s.closePath(); return s; };
  const darkShape = shape([[-1.25, -1.2], [-0.62, -1.2], [-0.62, 0.32], [0.3, -0.62], [0.3, 0.12], [-0.42, 1.2], [-1.25, 1.2]]);
  const wineShape = shape([[0.42, -1.2], [1.08, -1.2], [1.08, 1.2], [0.42, 1.2], [0.42, 0.0]]);
  const extrude = { depth: 0.55, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 6, curveSegments: 4 };

  const darkMat = new THREE.MeshPhysicalMaterial({ color: 0x2a2d36, metalness: 0.85, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.15 });
  const wineMat = new THREE.MeshPhysicalMaterial({ color: 0x9b1a44, metalness: 0.55, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.1, sheen: 0.4, sheenColor: new THREE.Color(0xff6b9d) });

  const g1 = new THREE.ExtrudeGeometry(darkShape, extrude); g1.translate(-0.15, 0, -0.275);
  const g2 = new THREE.ExtrudeGeometry(wineShape, extrude); g2.translate(-0.15, 0, -0.275);
  const m1 = new THREE.Mesh(g1, darkMat), m2 = new THREE.Mesh(g2, wineMat);
  logo.add(m1, m2);

  // Orbit rings
  const rings = new THREE.Group(); scene.add(rings);
  const ringMat = (c, o) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o });
  const r1 = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.012, 8, 160), ringMat(0x8b1538, 0.75));
  const r2 = new THREE.Mesh(new THREE.TorusGeometry(2.95, 0.008, 8, 160), ringMat(0x5470c8, 0.5));
  r1.rotation.x = 1.25; r2.rotation.set(1.0, 0.5, 0);
  rings.add(r1, r2);

  // Satellites on rings
  const satGeo = new THREE.SphereGeometry(0.075, 16, 16);
  const sat1 = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: 0xff4f8b }));
  const sat2 = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: 0x8fa8ff }));
  r1.add(sat1); r2.add(sat2);

  // Floating coins with ₹ embossed via canvas texture
  const coinTex = (() => {
    const c = document.createElement("canvas"); c.width = c.height = 256;
    const x = c.getContext("2d");
    const grd = x.createRadialGradient(100, 90, 20, 128, 128, 128);
    grd.addColorStop(0, "#ffe7a3"); grd.addColorStop(.6, "#d9a640"); grd.addColorStop(1, "#9c6b14");
    x.fillStyle = grd; x.beginPath(); x.arc(128, 128, 128, 0, Math.PI * 2); x.fill();
    x.strokeStyle = "rgba(120,80,10,.55)"; x.lineWidth = 10; x.beginPath(); x.arc(128, 128, 104, 0, Math.PI * 2); x.stroke();
    x.fillStyle = "rgba(110,70,5,.85)"; x.font = "bold 130px Arial, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("₹", 128, 138);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  })();
  const coinGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.06, 48);
  const edge = new THREE.MeshStandardMaterial({ color: 0xc8922c, metalness: 1, roughness: 0.3 });
  const face = new THREE.MeshStandardMaterial({ map: coinTex, metalness: 0.7, roughness: 0.35 });
  const coins = [];
  [[-2.3, 1.6, -0.5], [2.35, -1.5, 0.3], [2.0, 1.9, -1.2], [-2.0, -1.9, -0.8]].forEach(([x, y, z], i) => {
    const c = new THREE.Mesh(coinGeo, [edge, face, face]);
    c.position.set(x, y, z); c.rotation.x = Math.PI / 2; c.userData = { y, phase: i * 1.7, spin: 0.6 + i * 0.15 };
    scene.add(c); coins.push(c);
  });

  // Rising bar chart behind the logo (growth)
  const barsG = new THREE.Group(); barsG.position.set(0.2, -1.6, -2.2); scene.add(barsG);
  const barMat = new THREE.MeshStandardMaterial({ color: 0x1d3270, metalness: 0.3, roughness: 0.5, transparent: true, opacity: 0.55 });
  const bars = [0.8, 1.3, 1.1, 1.8, 2.4].map((h, i) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1, 0.42), barMat);
    b.position.x = (i - 2) * 0.62; b.userData.h = h; barsG.add(b); return b;
  });

  // Particle field
  const N = 600, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 3.4 + Math.random() * 3, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
    pos.set([r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p) - 2], i * 3);
  }
  const pGeo = new THREE.BufferGeometry(); pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.03, color: 0x8b1538, transparent: true, opacity: 0.6, depthWrite: false });
  const particles = new THREE.Points(pGeo, pMat); scene.add(particles);

  const applyTheme = () => {
    const dark = document.documentElement.dataset.theme === "dark";
    pMat.color.set(dark ? 0xff7aa6 : 0x8b1538);
    darkMat.color.set(dark ? 0x4a4f5e : 0x2a2d36);
    barMat.color.set(dark ? 0x3d5bbd : 0x1d3270);
  };
  applyTheme(); addEventListener("themechange", applyTheme);

  // Interaction: mouse parallax + drag
  const mouse = { x: 0, y: 0 };
  addEventListener("pointermove", e => { mouse.x = e.clientX / innerWidth - 0.5; mouse.y = e.clientY / innerHeight - 0.5; }, { passive: true });
  const drag = dragControl(canvas);
  const vis = visibility(canvas);
  const resize = () => fit(renderer, camera, canvas);
  new ResizeObserver(resize).observe(canvas); resize();

  const clock = new THREE.Clock();
  let intro = 0;
  (function loop() {
    requestAnimationFrame(loop);
    if (!vis.visible) return;
    const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
    intro = Math.min(1, intro + 0.012);
    const ease = 1 - Math.pow(1 - intro, 3);
    drag.step();

    const auto = reduce ? 0 : Math.sin(t * 0.5) * 0.35;
    logo.rotation.y += ((auto + drag.ry + mouse.x * 0.6) - logo.rotation.y) * 0.06;
    logo.rotation.x += ((drag.rx + mouse.y * 0.35 + (reduce ? 0 : Math.sin(t * 0.7) * 0.06)) - logo.rotation.x) * 0.06;
    logo.position.y = reduce ? 0 : Math.sin(t * 1.1) * 0.08;
    logo.scale.setScalar(0.4 + 0.6 * ease);
    // pieces assemble on load
    m1.position.x = -(1 - ease) * 2.5; m2.position.x = (1 - ease) * 2.5;

    if (!reduce) {
      r1.rotation.z = t * 0.25; r2.rotation.z = -t * 0.18;
      rings.rotation.y = mouse.x * 0.3;
      sat1.position.set(Math.cos(t * 0.9) * 2.55, Math.sin(t * 0.9) * 2.55, 0);
      sat2.position.set(Math.cos(-t * 0.7 + 2) * 2.95, Math.sin(-t * 0.7 + 2) * 2.95, 0);
      coins.forEach(c => {
        c.rotation.z += dt * c.userData.spin;
        c.rotation.x = Math.PI / 2 + Math.sin(t + c.userData.phase) * 0.5;
        c.position.y = c.userData.y + Math.sin(t * 0.9 + c.userData.phase) * 0.15;
      });
      particles.rotation.y = t * 0.03; particles.rotation.x = mouse.y * 0.2;
    }
    bars.forEach((b, i) => {
      const h = b.userData.h * Math.min(1, Math.max(0, ease * 1.6 - i * 0.12)) * (reduce ? 1 : 1 + Math.sin(t * 1.2 + i) * 0.05);
      b.scale.y = Math.max(0.001, h); b.position.y = h / 2;
    });
    renderer.render(scene, camera);
  })();
}

/* =========================================================
   GLOBE — dotted sphere with animated arcs from India
   ========================================================= */
function globe() {
  const canvas = document.getElementById("globeCanvas");
  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0, 7.2);
  const R = 2;

  const world = new THREE.Group(); scene.add(world);
  world.rotation.z = 0.41; // axial tilt

  const toVec = (lat, lon, r = R) => {
    const phi = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180;
    return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
  };

  // Inner sphere + atmosphere
  world.add(new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 64, 64), new THREE.MeshBasicMaterial({ color: 0x0c1733 })));
  const atmo = new THREE.Mesh(new THREE.SphereGeometry(R * 1.18, 64, 64), new THREE.ShaderMaterial({
    transparent: true, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { c: { value: new THREE.Color(0xb0285a) } },
    vertexShader: "varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
    fragmentShader: "uniform vec3 c; varying vec3 vN; void main(){ float d = -dot(vN, vec3(0,0,1.0)); float i = smoothstep(0.0, 0.55, d) * 0.55; gl_FragColor = vec4(c * i, i); }"
  }));
  scene.add(atmo);

  // Fibonacci dot sphere
  const DOTS = 2600, dp = new Float32Array(DOTS * 3), dc = new Float32Array(DOTS * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const cA = new THREE.Color(0x5b7bf0), cB = new THREE.Color(0xc4d2ff);
  for (let i = 0; i < DOTS; i++) {
    const y = 1 - (i / (DOTS - 1)) * 2, rad = Math.sqrt(1 - y * y), th = golden * i;
    dp.set([Math.cos(th) * rad * R, y * R, Math.sin(th) * rad * R], i * 3);
    const c = cA.clone().lerp(cB, Math.random() * 0.6); dc.set([c.r, c.g, c.b], i * 3);
  }
  const dGeo = new THREE.BufferGeometry();
  dGeo.setAttribute("position", new THREE.BufferAttribute(dp, 3));
  dGeo.setAttribute("color", new THREE.BufferAttribute(dc, 3));
  world.add(new THREE.Points(dGeo, new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.95 })));

  // Lat/long grid lines
  const gridMat = new THREE.LineBasicMaterial({ color: 0x2a3f80, transparent: true, opacity: 0.35 });
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts = []; for (let lon = -180; lon <= 180; lon += 6) pts.push(toVec(lat, lon, R * 1.002));
    world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
  }

  // India hub
  const IN = [20.6, 78.9];
  const home = toVec(...IN);
  const hub = new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 20), new THREE.MeshBasicMaterial({ color: 0xff4f8b }));
  hub.position.copy(home); world.add(hub);
  const pulse = new THREE.Mesh(new THREE.RingGeometry(0.08, 0.11, 40), new THREE.MeshBasicMaterial({ color: 0xff4f8b, transparent: true, side: THREE.DoubleSide }));
  pulse.position.copy(home.clone().multiplyScalar(1.001)); pulse.lookAt(home.clone().multiplyScalar(2)); world.add(pulse);

  // Arcs to major business destinations
  const dests = [[38.9, -77], [51.5, -0.1], [25.2, 55.3], [1.35, 103.8], [-33.9, 151.2], [43.7, -79.4], [50.1, 8.7], [35.7, 139.7], [-26.2, 28], [52.4, 4.9]];
  const arcs = dests.map(([la, lo], i) => {
    const end = toVec(la, lo);
    const mid = home.clone().add(end).multiplyScalar(0.5);
    const dist = home.distanceTo(end);
    mid.normalize().multiplyScalar(R + dist * 0.42);
    const curve = new THREE.QuadraticBezierCurve3(home, mid, end);
    const pts = curve.getPoints(80);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x7ea2ff, transparent: true, opacity: 0.85 }));
    geo.setDrawRange(0, 0); world.add(line);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    world.add(dot);
    const pin = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), new THREE.MeshBasicMaterial({ color: 0x7ea2ff }));
    pin.position.copy(end); world.add(pin);
    return { curve, geo, dot, delay: i * 0.45, len: 81 };
  });

  // Orbiting ring
  const orbit = new THREE.Mesh(new THREE.TorusGeometry(R * 1.35, 0.006, 6, 200), new THREE.MeshBasicMaterial({ color: 0xff7aa6, transparent: true, opacity: 0.4 }));
  orbit.rotation.x = 1.3; scene.add(orbit);

  // Face India initially
  const baseY = -(IN[1] + 180) * Math.PI / 180 + Math.PI / 2 - 0.5;
  world.rotation.y = baseY;

  const drag = dragControl(canvas);
  const vis = visibility(canvas);
  const resize = () => fit(renderer, camera, canvas);
  new ResizeObserver(resize).observe(canvas); resize();

  const clock = new THREE.Clock();
  (function loop() {
    requestAnimationFrame(loop);
    if (!vis.visible) return;
    const t = clock.getElapsedTime();
    drag.step();
    world.rotation.y = baseY + (reduce ? 0 : Math.sin(t * 0.15) * 0.9) + drag.ry;
    world.rotation.x = drag.rx * 0.6;
    orbit.rotation.z = t * 0.2;

    const ps = (t * 0.9) % 1.6; pulse.scale.setScalar(1 + ps * 3); pulse.material.opacity = Math.max(0, 1 - ps / 1.6);

    arcs.forEach(a => {
      const cycle = 5.5, local = ((t - a.delay) % cycle + cycle) % cycle;
      const grow = reduce ? 1 : Math.min(1, Math.max(0, local / 1.6));
      a.geo.setDrawRange(0, Math.floor(grow * a.len));
      const k = reduce ? 1 : Math.min(1, Math.max(0, (local - 0.1) / 1.6));
      a.dot.position.copy(a.curve.getPoint(k));
      a.dot.visible = !reduce && local < 1.8;
    });
    renderer.render(scene, camera);
  })();
}

if (hasWebGL()) {
  try { hero(); } catch (e) { console.warn(e); document.getElementById("heroStage").classList.add("no-webgl"); }
  try { globe(); } catch (e) { console.warn(e); }
} else {
  document.getElementById("heroStage").classList.add("no-webgl");
}
