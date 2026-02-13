const bootScreen = document.getElementById("bootScreen");
const terminalWindow = document.getElementById("terminalWindow");
const output = document.getElementById("output");
const input = document.getElementById("commandInput");

// ===== MATRIX BACKGROUND =====
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const letters = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff88";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.98)
      drops[i] = 0;

    drops[i]++;
  });
}
setInterval(drawMatrix, 40);

// ===== BOOT SEQUENCE =====
const bootText = [
  "Initializing Avatar Cloud Console...",
  "Loading infrastructure modules...",
  "Establishing secure channels...",
  "Starting DevOps runtime...",
  "Access granted ✔"
];

let i = 0;

function showBoot() {
  if (i < bootText.length) {
    bootScreen.innerHTML += bootText[i] + "\n";
    i++;
    setTimeout(showBoot, 120);
  } else {
    startTerminal();
  }
}
showBoot();

/// ===== START TERMINAL =====
function startTerminal() {
  bootScreen.classList.add("hidden");
  terminalWindow.classList.remove("hidden");

  printOutput(`
╔════════════════════════════════════════════════════╗
║                      AVATAR                        ║
║         Cloud • Platform • Reliability • AI        ║
║            DevOps & Infrastructure Engineer        ║
╚════════════════════════════════════════════════════╝

Welcome to the Avatar Cloud Console

Type 'help' to view available commands.
`);
}

// ===== OUTPUT =====
function printOutput(text) {
  output.innerHTML += `<pre>${text}</pre>`;
  output.scrollTop = output.scrollHeight;
}

// ===== COMMAND SYSTEM =====
input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = input.value.trim().toLowerCase();
    handleCommand(cmd);
    input.value = "";
  }
});

function handleCommand(cmd) {

  switch (cmd) {

    case "help":
      printOutput(`
about      — Profile summary
skills     — Technical skills
projects   — Key projects
resume     — Download resume
linkedin   — Open LinkedIn
github     — Open GitHub
photo      — Show profile image
clear      — Clear terminal
`);
      break;

    case "about":
      printOutput("DevOps & Cloud Engineer with expertise in AWS, Kubernetes, IaC, CI/CD, and AI-driven automation.");
      break;

    case "skills":
      printOutput("AWS • Kubernetes • Docker • Terraform • Ansible • Jenkins • GitOps • Python • Observability");
      break;

    case "projects":
      printOutput("AI-SRE Platform • GitOps Microservices • CI/CD Automation • Telecom ETL Dashboard");
      break;

    case "resume":
      window.open("resume.pdf", "_blank");
      break;

    case "linkedin":
      window.open("https://www.linkedin.com/in/avatar-patle-devops-cloud905144226", "_blank");
      break;

    case "github":
      window.open("https://github.com/Avatar1992", "_blank");
      break;

    case "photo":
      printOutput('<img src="profile.jpg">');
      break;

    case "clear":
      output.innerHTML = "";
      break;

    default:
      printOutput("Command not found. Type 'help'");
  }
}
