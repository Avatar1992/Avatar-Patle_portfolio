// Typing effect
const text = ["AWS Data Engineer", "PySpark Expert", "ETL Specialist"];
let i = 0, j = 0, current = "", deleting = false;

function type() {
  let word = text[i];

  if (!deleting) {
    current = word.substring(0, j++);
    if (j > word.length) deleting = true;
  } else {
    current = word.substring(0, j--);
    if (j < 0) {
      deleting = false;
      i = (i + 1) % text.length;
    }
  }

  document.getElementById("typing").innerText = current;
  setTimeout(type, deleting ? 50 : 100);
}
type();

// Scroll animation
function reveal() {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// Data animation
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 2,
    speed: Math.random() * 1 + 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#38bdf8";

  particles.forEach(p => {
    p.y -= p.speed;

    if (p.y < 0) {
      p.y = canvas.height;
      p.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
