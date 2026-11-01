// Canvas 2D star field flying toward the viewer. `setWarp(true)` ramps the
// speed up so stars stretch into streaks; no WebGL, ~0 KB of dependencies.
const PALETTE = [
  "#ffffff",
  "#e8e8f0",
  "#a29bfe",
  "#a29bfe",
  "#00cec9",
  "#6c5ce7",
];

export class StarField {
  constructor(
    canvas,
    { reduced = false, density = 1, maxWarp = 1.1, transparent = false } = {},
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.reduced = reduced;
    this.density = density;
    this.maxWarp = maxWarp;
    // transparent: clear each frame instead of painting a trail, so the
    // section background (gradients) shows through
    this.transparent = transparent;
    this.stars = [];
    this.speed = 0.06;
    this.target = 0.06;
    this.base = 0.06;
    this.cx = 0;
    this.cy = 0;
    this.offX = 0;
    this.offY = 0;
    this.tOffX = 0;
    this.tOffY = 0;
    this.running = false;
    this.raf = 0;
    this.last = 0;
    this._loop = this._loop.bind(this);
    this.resize();
  }
  resize() {
    const p = this.canvas.parentElement;
    const w = p.clientWidth;
    const h = p.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = w;
    this.h = h;
    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.focal = Math.max(w, h) * 0.5;
    const count = Math.min(
      Math.round(((w * h) / 2600) * this.density),
      Math.round(650 * this.density),
    );
    while (this.stars.length < count) this.stars.push(this._spawn(true));
    this.stars.length = count;
    if (!this.running) this._draw(0);
  }
  _spawn(anyDepth) {
    return {
      x: (Math.random() - 0.5) * 2.2,
      y: (Math.random() - 0.5) * 2.2,
      z: anyDepth ? Math.random() * 0.95 + 0.05 : 1,
      pz: null,
      c: PALETTE[(Math.random() * PALETTE.length) | 0],
      s: Math.random() * 1.1 + 0.4,
    };
  }
  setWarp(on) {
    this.target = on ? this.maxWarp : this.base;
  }
  setPointer(nx, ny) {
    this.tOffX = nx * this.w * 0.06;
    this.tOffY = ny * this.h * 0.06;
  }
  setBoost(v) {
    // scroll (hero) or hovering a CTA (contact) adds speed below full warp
    this.base = 0.06 + v * 0.4;
    if (this.target < 0.5) this.target = this.base;
  }
  start() {
    if (this.running || this.reduced) {
      if (this.reduced) this._draw(0);
      return;
    }
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this._loop);
  }
  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }
  destroy() {
    this.stop();
  }
  _loop(now) {
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    this._draw(dt);
    if (this.running) this.raf = requestAnimationFrame(this._loop);
  }
  _draw(dt) {
    const { ctx, w, h } = this;
    // ease speed: fast attack, slower release
    const k = this.target > this.speed ? 2.2 : 1.4;
    this.speed += (this.target - this.speed) * Math.min(dt * k, 1);
    this.offX += (this.tOffX - this.offX) * Math.min(dt * 2, 1);
    this.offY += (this.tOffY - this.offY) * Math.min(dt * 2, 1);
    this.cx = w / 2 + this.offX;
    this.cy = h * 0.46 + this.offY;
    const warp = Math.min(Math.max((this.speed - 0.1) / 1.0, 0), 1);

    // motion-blur trail: clear less while warping
    ctx.globalCompositeOperation = "source-over";
    if (this.transparent) {
      ctx.clearRect(0, 0, w, h);
    } else {
      ctx.fillStyle = `rgba(10,10,15,${0.85 - warp * 0.55})`;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";

    for (const st of this.stars) {
      st.pz = st.z;
      st.z -= this.speed * dt * 0.6;
      if (st.z <= 0.02) {
        Object.assign(st, this._spawn(false));
        st.pz = 1;
        continue;
      }
      const sx = this.cx + (st.x / st.z) * this.focal;
      const sy = this.cy + (st.y / st.z) * this.focal;
      if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) {
        Object.assign(st, this._spawn(false));
        st.pz = 1;
        continue;
      }
      const depth = 1 - st.z;
      const size = st.s * (0.4 + depth * 1.8);
      const alpha = Math.min(depth * 1.4, 1);
      ctx.globalAlpha = alpha;
      if (warp > 0.02 && st.pz) {
        // streak from the previous depth, stretched by warp amount
        const pz = st.z + (st.pz - st.z) * (1 + warp * 14);
        const px = this.cx + (st.x / pz) * this.focal;
        const py = this.cy + (st.y / pz) * this.focal;
        ctx.strokeStyle = st.c;
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      } else {
        ctx.fillStyle = st.c;
        ctx.beginPath();
        ctx.arc(sx, sy, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }
}
