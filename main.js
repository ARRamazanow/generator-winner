const names = [
  "HRDC", "Babymain", "Falos", "1666sikna", "aasstau",
  "katu", "spaudikas", "kilimaz", "csmaster", "katukavakare",
  "bbd", "cbb", "aiktu", "kay", "names"
];

function generateWinner() {
  const index = Math.floor(Math.random() * names.length);
  const winner = names[index];
  document.getElementById("winner").textContent = `🏆 Победитель: ${winner} 🏆`;

  launchFireworks();
}

function launchFireworks() {
  const container = document.getElementById("fireworks-container");
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "firework";
    
    const x = (Math.random() - 0.5) * 300 + "px";
    const y = (Math.random() - 0.5) * 300 + "px";

    particle.style.left = "50%";
    particle.style.top = "50%";
    particle.style.setProperty("--x", x);
    particle.style.setProperty("--y", y);
    particle.style.background = getRandomColor();

    container.appendChild(particle);

    setTimeout(() => {
      container.removeChild(particle);
    }, 1000);
  }
}

function getRandomColor() {
  const colors = ["#ff4d4d", "#ffd93b", "#3ae374", "#17c0eb", "#a29bfe", "#ff6b81"];
  return colors[Math.floor(Math.random() * colors.length)];
}
