let gameOver = false;
let roundCounter = 0;

const WEAPON_OPTIONS = new Map([
  [0, 'rock'],
  [1, 'paper'],
  [2, 'scissors'],
]);

const FIGHT_OPTIONS = new Map([
  [0, 'punch'],
  [1, 'kick'],
  [2, 'sweep'],
]);

const WEAPON_HIERARCHY = new Map([
  ['rock', 'scissors'],
  ['scissors', 'paper'],
  ['paper', 'rock'],
]);

const FIGHT_HIERARCHY = new Map([
  ['punch', 'sweep'],
  ['kick', 'punch'],
  ['sweep', 'kick'],
]);

let playerStrike = null;
/*
0: punch
1: kick
2: sweep
*/

// listeners
let punchKey = document.getElementById('rock');
let kickKey = document.getElementById('paper');
let sweepKey = document.getElementById('scissors');
let keys = document.querySelectorAll('.key');

// characters
let playerOne = document.querySelectorAll('.player-1')[0].firstElementChild;
let playerTwo = document.querySelectorAll('.player-2')[0].firstElementChild;

function firePunch() {
  playerStrike = 0;
  punchKey.classList.add('firing');

  playerOne.setAttribute('src', './images/p1-punching.gif');
  playerTwo.setAttribute('src', './images/p2-hit.gif');
  setTimeout(() => {
    playerOne.setAttribute('src', './images/p1-ready.gif');
    playerTwo.setAttribute('src', './images/p2-ready.gif');
  }, 400);
}

function fireKick() {
  playerStrike = 1;
  kickKey.classList.add('firing');
  playerOne.setAttribute('src', './images/p1-kicking.gif');
  playerTwo.setAttribute('src', './images/p2-hit.gif');
  setTimeout(() => {
    playerOne.setAttribute('src', './images/p1-ready.gif');
    playerTwo.setAttribute('src', './images/p2-ready.gif');
  }, 800);
}

function fireSweep() {
  playerStrike = 2;
  sweepKey.classList.add('firing');
  playerOne.setAttribute('src', './images/p1-sweeping.gif');
  playerTwo.setAttribute('src', './images/p2-hit.gif');
  setTimeout(() => {
    playerOne.setAttribute('src', './images/p1-ready.gif');
    playerTwo.setAttribute('src', './images/p2-ready.gif');
  }, 600);
}

function removeEffect(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('firing');
}

document.addEventListener('keydown', function (e) {
  if (!gameOver && roundCounter <= 5) {
    switch (e.code) {
      case 'KeyA':
        firePunch();
        // playerFight();
        playGame();
        roundCounter++;
        break;
      case 'KeyS':
        fireKick();
        // playerFight();
        playGame();
        roundCounter++;
        break;
      case 'KeyD':
        fireSweep();
        // playerFight();
        playGame();
        roundCounter++;
        break;
    }
  } else {
    console.log('game is over!!');
  }
});

keys.forEach((key) => key.addEventListener('transitionend', removeEffect));

// this function returns either rock, paper, or scissors
function computerPlay() {
  let computerResult = Math.floor(Math.random() * 3);

  return WEAPON_OPTIONS.get(computerResult);
}

function computerFight() {
  let computerResult = Math.floor(Math.random() * 3);
  return FIGHT_OPTIONS.get(computerResult);
}

function playerPlay() {
  const MESSAGE = 'Choose your weapon';
  let playerSelection = window.prompt(MESSAGE).toLowerCase();
  return playerSelection;
}

function playerFight() {
  if (playerStrike !== null) {
    return FIGHT_OPTIONS.get(playerStrike);
  }
}

// compare player vs computer to determine who wins strike
function fightRound(playerSelection, computerSelection) {
  // animations for player 1
  if (playerSelection === 'punch') {
    firePunch();
  } else if (playerSelection === 'kick') {
    fireKick();
  } else {
    fireSweep();
  }

  let conclusion;
  let playerWeakness = FIGHT_HIERARCHY.get(playerSelection);
  let roundLoss = playerWeakness === computerSelection;
  let roundDraw = playerSelection === computerSelection;

  if (roundDraw) {
    conclusion = 0;
  } else if (roundLoss) {
    conclusion = 1;
  } else {
    conclusion = 2;
  }
  return conclusion;
} // end fightRound

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

function playGame() {
  let playerOneHealth = document
    .querySelectorAll('.header-left-lower')[0]
    .getAttribute('value');

  let playerTwoHealth = document
    .querySelectorAll('.header-right-lower')[0]
    .getAttribute('value');

  let result = fightRound(playerFight(), computerFight());

  switch (result) {
    case 0:
      // gamesTied += 1;
      console.log('toasty!');
      let toasty = document.createElement('img');
      toasty.classList.add('toasty');
      toasty.setAttribute('src', './images/toasty.png');

      let playerArea = document.querySelector('.player-row');
      console.log(playerArea);
      playerArea.appendChild(toasty);

      setTimeout(() => {
        playerArea.removeChild(playerArea.lastChild);
      }, 500);

      break;
    case 1:
      // gamesLost += 1;

      playerOneHealth -= 33;
      document
        .querySelectorAll('.header-left-lower')[0]
        .setAttribute('value', playerOneHealth);
      break;
    case 2:
      playerTwoHealth -= 33;
      document
        .querySelectorAll('.header-right-lower')[0]
        .setAttribute('value', playerTwoHealth);

      break;
  }
} // end playGame
