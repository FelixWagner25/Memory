import { gameState, gameCards, startSettings } from "./shared";
import { clearLastGame, switchScreens, closeScreen, showScreen } from "../main";

const confirmExitGameBtn = document.getElementById("confirm-exit-game-btn");

confirmExitGameBtn?.addEventListener("click", (event) => {
  switchScreens("game-screen", "settings-screen");
  moveExitOverlay("move-out", event);
  clearLastGame();
});

export function processTurn(cardHTMLid: number) {
  if (gameState.firstTurnId == null) {
    gameState.firstTurnId = cardHTMLid;
    return;
  } else {
    gameState.secondTurnId = cardHTMLid;
    if (turnedCardsMatch()) {
      processMatchingTurn();
    } else {
      processNonMatchingTurn();
    }
    resetTurnIds();
  }
}

function processMatchingTurn() {
  addScorePoint(gameState.currentPlayer);
  updateGameBoardScore();
  excludeMatchedCards();
  gameState.flippedCards += 2;
  checkGameFinished();
}

function processNonMatchingTurn() {
  changePlayer();
  updateGameBoard();
  turnBackFlippedCards();
}

function turnBackFlippedCards() {
  if (gameState.firstTurnId == null || gameState.secondTurnId == null) return;
  let firstCardRef = document.getElementById(String(gameState.firstTurnId));
  let secondCardRef = document.getElementById(String(gameState.secondTurnId));
  let gameCoreRef = document.getElementById("game-core");
  if (!gameCoreRef) return;
  gameCoreRef.style.pointerEvents = "none";
  setTimeout(() => {
    firstCardRef?.classList.toggle("is-flipped");
    secondCardRef?.classList.toggle("is-flipped");
    gameCoreRef.style.pointerEvents = "auto";
  }, 2000);
}

function gameIsFinished() {
  return gameState.flippedCards >= startSettings.boardSize;
}

function checkGameFinished() {
  if (gameIsFinished()) {
    determineResult();
    setTimeout(() => {
      closeScreen("game-screen");
      showScreen("game-over-screen");
      renderFinalScore();
    }, 1000);
    setTimeout(() => {
      closeScreen("game-over-screen");
      showResultScreen();
    }, 3000);
  }
}

function renderFinalScore() {
  let finalScoreBlueRef = document.getElementById("final-score-blue");
  let finalScoreOrangeRef = document.getElementById("final-score-orange");
  if (!finalScoreBlueRef || !finalScoreOrangeRef) return;
  finalScoreBlueRef.innerText = String(gameState.scoreBlue);
  finalScoreOrangeRef.innerText = String(gameState.scoreOrange);
}

function showResultScreen() {
  let winnerBlueRef = document.getElementById("winner-blue");
  let winnerOrangeRef = document.getElementById("winner-orange");
  let drawRef = document.getElementById("draw");
  if (!winnerBlueRef || !winnerOrangeRef || !drawRef) return;
  switch (gameState.gameResult) {
    case "Winner-Blue":
      showScreen("winner-blue");
      break;
    case "Winner-Orange":
      showScreen("winner-orange");
      break;
    case "Draw":
      showScreen("draw");
      break;
  }
}

function determineResult() {
  let scoreDifference = gameState.scoreBlue - gameState.scoreOrange;
  if (scoreDifference > 0) {
    gameState.gameResult = "Winner-Blue";
  } else if (scoreDifference < 0) {
    gameState.gameResult = "Winner-Orange";
  } else if (scoreDifference == 0) {
    gameState.gameResult = "Draw";
  }
}

function excludeMatchedCards() {
  if (gameState.firstTurnId == null || gameState.secondTurnId == null) return;
  let firstCardRef = document.getElementById(String(gameState.firstTurnId));
  let secondCardRef = document.getElementById(String(gameState.secondTurnId));
  if (!firstCardRef || !secondCardRef) return;
  firstCardRef.style.pointerEvents = "none";
  secondCardRef.style.pointerEvents = "none";
}

function turnedCardsMatch() {
  if (gameState.firstTurnId == null || gameState.secondTurnId == null) return;
  return (
    gameCards[gameState.firstTurnId].partnerId ==
    gameCards[gameState.secondTurnId].id
  );
}

function changePlayer(): void {
  switch (gameState.currentPlayer) {
    case "Blue":
      gameState.currentPlayer = "Orange";
      break;
    case "Orange":
      gameState.currentPlayer = "Blue";
      break;
  }
}

function addScorePoint(player: "Blue" | "Orange"): void {
  switch (player) {
    case "Blue":
      gameState.scoreBlue += 1;
      break;
    case "Orange":
      gameState.scoreOrange += 1;
      break;
  }
}

function resetTurnIds(): void {
  gameState.firstTurnId = null;
  gameState.secondTurnId = null;
}

export function updateGameBoard() {
  updateGameBoardScore();
  const iconRef = document.getElementById("current-player-icon");
  if (!iconRef) return;
  setTimeout(() => {
    iconRef.classList.toggle("player-icon--blue");
    iconRef.classList.toggle("player-icon--orange");
  }, 2500);
}

function updateGameBoardScore() {
  const scoreBlueRef = document.getElementById("score-blue");
  const scoreOrangeRef = document.getElementById("score-orange");
  if (!scoreBlueRef || !scoreOrangeRef) return;
  scoreBlueRef.innerText = String(gameState.scoreBlue);
  scoreOrangeRef.innerHTML = String(gameState.scoreOrange);
}

const exitBtnRef = document.getElementById("exit-btn");
const exitOverlayBgBlurRef = document.getElementById("exit-overlay-bg-blur");
const backToGameBtnRef = document.getElementById("back-to-game-btn");

exitBtnRef?.addEventListener("click", (event) => {
  moveExitOverlay("move-in", event);
});

exitOverlayBgBlurRef?.addEventListener("click", (event) => {
  moveExitOverlay("move-out", event);
});

backToGameBtnRef?.addEventListener("click", (event) => {
  moveExitOverlay("move-out", event);
});

export function moveExitOverlay(moveType: string, event: Event): void {
  event.stopPropagation();
  const overlayElement = document.getElementById("exit-overlay");
  const bgOverlayElement = document.getElementById("exit-overlay-bg-blur");
  if (!overlayElement || !bgOverlayElement) return;

  if (moveType == "move-in") {
    overlayElement.classList.add("exit-overlay-in");
    bgOverlayElement.classList.add("blur-on");
  } else if (moveType == "move-out") {
    overlayElement.classList.remove("exit-overlay-in");
    bgOverlayElement.classList.remove("blur-on");
  }
}
