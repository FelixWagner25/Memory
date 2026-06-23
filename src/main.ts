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

export function switchScreens(closeHTMLId: string, openHTMLId: string) {
  closeScreen(closeHTMLId);
  showScreen(openHTMLId);
}

export function closeScreen(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.classList.remove("show-screen");
}

export function showScreen(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.classList.add("show-screen");
}

export function setInnerText(htmlId: string, text: string): void {
  const element = document.getElementById(htmlId);
  if (element) {
    element.innerText = text;
  }
}

export function clearLastGame() {
  resetGameState();
  clearGameComponent();
  clearGameCardsArray();
}

function clearGameComponent() {
  updateGameBoard();
  clearGameCore();
}

function clearGameCore() {
  let gameCoreRef = document.getElementById("game-core");
  if (!gameCoreRef) return;
  gameCoreRef.innerHTML = "";
  gameCoreRef.style.removeProperty("pointer-events");
}

function resetGameState(): void {
  gameState.scoreBlue = 0;
  gameState.scoreOrange = 0;
  gameState.currentPlayer = startSettings.startPlayer;
  gameState.flippedCards = 12;
  gameState.firstTurnId = null;
  gameState.secondTurnId = null;
}

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

function initEndScreens(gameTheme: "Code-vibes" | "DA-projects") {
  initWinnerOrangeScreen(gameTheme);
  initWinnerBlueScreen(gameTheme);
  initDrawScreen(gameTheme);
}

function initWinnerOrangeScreen(gameTheme: "Code-vibes" | "DA-projects") {
  const winnerOrangeRef = document.getElementById("winner-orange");
  if (!winnerOrangeRef) return;
  winnerOrangeRef.innerHTML = getWinnerOrangeTemplate(gameTheme);
}

function initWinnerBlueScreen(gameTheme: "Code-vibes" | "DA-projects") {
  const winnerBlueRef = document.getElementById("winner-blue");
  if (!winnerBlueRef) return;
  winnerBlueRef.innerHTML = getWinnerBlueTemplate(gameTheme);
}

function initDrawScreen(gameTheme: "Code-vibes" | "DA-projects") {
  const drawRef = document.getElementById("draw");
  if (!drawRef) return;
  drawRef.innerHTML = getDrawTemplate(gameTheme);
}

function initGameOverScreen(gameTheme: "Code-vibes" | "DA-projects") {
  const gameOverRef = document.getElementById("game-over-screen");
  if (!gameOverRef) return;
  gameOverRef.innerHTML = getGameOverTemplate(gameTheme);
}

function renderGameHeader(gameTheme: "Code-vibes" | "DA-projects") {
  const gameHeaderRef = document.getElementById("game-header");
  if (!gameHeaderRef) return;
  gameHeaderRef.innerHTML = getGameHeaderTemplate(gameTheme);
}

export function initGameCards() {
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
  console.log(gameCards);
}

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

function createNewCard(id: number, src: string, partnerId: number) {
  let card: GameCard = {
    id: id,
    src: src,
    partnerId: partnerId,
  };
  return card;
}

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

export function renderCards(): void {
  const gameCoreRef = document.getElementById("game-core");
  if (!gameCoreRef) return;
  renderCardGrid(startSettings.boardSize);
  for (let i = 0; i < startSettings.boardSize; i++) {
    gameCoreRef.innerHTML += getCardTemplate(i);
  }
}

export function setCardEventListener() {
  const gameCoreRef = document.getElementById("game-core");
  if (!gameCoreRef) return;
  gameCoreRef.addEventListener("click", (e) => {
    userClicksCard(e);
  });
  startSettings.initCardListeners = true;
}

export function userClicksCard(event: Event) {
  const card = (event.target as HTMLElement).closest(
    ".card",
  ) as HTMLButtonElement;
  if (!card) return;
  card.classList.toggle("is-flipped");
  processTurn(Number(card.id));
}

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

export function removeAnyGridSetting(): void {
  const gameCoreRef = document.getElementById("game-core");
  gameCoreRef?.classList.remove("grid-4x4");
  gameCoreRef?.classList.remove("grid-6x4");
  gameCoreRef?.classList.remove("grid-6x6");
}
