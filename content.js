chrome.storage.sync.get({ enabled: false, animation: "particles" }).then(data => {
  if (!data.enabled) {
    return;
  }

  const animationType = data.animation || "particles";

  if (document.getElementById("particle-canvas")) {
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.id = "particle-canvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = [];
  const count = animationType === "bubbles" ? 60 : animationType === "lines" ? 80 : 100;

  for (let i = 0; i < count; i++) {
    const particle = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: animationType === "bubbles" ? 8 + Math.random() * 12 : animationType === "lines" ? 2 : 2 + Math.random() * 3,
      dx: (Math.random() - 0.5) * (animationType === "lines" ? 0.8 : 2),
      dy: (Math.random() - 0.5) * (animationType === "lines" ? 0.8 : 2)
    };

    if (animationType === "bubbles") {
      particle.speed = 0.5 + Math.random() * 1.2;
      particle.alpha = 0.2 + Math.random() * 0.5;
    }

    particles.push(particle);
  }

  function drawParticle(p) {
    ctx.beginPath();

    if (animationType === "lines") {
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fill();
      return;
    }

    if (animationType === "bubbles") {
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();
      return;
    }

    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      drawParticle(p);

      if (animationType === "bubbles") {
        p.y -= p.speed;
        if (p.y + p.r < 0) {
          p.y = canvas.height + p.r;
          p.x = Math.random() * canvas.width;
        }
        return;
      }

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    if (animationType === "lines") {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = `rgba(255,255,255,${0.15 + (120 - dist) / 240})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
});