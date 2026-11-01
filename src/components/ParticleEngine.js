export class ParticleEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.sparkles = [];
    this.mouse = { x: -9999, y: -9999 };
    this.w = 0;
    this.h = 0;
    this.rect = { left: 0, top: 0 };
    this.animId = null;
    this.sparkleId = null;
    this.destroyed = false;
    this.CONNECT_SQ = 140 * 140;
    this.CONNECT = 140;
    this.MOUSE_R = 180;
    this.MOUSE_R_SQ = 180 * 180;
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._loop = this._loop.bind(this);
  }
  start() {
    window.addEventListener("mousemove", this._onMouseMove);
    window.addEventListener("mouseleave", this._onMouseLeave);
    window.addEventListener("scroll", this._onScroll, { passive: true });
    this.resize();
    this._initParticles();
    this.sparkleId = setInterval(() => {
      if (this.w === 0) return;
      this.sparkles.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        life: 1,
        decay: Math.random() * 0.02 + 0.015,
        size: Math.random() * 3 + 2,
      });
    }, 400);
    this._loop();
  }
  destroy() {
    this.destroyed = true;
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.sparkleId) clearInterval(this.sparkleId);
    window.removeEventListener("mousemove", this._onMouseMove);
    window.removeEventListener("mouseleave", this._onMouseLeave);
    window.removeEventListener("scroll", this._onScroll);
  }
  resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const r = parent.getBoundingClientRect();
    this.w = r.width;
    this.h = r.height;
    this.rect = { left: r.left, top: r.top };
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.w * dpr;
    this.canvas.height = this.h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  _updateRect() {
    const r = this.canvas.getBoundingClientRect();
    this.rect = { left: r.left, top: r.top };
  }
  _onScroll() {
    this._updateRect();
  }
  _initParticles() {
    const count = Math.min(60, Math.floor((this.w * this.h) / 16000));
    this.particles = [];
    for (let i = 0; i < count; i++)
      this.particles.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.5 + 0.3,
      });
  }
  _onMouseMove(e) {
    this.mouse.x = e.clientX - this.rect.left;
    this.mouse.y = e.clientY - this.rect.top;
  }
  _onMouseLeave() {
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  }
  _loop() {
    if (this.destroyed) return;
    const {
      ctx,
      w,
      h,
      particles,
      mouse,
      CONNECT,
      CONNECT_SQ,
      MOUSE_R,
      MOUSE_R_SQ,
    } = this;
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
      const dx = p.x - mouse.x,
        dy = p.y - mouse.y,
        dSq = dx * dx + dy * dy;
      if (dSq < MOUSE_R_SQ && dSq > 0) {
        const d = Math.sqrt(dSq);
        p.x += (dx / d) * ((MOUSE_R - d) / MOUSE_R) * 0.8;
        p.y += (dy / d) * ((MOUSE_R - d) / MOUSE_R) * 0.8;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.2832);
      ctx.fillStyle = `rgba(108,92,231,${p.alpha})`;
      ctx.fill();
    }
    for (let i = 0, len = particles.length; i < len; i++) {
      const pi = particles[i];
      for (let j = i + 1; j < len; j++) {
        const pj = particles[j];
        const dx = pi.x - pj.x,
          dy = pi.y - pj.y,
          dSq = dx * dx + dy * dy;
        if (dSq < CONNECT_SQ) {
          const d = Math.sqrt(dSq);
          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.strokeStyle = `rgba(108,92,231,${(1 - d / CONNECT) * 0.15})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    const inBounds = mouse.x > 0 && mouse.x < w && mouse.y > 0 && mouse.y < h;
    if (inBounds) {
      for (const p of particles) {
        const dx = p.x - mouse.x,
          dy = p.y - mouse.y,
          dSq = dx * dx + dy * dy;
        if (dSq < MOUSE_R_SQ) {
          const d = Math.sqrt(dSq);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(162,155,254,${(1 - d / MOUSE_R) * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      const g = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        120,
      );
      g.addColorStop(0, "rgba(108,92,231,0.1)");
      g.addColorStop(1, "rgba(108,92,231,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 120, 0, 6.2832);
      ctx.fill();
    }
    this.sparkles = this.sparkles.filter((s) => s.life > 0.01);
    for (const s of this.sparkles) {
      s.life -= s.decay;
      if (s.life <= 0) continue;
      const a = s.life,
        sz = s.size * a;
      if (sz < 0.5) continue;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.globalAlpha = a;
      ctx.beginPath();
      ctx.moveTo(0, -sz);
      ctx.lineTo(sz * 0.3, -sz * 0.3);
      ctx.lineTo(sz, 0);
      ctx.lineTo(sz * 0.3, sz * 0.3);
      ctx.lineTo(0, sz);
      ctx.lineTo(-sz * 0.3, sz * 0.3);
      ctx.lineTo(-sz, 0);
      ctx.lineTo(-sz * 0.3, -sz * 0.3);
      ctx.closePath();
      ctx.fillStyle = "#fff";
      ctx.fill();
      const glowR = Math.max(sz * 3, 0.1);
      const sg = ctx.createRadialGradient(0, 0, 0, 0, 0, glowR);
      sg.addColorStop(0, `rgba(162,155,254,${a * 0.4})`);
      sg.addColorStop(1, "rgba(162,155,254,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(-glowR, -glowR, glowR * 2, glowR * 2);
      ctx.restore();
    }
    this.animId = requestAnimationFrame(this._loop);
  }
}
