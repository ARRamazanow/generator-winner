
const spinSound = new Audio("sound/spinner.mp3");
const fireworksSound = new Audio("sound/fire.mp3");



let names = JSON.parse(localStorage.getItem("winner-names")) || [];


const roulette = document.getElementById('roulette');
const winnerDisplay = document.getElementById('winner');

function populateRoulette() {
  roulette.innerHTML = '';
  const extended = [...names];
  extended.forEach(name => {
    const item = document.createElement('div');
    item.className = 'name-item';
    item.textContent = name;
    roulette.appendChild(item);
  });
}

populateRoulette();

let isSpinning = false;

function startSpin() {
  if (isSpinning) return;
  isSpinning = true;
spinSound.currentTime = 4;
spinSound.play();
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
    fireworksSound.currentTime = 0;
fireworksSound.play();
  isSpinning = false;
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

function updateNameListUI() {
  const nameList = document.getElementById("name-list");
  nameList.innerHTML = "";

  names.forEach((name, index) => {
    const li = document.createElement("li");
    li.textContent = name;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Удалить";
    delBtn.addEventListener("click", () => {
      names.splice(index, 1);
      saveNames();
      updateNameListUI();
      populateRoulette();
    });

    li.appendChild(delBtn);
    nameList.appendChild(li);
  });
}

function saveNames() {
  localStorage.setItem("winner-names", JSON.stringify(names));
}

document.getElementById("add-name-btn").addEventListener("click", () => {
  const input = document.getElementById("new-name");
  const newName = input.value.trim();
  if (newName) {
    names.push(newName);
    input.value = "";
    saveNames();
    updateNameListUI();
    populateRoulette();
  }
});

// при старте
updateNameListUI();


function toggleEditor() {
  const editor = document.getElementById("editor");
  if (editor.style.display === "none") {
    editor.style.display = "block";
  } else {
    editor.style.display = "none";
  }
}

const toggleBtn = document.getElementById("toggle-editor-btn");

toggleBtn.addEventListener("click", () => {
  const editor = document.getElementById("name-editor");
  if (!editor) return;

  if (editor.style.display === "none") {
    editor.style.display = "block";
    toggleBtn.textContent = "Свернуть редактор";
  } else {
    editor.style.display = "none";
    toggleBtn.textContent = "Развернуть редактор";
  }
});
