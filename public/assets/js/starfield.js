/**
 * 3D Starfield Animation
 * Stars move toward viewer from entire screen area
 * Similar to moving through space effect
 */

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let w, h, centerX, centerY;

// Configuration
const STAR_COUNT = 1200;
const SPEED = 2;
const MAX_DEPTH = 2000;
const MIN_DEPTH = 1;

function init() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  centerX = w / 2;
  centerY = h / 2;

  // Create stars distributed across entire screen
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(createStar());
  }
}

function createStar() {
  // Spawn stars across entire screen area (not just center)
  // Using wider distribution for full-screen coverage
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * Math.max(w, h) * 1.5;

  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius,
    z: Math.random() * MAX_DEPTH + MIN_DEPTH,
    baseSize: Math.random() * 0.4 + 0.15, // Small base size
    speed: 0.7 + Math.random() * 1.3,
  };
}

function animate() {
  // Clear with slight trail for motion blur effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, w, h);

  // Update and draw each star
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];

    // Move star toward viewer
    star.z -= SPEED * star.speed;

    // Reset star if it passes the viewer
    if (star.z <= MIN_DEPTH) {
      stars[i] = createStar();
      stars[i].z = MAX_DEPTH;
      continue;
    }

    // Calculate 3D perspective projection
    const k = 128 / star.z;
    const px = (star.x - centerX) * k + centerX;
    const py = (star.y - centerY) * k + centerY;

    // Calculate size - stars grow as they approach
    const depthRatio = 1 - star.z / MAX_DEPTH;
    const size = star.baseSize * (0.5 + depthRatio * 4);

    // Calculate subtle opacity
    const opacity = Math.min(0.4 + depthRatio * 0.5, 0.85);

    // Only draw if star is visible on screen
    if (px >= -50 && px <= w + 50 && py >= -50 && py <= h + 50) {
      // Draw star core
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();

      // Add very subtle glow for closer stars
      if (star.z < MAX_DEPTH * 0.3) {
        const glowSize = size * 1.8;
        const gradient = ctx.createRadialGradient(
          px,
          py,
          size,
          px,
          py,
          glowSize
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, glowSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw subtle motion trail for very close stars
      if (star.z < MAX_DEPTH * 0.2) {
        const prevZ = star.z + SPEED * star.speed;
        const prevK = 128 / prevZ;
        const prevPx = (star.x - centerX) * prevK + centerX;
        const prevPy = (star.y - centerY) * prevK + centerY;

        const trailGradient = ctx.createLinearGradient(prevPx, prevPy, px, py);
        trailGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        trailGradient.addColorStop(1, `rgba(255, 255, 255, ${opacity * 0.4})`);

        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = Math.max(size * 0.6, 0.5);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener("resize", () => {
  init();
});

// Start animation
init();
animate();
