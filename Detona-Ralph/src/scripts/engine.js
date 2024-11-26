const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector(".menu-lives h2"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    lives: 3,
  },
  actions: {
    timerId: null,
    countDownTimerId: null,
  },
};

function updateLives() {
  state.view.lives.textContent = `x${state.values.lives}`;
  if (state.values.lives <= 0) {
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);
    alert("Você perdeu todas as vidas! Game Over!");
  }
}

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Sucesso! O seu resultado foi: " + state.values.result);
  }
}

function playSound(audioName) {
  try {
    const audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.3;
    audio.play();
  } catch (err) {
    console.error("Erro ao reproduzir o áudio:", err);
  }
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  const randomNumber = Math.floor(Math.random() * state.view.squares.length);
  const randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      } else {
        state.values.lives--;
        playSound("miss");
        updateLives();
      }
    });
  });
}

function initialize() {
  state.view.timeLeft.textContent = state.values.currentTime;
  state.view.score.textContent = state.values.result; 
  updateLives(); 

  moveEnemy(); 
  addListenerHitBox();
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}

initialize();
