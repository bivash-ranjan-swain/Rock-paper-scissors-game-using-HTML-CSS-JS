let userScore = 0;
let compScore = 0;
let gameActive = true;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const muteButton = document.getElementById('mute-button');
const resetButton = document.getElementById('reset-button');


const backgroundMusic = new Audio("background-music.mp3");
backgroundMusic.loop = true;

// Start playing music when the page loads
window.addEventListener('load', () => {
  backgroundMusic.play().catch(error => {
    console.log("Audio play failed:", error);
  });
});

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play().catch(error => {
        console.log("Audio play failed:", error);
      });
    }
  });
});




muteButton.addEventListener("click", () => {
  if (backgroundMusic.muted) {
    backgroundMusic.muted = false;
    muteButton.innerText = "Mute Music";
  } else {
    backgroundMusic.muted = true;
    muteButton.innerText = "Unmute Music";
  }
});

document.body.appendChild(muteButton);

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }

  if (userScore === 5 || compScore === 5) {
    endGame(userScore > compScore);
  }
};

const endGame = (userWins) => {
  gameActive = false;

  choices.forEach(choice => {
    choice.disabled = true;
  });

  msg.innerText = userWins ? "Congratulations! You won the game!" : "Game over. You lost the game.";
  msg.style.backgroundColor = userWins ? "green" : "red";
};

const playGame = (userChoice) => {
  if (!gameActive) return;

  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Add a reset game function
const resetGame = () => {
  userScore = 0;
  compScore = 0;
  gameActive = true;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Choose your move!";
  msg.style.backgroundColor = "#081b31";
  choices.forEach(choice => {
    choice.disabled = false;
  });
};

// Add a reset button
resetButton.innerText = "Reset Game";
resetButton.addEventListener("click", resetGame);
document.body.appendChild(resetButton);

// Ensure music continues playing when user switches tabs
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    backgroundMusic.pause();
  } else {
    backgroundMusic.play().catch(error => {
      console.log("Audio play failed:", error);
    });
  }
});

