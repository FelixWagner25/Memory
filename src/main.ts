import "./styles/main.scss";

import * as constants from "./scripts/constants";
import {
  startSettings,
  gameState,
  gameCards,
  GameCard,
  clearGameCardsArray,
} from "./scripts/shared";
import { allSettingsSelected } from "./scripts/settings";
import { getCardTemplate } from "./templates/card-templates";
import { getGameHeaderTemplate } from "./templates/game-header-templates";
import { processTurn, updateGameBoard } from "./scripts/game";
import { getGameOverTemplate } from "./templates/game-over-templates";
import {
  getWinnerBlueTemplate,
  getWinnerOrangeTemplate,
} from "./templates/winner-templates";
import { getDrawTemplate } from "./templates/draw-templates";
import { setBtnEventListeners } from "./scripts/listeners";

/**
 * Closes one screen and opens another.
 *
 * @param closeHTMLId - Id of screen to close
 * @param openHTMLId - Id of screen to open
 */
export function switchScreens(closeHTMLId: string, openHTMLId: string): void {
  closeScreen(closeHTMLId);
  showScreen(openHTMLId);
}

/**
 * Closes one screen.
 *
 * @param elementId - Id of screen to close
 */
export function closeScreen(elementId: string): void {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.classList.remove("show-screen");
}

/**
 * Opens one screen.
 *
 * @param elementId - Id of screen to open
 */
export function showScreen(elementId: string): void {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.classList.add("show-screen");
}

/**
 * Sets text to innerText of element.
 *
 * @param htmlId - Id of element
 * @param text - Text to be put into element
 */
export function setInnerText(htmlId: string, text: string): void {
  const element = document.getElementById(htmlId);
  if (element) {
    element.innerText = text;
  }
}

/**
 * Clears content of current game.
 *
 */
export function clearCurrentGame(): void {
  resetGameState();
  clearGameComponent();
  clearGameCardsArray();
}

/**
 * Clears content of current game component.
 *
 */
function clearGameComponent(): void {
  updateGameBoard();
  clearGameCore();
}

/**
 * Clears content of current game core.
 *
 */
function clearGameCore(): void {
  let gameCoreRef = document.getElementById("game-core");
  if (!gameCoreRef) return;
  gameCoreRef.innerHTML = "";
  gameCoreRef.style.removeProperty("pointer-events");
}

/**
 * Resets current game state.
 *
 */
function resetGameState(): void {
  gameState.scoreBlue = 0;
  gameState.scoreOrange = 0;
  gameState.currentPlayer = startSettings.startPlayer;
  gameState.flippedCards = 0;
  gameState.firstTurnId = null;
  gameState.secondTurnId = null;
}

/**
 * Initializes new menory game.
 *
 */
export function initGame(): void {
  if (!allSettingsSelected()) return;
  switchScreens("settings-screen", "game-screen");
  initGameCards();
  renderGameHeader(startSettings.gameTheme);
  initGameHeaderDecorators(gameState.currentPlayer);
  renderCards();
  initGameOverScreen(startSettings.gameTheme);
  initEndScreens(startSettings.gameTheme);
  setTimeout(() => {
    if (!startSettings.initCardListeners) setCardEventListener();
    setBtnEventListeners();
  }, 100);
}

/**
 * Initializes endscreens.
 *
 * @param gameTheme - Game theme
 */
function initEndScreens(gameTheme: "Code-vibes" | "DA-projects"): void {
  initWinnerOrangeScreen(gameTheme);
  initWinnerBlueScreen(gameTheme);
  initDrawScreen(gameTheme);
}

/**
 * Initializes winner orange screen.
 *
 * @param gameTheme - Game theme
 */
function initWinnerOrangeScreen(gameTheme: "Code-vibes" | "DA-projects"): void {
  const winnerOrangeRef = document.getElementById("winner-orange");
  if (!winnerOrangeRef) return;
  winnerOrangeRef.innerHTML = getWinnerOrangeTemplate(gameTheme);
}

/**
 * Initializes winner blue screen.
 *
 * @param gameTheme - Game theme
 */
function initWinnerBlueScreen(gameTheme: "Code-vibes" | "DA-projects"): void {
  const winnerBlueRef = document.getElementById("winner-blue");
  if (!winnerBlueRef) return;
  winnerBlueRef.innerHTML = getWinnerBlueTemplate(gameTheme);
}

/**
 * Initializes draw screen.
 *
 * @param gameTheme - Game theme
 */
function initDrawScreen(gameTheme: "Code-vibes" | "DA-projects"): void {
  const drawRef = document.getElementById("draw");
  if (!drawRef) return;
  drawRef.innerHTML = getDrawTemplate(gameTheme);
}

