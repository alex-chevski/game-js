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
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.textContent = '';
  // создаем тег div
  let box = document.createElement('div');

  // задаем параметры css блоку box
  box.style.height = box.style.width = '50px';
  box.style.position = 'absolute';
  box.style.backgroundColor = '#000';
  box.style.top = '50px';
  box.style.left = '70px';
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', 'true');

  //вставляем в блок game наш тег box
  $game.insertAdjacentElement('afterbegin', box);
}
