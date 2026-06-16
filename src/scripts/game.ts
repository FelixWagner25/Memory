import * as main from "../main";
import { startSettings, gameState, gameCards } from "./shared";

let firstTurnId: number | null = null;
let secondTurnId: number | null = null;

export function processTurn(cardId: number) {
  if (firstTurnId == null) {
    firstTurnId = cardId;
    return;
  } else {
    secondTurnId = cardId;
    if (turnedCardsMatch()) {
      addScorePoint(gameState.currentPlayer);
      updateGameBoardScore();
    } else {
      changePlayer();
      updateGameBoard();
    }
    resetTurnIds();
  }
}

function turnedCardsMatch() {
  if (firstTurnId == null || secondTurnId == null) return;
  return gameCards[firstTurnId].partnerId == gameCards[secondTurnId].id;
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
  firstTurnId = null;
  secondTurnId = null;
}

function updateGameBoard() {
  updateGameBoardScore();
  const iconRef = document.getElementById("current-player-icon");
  if (!iconRef) return;
  iconRef.classList.toggle("player-icon--blue");
  iconRef.classList.toggle("player-icon--orange");
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