/**
 * Initializes game over screen
 *
 * @param gameTheme - Game theme
 */
function initGameOverScreen(gameTheme: "Code-vibes" | "DA-projects"): void {
  const gameOverRef = document.getElementById("game-over-screen");
  if (!gameOverRef) return;
  gameOverRef.innerHTML = getGameOverTemplate(gameTheme);
}

/**
 * Renders game header.
 *
 * @param gameTheme - Game theme
 */
function renderGameHeader(gameTheme: "Code-vibes" | "DA-projects"): void {
  const gameHeaderRef = document.getElementById("game-header");
  if (!gameHeaderRef) return;
  gameHeaderRef.innerHTML = getGameHeaderTemplate(gameTheme);
}

/**
 * Initializes game cards.
 */
export function initGameCards(): void {
  let randomIndex: number;
  let cardSrc: string;
  let srcPaths = getCardSrcsPathSet();

  for (let i = 0; i < startSettings.boardSize / 2; i++) {
    randomIndex = Math.round(
      (startSettings.boardSize / 2 - i - 1) * Math.random(),
    );
    cardSrc = srcPaths.splice(randomIndex, 1)[0];
    let card = createNewCard(i, cardSrc, i + startSettings.boardSize / 2);
    let partnerCard = createNewCard(
      i + startSettings.boardSize / 2,
      cardSrc,
      i,
    );
    gameCards.push(card, partnerCard);
  }
  shuffleArray(gameCards);
}

/**
 * Initializes game header decorators.
 *
 * @param currentPlayer - Current player
 */
function initGameHeaderDecorators(currentPlayer: "Blue" | "Orange"): void {
  const iconRef = document.getElementById("current-player-icon");
  if (!iconRef) return;
  iconRef.classList.remove("bg-blue");
  iconRef.classList.remove("bg-orange");
  switch (currentPlayer) {
    case "Blue":
      iconRef.classList.add("bg-blue");
      break;
    case "Orange":
      iconRef.classList.add("bg-orange");
      break;
  }
}

/**
 * Creates new Card.
 *
 * @param id - Card id
 * @param src - Card source path
 * @param partnerId - Id of partner card
 */
function createNewCard(id: number, src: string, partnerId: number) {
  let card: GameCard = {
    id: id,
    src: src,
    partnerId: partnerId,
  };
  return card;
}

/**
 * Returns cars source path set.
 *
 * @returns - Card source path set
 */
function getCardSrcsPathSet() {
  let srcPaths: string[];
  switch (startSettings.gameTheme) {
    case "Code-vibes":
      srcPaths = constants.codeVibesSrc;
      break;
    case "DA-projects":
      srcPaths = constants.DAProjectsSrc;
      break;
  }
  return srcPaths;
}

/**
 * Shuffles elements of array.
 *
 * @param array - Array to shuffle
 * @returns - Suffled array.
 */
function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

/**
 * Renders cards.
 */
export function renderCards(): void {
  const gameCoreRef = document.getElementById("game-core");
  if (!gameCoreRef) return;
  renderCardGrid(startSettings.boardSize);
  for (let i = 0; i < startSettings.boardSize; i++) {
    gameCoreRef.innerHTML += getCardTemplate(i);
  }
}

/**
 * Sets card event listeners.
 */
export function setCardEventListener(): void {
  const gameCoreRef = document.getElementById("game-core");
  if (!gameCoreRef) return;
  gameCoreRef.addEventListener("click", (e) => {
    userClicksCard(e);
  });
  startSettings.initCardListeners = true;
}

/**
 * Performs actions of user clicks card.
 * @param event - Browser event
 */
export function userClicksCard(event: Event) {
  const card = (event.target as HTMLElement).closest(
    ".card",
  ) as HTMLButtonElement;
  if (!card) return;
  card.classList.toggle("is-flipped");
  processTurn(Number(card.id));
}

/**
 * Renders card grid.
 *
 * @param boardSize - Board size
 */
export function renderCardGrid(boardSize: number): void {
  const gameCoreRef = document.getElementById("game-core");
  removeAnyGridSetting();
  switch (boardSize) {
    case 16:
      gameCoreRef?.classList.add("grid-4x4");
      break;
    case 24:
      gameCoreRef?.classList.add("grid-6x4");
    case 36:
      gameCoreRef?.classList.add("grid-6x6");
  }
}

/**
 * Removes previous grid settings.
 */
export function removeAnyGridSetting(): void {
  const gameCoreRef = document.getElementById("game-core");
  gameCoreRef?.classList.remove("grid-4x4");
  gameCoreRef?.classList.remove("grid-6x4");
  gameCoreRef?.classList.remove("grid-6x6");
}
