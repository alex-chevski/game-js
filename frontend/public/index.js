const $start = document.getElementById('start');
const $game = document.getElementById('game');
const $time = document.getElementById('time');
const $result = document.getElementById('result');
// панель времени
const $timeHeader = document.getElementById('time-header');
const $resultHeader = document.getElementById('result-header');
const $gameTime = document.getElementById('game-time');

//установка счета и флага для начала игры
let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function show($el) {
  $el.classList.remove('hide');
}

function hide($el) {
  $el.classList.add('hide');
}

function startGame() {
  //установка начальных параметров
  score = 0;
  $gameTime.setAttribute('disabled', true);
  setGameTime();
  hide($start);
  show($timeHeader);
  hide($resultHeader);
  isGameStarted = true;
  $game.style.background = '#fff';

  //ф-ционал течения времени
  let interval = setInterval(function () {
    let time = !isNaN(parseFloat($time.textContent))
      ? parseFloat($time.textContent)
      : 5.0;

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
  let time = !isNaN(parseInt($gameTime.value))
    ? parseInt($gameTime.value)
    : 5.0;

  $time.textContent = time.toFixed(1);
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute('disabled');
  //начальное окно после истечения таймера(Что показать что скрыть)
  show($start);
  $game.innerHTML = '';
  $game.style.backgroundColor = '#ccc';
  hide($timeHeader);
  show($resultHeader);
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }
  //cобытие нажатия на нужный квадрат
  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.textContent = '';
  // cоздания блока на который будем нажимать
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
