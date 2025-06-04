const names = [
  "HRDC", "Babymain", "Falos", "1666sikna", "aasstau",
  "katu", "spaudikas", "kilimaz", "csmaster", "katukavakare",
  "bbd", "cbb", "aiktu", "kay", "names"
];

const roulette = document.getElementById('roulette');
const winnerDisplay = document.getElementById('winner');

function populateRoulette() {
  roulette.innerHTML = '';
  const extended = [...names, ...names, ...names];
  extended.forEach(name => {
    const item = document.createElement('div');
    item.className = 'name-item';
    item.textContent = name;
    roulette.appendChild(item);
  });
}

populateRoulette();

function startSpin() {
      // Сброс позиции и анимации
  roulette.style.transition = 'none';
  roulette.style.left = '0px';
  roulette.offsetHeight; // принудительный reflow
  const itemWidth = 150;
  const totalItems = roulette.children.length;
  const visibleItems = Math.floor(document.querySelector('.roulette-container').offsetWidth / itemWidth);
  const middleIndex = Math.floor(visibleItems / 2);
  const targetIndex = middleIndex + 10 + Math.floor(Math.random() * (totalItems - 20));
  const offset = targetIndex * itemWidth;


  
  // Увеличиваем длительность кручения рулетки
  const spinTime = 6000; // 6 секунд
  roulette.style.transition = `left ${spinTime / 1000}s cubic-bezier(0.15, 0.85, 0.35, 1)`;
  roulette.style.left = `-${offset - middleIndex * itemWidth}px`;

  setTimeout(() => {
    // Определяем элемент под красной стрелкой
    const selector = document.querySelector('.selector');
    const selectorX = selector.getBoundingClientRect().left + selector.offsetWidth / 2;

    const items = [...roulette.children];
    const winnerItem = items.find(item => {
      const rect = item.getBoundingClientRect();
      return selectorX >= rect.left && selectorX <= rect.right;
    });

    const name = winnerItem ? winnerItem.textContent : 'Не найден';
    winnerDisplay.textContent = `🏆 Победитель: ${name} 🏆`;
    launchFireworks();
  }, spinTime);
}

// Фейерверк
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

    // Меняем анимацию на 2 секунды
    particle.style.animation = "explode 4s ease-out forwards";

    container.appendChild(particle);

    // Удаление через 2 секунды
    setTimeout(() => {
      container.removeChild(particle);
    }, 2000);
  }
}

function getRandomColor() {
  const colors = ["#ff4d4d", "#ffd93b", "#3ae374", "#17c0eb", "#a29bfe", "#ff6b81"];
  return colors[Math.floor(Math.random() * colors.length)];
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault(); // чтобы страница не прокручивалась
    startSpin();
  }
});
