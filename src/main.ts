import "./styles/main.scss";
import * as set from "./scripts/settings";
import * as constants from "./scripts/constants";

import { getCardTemplate } from "./templates/card-templates";

export let gameCardsSrcs: string[] = [];

export function setInnerText(htmlId: string, text: string): void {
  const element = document.getElementById(htmlId);
  if (element) {
    element.innerText = text;
  }
}

export function initGame(): void {
  if (!set.allSettingsSelected()) return;
  initGameCards();
  renderCards();
}

export function initGameCards() {
  let srcPaths: string[];
  let randomIndex: number;
  let cardSrc: string;

  switch (set.gameTheme) {
    case "Code-vibes":
      srcPaths = constants.codeVibesSrc;
      break;
    case "DA-projects":
      srcPaths = constants.DAProjectsSrc;
      break;
  }

  for (let i = 0; i < set.boardSize / 2; i++) {
    randomIndex = Math.round((set.boardSize / 2 - i - 1) * Math.random());
    cardSrc = srcPaths.splice(randomIndex, 1)[0];
    gameCardsSrcs.push(cardSrc);
    gameCardsSrcs.push(cardSrc);
  }
  gameCardsSrcs = shuffleArray(gameCardsSrcs);
  console.log(gameCardsSrcs);
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
  renderCardGrid(set.boardSize);
  for (let i = 0; i < set.boardSize; i++) {
    gameCoreRef.innerHTML += getCardTemplate(i);
  }
  gameCoreRef.addEventListener("click", (e) => {
    const card = (e.target as HTMLElement).closest(
      ".card",
    ) as HTMLButtonElement;
    if (!card) return;
    card.classList.toggle("is-flipped");
  });
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
