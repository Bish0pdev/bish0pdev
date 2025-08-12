const canvas = document.getElementById("bg-particles");
const ctx = canvas.getContext("2d");

let particles = [];
let w, h;
let mouse = { x: null, y: null };
const accentColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--text-color-alt") || "#9400b9";

function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function createParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 2 + 1,
            baseSize: 0, // will store original size
            baseSpeedX: (Math.random() - 0.5) * 0.2,
            baseSpeedY: (Math.random() - 0.5) * 0.2,
            alpha: Math.random() * 0.5 + 0.3
        });
        particles[i].baseSize = particles[i].size;
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
        ctx.beginPath();

        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.glow || 0;
        ctx.shadowColor = p.color || "purple";
        ctx.fillStyle = p.color || "purple";

        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.shadowBlur = 0; // reset after drawing
}

function updateParticles() {
    const attractionRadius = 100;

    particles.forEach(p => {
        let dx = 0;
        let dy = 0;

        if (mouse.x !== null) {
            const distX = mouse.x - p.x;
            const distY = mouse.y - p.y;
            const dist = Math.sqrt(distX * distX + distY * distY);

            if (dist < attractionRadius && dist > 0) {
                // Attraction force
                const force = (1 - dist / attractionRadius) * 0.05;
                dx = distX * force;
                dy = distY * force;

                // Visual effects for close particles
                const intensity = 1 - dist / attractionRadius; // 0 to 1
                p.color = accentColor;
                p.glow = 10 + intensity * 20; // more glow when closer
                //p.size = p.baseSize + intensity * 2; // bigger when closer
                p.alpha = 0.5 + intensity * 0.5;
            } else {
                // Reset to base style when far
                p.color = "purple";
                p.glow = 1;
                p.size = p.baseSize;
                p.alpha = 0.3;
            }
        }

        p.x += p.baseSpeedX + dx;
        p.y += p.baseSpeedY + dy;

        // wrap edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
    });
}

function animate() {
    drawParticles();
    updateParticles();
    requestAnimationFrame(animate);
}

// Init
createParticles(120);
animate();
