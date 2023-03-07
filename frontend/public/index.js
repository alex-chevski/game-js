const $start = document.getElementById('start');
const $game = document.getElementById('game');
const $time = document.getElementById('time');
const $result = document.getElementById('result');
//переменная для установки таймера
const $timeHeader = document.getElementById('time-header');
//переменная для установки результата
const $resultHeader = document.getElementById('result-header');

let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);

function startGame() {
  score = 0;
  setGameTime();
  $timeHeader.classList.remove('hide');
  $resultHeader.classList.add('hide');

  $start.classList.add('hide');
  isGameStarted = true;
  $game.style.background = '#fff';
  let interval = setInterval(function () {
    let time = parseFloat($time.textContent);

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
  renderBox();
}

function setGameScore() {
  $result.textContent = score.toString();
}

function setGameTime() {
  let time = 5;
  $time.textContent = time.toFixed(1);
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  //начальное окно после истечения таймера(Что показать что скрыть)
  $start.classList.remove('hide');
  $game.innerHTML = '';
  $game.style.backgroundColor = '#ccc';
  $timeHeader.classList.add('hide');
  $resultHeader.classList.remove('hide');
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }
  if (event.target.dataset.box) {
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
