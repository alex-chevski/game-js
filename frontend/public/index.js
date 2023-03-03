const $start = document.getElementById('start');
const $game = document.getElementById('game');

$start.addEventListener('click', startGame);

function startGame() {
  $start.classList.add('hide');
  $game.style.background = '#fff';
}
