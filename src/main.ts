import "./styles/main.scss";

import * as constants from "./scripts/constants";
import {
  startSettings,
  gameState,
  gameCards,
  GameCard,
} from "./scripts/shared";
import { allSettingsSelected, setBoardSize } from "./scripts/settings";
import { getCardTemplate } from "./templates/card-templates";
import { processTurn, updateGameBoard } from "./scripts/game";

let listenerInitialized: boolean = false;

const homeStartBtn = document.getElementById("home-start-btn");
const backToStartBtnDraw = document.getElementById("back-to-start-btn-draw");
const backToStartBtnOrange = document.getElementById(
  "back-to-start-btn-orange",
);
const backToStartBtnBlue = document.getElementById("back-to-start-btn-blue");

homeStartBtn?.addEventListener("click", () => {
  showSettingsScreen();
});

backToStartBtnDraw?.addEventListener("click", () => {
  let drawScreenRef = document.getElementById("draw");
  let settingsScreenRef = document.getElementById("settings-screen");
  if (!drawScreenRef || !settingsScreenRef) return;
  drawScreenRef.classList.add("d-none");
  settingsScreenRef.classList.remove("d-none");
  clearLastGame();
});

backToStartBtnOrange?.addEventListener("click", () => {
  let winnerOrangeRef = document.getElementById("winner-orange");
  let settingsScreenRef = document.getElementById("settings-screen");
  if (!winnerOrangeRef || !settingsScreenRef) return;
  winnerOrangeRef.classList.add("d-none");
  settingsScreenRef.classList.remove("d-none");
  clearLastGame();
});

backToStartBtnBlue?.addEventListener("click", () => {
  let winnerBlueRef = document.getElementById("winner-blue");
  let settingsScreenRef = document.getElementById("settings-screen");
  if (!winnerBlueRef || !settingsScreenRef) return;
  winnerBlueRef.classList.add("d-none");
  settingsScreenRef.classList.remove("d-none");
  clearLastGame();
});

export function setInnerText(htmlId: string, text: string): void {
  const element = document.getElementById(htmlId);
  if (element) {
    element.innerText = text;
  }
}

export function clearLastGame() {
  resetGameState();
  clearGameComponent();
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
  gameState.flippedCards = 0;
  gameState.firstTurnId = null;
  gameState.secondTurnId = null;
}

export function initGame(): void {
  if (!allSettingsSelected()) return;
  closeSettingsScreen();
  showGameScreen();
  initGameCards();
  initGameBoard();
  renderCards();
  if (!listenerInitialized) setCardEventListener();
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

function initGameBoard() {
  const iconRef = document.getElementById("current-player-icon");
  if (!iconRef) return;
  iconRef.classList.remove("player-icon--blue");
  iconRef.classList.remove("player-icon--orange");
  switch (gameState.currentPlayer) {
    case "Blue":
      iconRef.classList.add("player-icon--blue");
      break;
    case "Orange":
      iconRef.classList.add("player-icon--orange");
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

function showGameScreen() {
  let gameScreenRef = document.getElementById("game-screen");
  if (!gameScreenRef) return;
  gameScreenRef.classList.remove("d-none");
}

function closeSettingsScreen() {
  let settingsScreenRef = document.getElementById("settings-screen");
  if (!settingsScreenRef) return;
  settingsScreenRef.classList.add("d-none");
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
  gameCoreRef.addEventListener("click", () => console.log("CLICK"));
  gameCoreRef.addEventListener("click", (e) => {
    userClicksCard(e);
  });
  listenerInitialized = true;
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

function showSettingsScreen() {
  let homeScreenRef = document.getElementById("home-screen");
  let settingsScreenRef = document.getElementById("settings-screen");
  if (!homeScreenRef || !settingsScreenRef) return;
  homeScreenRef.classList.add("d-none");
  settingsScreenRef.classList.remove("d-none");
}
