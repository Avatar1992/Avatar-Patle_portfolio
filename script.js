// Typing effect
const text = ["AWS Data Engineer", "PySpark Expert", "ETL & Data Lake Specialist"];
let i = 0, j = 0;
let current = "", deleting = false;

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
