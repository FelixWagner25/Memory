import * as main from "../main";
import * as set from "../scripts/settings";

export let currentPlayer: "Blue" | "Orange" = set.startPlayer;

let firstTurnId: number | null = null;
let secondTurnId: number | null = null;

let scoreBlue: number = 0;
let scoreOrange: number = 0;

export function processTurn(cardId: number) {
  if (firstTurnId == null) {
    firstTurnId = cardId;
    return;
  } else {
    secondTurnId = cardId;
    if (turnedCardsMatch()) {
      addScorePoint(currentPlayer);
    } else {
      changePlayer();
    }
    resetTurnIds();
  }
}

function turnedCardsMatch() {
  if (firstTurnId == null || secondTurnId == null) return;
  return (
    main.gameCards[firstTurnId].partnerId == main.gameCards[secondTurnId].id
  );
}

function changePlayer(): void {
  switch (currentPlayer) {
    case "Blue":
      currentPlayer = "Orange";
      break;
    case "Orange":
      currentPlayer = "Blue";
      break;
  }
}

function addScorePoint(player: "Blue" | "Orange"): void {
  switch (player) {
    case "Blue":
      scoreBlue += 1;
      break;
    case "Orange":
      scoreOrange += 1;
      break;
  }
}

function resetTurnIds(): void {
  firstTurnId = null;
  secondTurnId = null;
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
