const WEAPON_OPTIONS = new Map([
  [0, 'rock'],
  [1, 'paper'],
  [2, 'scissors'],
]);

const WEAPON_HIERARCHY = new Map([
  ['rock', 'scissors'],
  ['scissors', 'paper'],
  ['paper', 'rock'],
]);

// listeners
let punchKey = document.getElementById('rock');
let kickKey = document.getElementById('paper');
let sweepKey = document.getElementById('scissors');
let keys = document.querySelectorAll('.key');

// characters
let playerOne = document.querySelector('.player-1').lastChild;
let playerTwo = document.querySelector('.player-2');

function firePunch() {
  punchKey.classList.add('firing');
}

function fireKick() {
  kickKey.classList.add('firing');
}

function fireSweep() {
  sweepKey.classList.add('firing');
}

function removeEffect(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('firing');
}

document.addEventListener('keydown', function (e) {
  switch (e.code) {
    case 'KeyA':
      console.log(playerOne);
      firePunch();
      break;
    case 'KeyS':
      console.log(e);
      fireKick();
      break;
    case 'KeyD':
      console.log(e);
      fireSweep();
      break;
  }
  // if (e.code === 'KeyA') {
  //   console.log(e.code);
  // }
});

keys.forEach((key) => key.addEventListener('transitionend', removeEffect));
// punch_key.addEventListener('click', (e) => {
//   console.log(e);
// });

// FIXME: Audio
/*
const PIT_THEME = new Audio();
PIT_THEME.crossOrigin = 'anonymous';
PIT_THEME.autoplay = true;
document.body.appendChild(PIT_THEME);
*/

// this function returns either rock, paper, or scissors
function computerPlay() {
  let computerResult = Math.floor(Math.random() * 3);

  return WEAPON_OPTIONS.get(computerResult);
}

function playerPlay() {
  const MESSAGE = 'Choose your weapon';
  let playerSelection = window.prompt(MESSAGE).toLowerCase();
  return playerSelection;
}

// compare player vs computer to determine who wins round
function playRound(playerSelection, computerSelection) {
  const WIN_MESSAGE = `You win! ${playerSelection} beats ${computerSelection}`;
  const LOSE_MESSAGE = `You lose! ${computerSelection} beats ${playerSelection}`;
  const DRAW_MESSAGE = 'This round was a draw. Try Again!';
  let playerWeakness = WEAPON_HIERARCHY.get(playerSelection);
  let roundLoss = playerWeakness === computerSelection;
  let roundDraw = playerSelection === computerSelection;

  if (roundDraw) {
    return [DRAW_MESSAGE, 0];
  } else {
    return roundLoss ? [LOSE_MESSAGE, 1] : [WIN_MESSAGE, 2];
  }
}

function game(iterations) {
  let gamesPlayed = 0;
  let gamesLost = 0;
  let gamesWon = 0;
  let gamesTied = 0;

  let scores;

  for (let i = 1; i <= iterations; i++) {
    gamesPlayed += 1;
    let result = playRound(playerPlay(), computerPlay());

    switch (result[1]) {
      case 0:
        gamesTied += 1;
        console.log(result[0]);
        break;
      case 1:
        gamesLost += 1;
        console.log(result[0]);
        break;
      case 2:
        gamesWon += 2;
        console.log(result[0]);
        break;
    }
  }
  // determine winner
  if (gamesWon > gamesTied) {
    console.log('you won!');
  } else if (gamesWon === gamesTied) {
    console.log("it's a draw");
  } else {
    console.log('you lose');
  }

  console.log(`${gamesPlayed} games played`);
  console.log(`${gamesWon} games won`);
  console.log(`${gamesLost} games lost`);
  console.log(`${gamesTied} games tied`);
}
// game(3);
