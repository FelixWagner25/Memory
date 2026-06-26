import { gameState, gameCards, startSettings } from "./shared";
import { closeScreen, showScreen } from "../main";

/**
 * Processes a card turn
 *
 * @param cardHTMLid - Id of card element
 */
export function processTurn(cardHTMLid: number): void {
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

/**
 * Processes turn if pulled cards are matching.
 */
function processMatchingTurn(): void {
  addScorePoint(gameState.currentPlayer);
  updateGameBoardScore();
  excludeMatchedCards();
  gameState.flippedCards += 2;
  checkGameFinished();
}

/**
 * Processes turn if pulled cards are not matching.
 */
function processNonMatchingTurn(): void {
  changePlayer();
  updateGameBoard();
  turnBackFlippedCards();
}

/**
 * Turns back cards after flipping in a turn.
 *
 */
function turnBackFlippedCards(): void {
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
  }, 1000);
}

/**
 * Checks whether all cards have been matched and flipped.
 *
 * @returns - True if all cards have been flipped; otherwise, false.
 */
function gameIsFinished() {
  return gameState.flippedCards >= startSettings.boardSize;
}

/**
 * Checks if game is finished.
 */
function checkGameFinished(): void {
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

/**
 * Renders final score to game over screen.
 */
function renderFinalScore(): void {
  let finalScoreBlueRef = document.getElementById("final-score-blue");
  let finalScoreOrangeRef = document.getElementById("final-score-orange");
  if (!finalScoreBlueRef || !finalScoreOrangeRef) return;
  finalScoreBlueRef.innerText = String(gameState.scoreBlue);
  finalScoreOrangeRef.innerText = String(gameState.scoreOrange);
}

/**
 * Selects and shows result screen.
 */
function showResultScreen(): void {
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

/**
 * Determines the game result.
 */
function determineResult(): void {
  let scoreDifference = gameState.scoreBlue - gameState.scoreOrange;
  if (scoreDifference > 0) {
    gameState.gameResult = "Winner-Blue";
  } else if (scoreDifference < 0) {
    gameState.gameResult = "Winner-Orange";
  } else if (scoreDifference == 0) {
    gameState.gameResult = "Draw";
  }
}

/**
 * Exclude matched cards from game. No flipping and points for these any more.
 */
function excludeMatchedCards(): void {
  if (gameState.firstTurnId == null || gameState.secondTurnId == null) return;
  let firstCardRef = document.getElementById(String(gameState.firstTurnId));
  let secondCardRef = document.getElementById(String(gameState.secondTurnId));
  if (!firstCardRef || !secondCardRef) return;
  firstCardRef.style.pointerEvents = "none";
  secondCardRef.style.pointerEvents = "none";
}

/**
 * Checks whether turned card faces are matching.
 *
 * @returns True if card faces are matching: otherwise false.
 */
function turnedCardsMatch() {
  if (gameState.firstTurnId == null || gameState.secondTurnId == null) return;
  return (
    gameCards[gameState.firstTurnId].partnerId ==
    gameCards[gameState.secondTurnId].id
  );
}

/**
 * Changes player whose turn it is to pull cards.
 */
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

/**
 * Adds point to player's score.
 *
 * @param player - Color of player
 */
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

/**
 * Resets ids of pulled cards of a turn.
 */
function resetTurnIds(): void {
  gameState.firstTurnId = null;
  gameState.secondTurnId = null;
}

/**
 * Updates score and displayed current player marker on game header.
 */
export function updateGameBoard(): void {
  updateGameBoardScore();
  const iconRef = document.getElementById("current-player-icon");
  if (!iconRef) return;
  setTimeout(() => {
    iconRef.classList.toggle("bg-blue");
    iconRef.classList.toggle("bg-orange");
  }, 1500);
}

/**
 * Updates score displayed in game header.
 */
function updateGameBoardScore(): void {
  const scoreBlueRef = document.getElementById("score-blue");
  const scoreOrangeRef = document.getElementById("score-orange");
  if (!scoreBlueRef || !scoreOrangeRef) return;
  scoreBlueRef.innerText = String(gameState.scoreBlue);
  scoreOrangeRef.innerHTML = String(gameState.scoreOrange);
}

/**
 * Moves exit overlay in or outside the display.
 *
 * @param moveType - Move-in or Move-out operation
 * @param event - Browser event
 */
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
