const $start = document.getElementById('start');
const $game = document.getElementById('game');

let score = 0;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);

function startGame() {
  $start.classList.add('hide');
  $game.style.background = '#fff';
  renderBox();
}

function handleBoxClick(event) {
  if (event.target.dataset) {
    console.log(event.target.dataset);
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.textContent = '';
  // создаем тег div
  let box = document.createElement('div');

  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;

  // задаем параметры css блоку box
  box.style.height = box.style.width = `${boxSize}px`;
  box.style.position = 'absolute';
  box.style.backgroundColor = '#000';
  box.style.top = `${getRandom(0, maxTop)}px`;
  box.style.left = `${getRandom(0, maxLeft)}px`;
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', true);

  //вставляем в блок game наш тег box
  $game.insertAdjacentElement('afterbegin', box);
}

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
