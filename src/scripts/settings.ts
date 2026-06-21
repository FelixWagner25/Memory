import * as main from "../main";
import { startSettings, gameState } from "./shared";

export let themeSelected: boolean = false;
export let playerSelected: boolean = false;
export let boardSelected: boolean = false;

export function setGameTheme(option: "Code-vibes" | "DA-projects"): void {
  startSettings.gameTheme = option;
  renderSetPanel(option);
  setThemePreview(option);
  themeSelected = true;
  if (allSettingsSelected()) enableStartBtn();
}

export function setStartPlayer(option: "Blue" | "Orange"): void {
  startSettings.startPlayer = option;
  gameState.currentPlayer = option;
  renderSetPanel(option);
  playerSelected = true;
  if (allSettingsSelected()) enableStartBtn();
}

export function setBoardSize(option: 16 | 24 | 36): void {
  startSettings.boardSize = option;
  renderSetPanel(option);
  boardSelected = true;
  if (allSettingsSelected()) enableStartBtn();
}

export function allSettingsSelected() {
  return themeSelected && playerSelected && boardSelected;
}

export function enableStartBtn(): void {
  document.getElementById("set-start-btn")?.classList.remove("disabled");
}

export function renderSetPanel(option: string | number): void {
  switch (option) {
    case "Code-vibes":
    case "DA-projects":
      main.setInnerText("game-theme-selected", option + " theme");
      break;
    case "Blue":
    case "Orange":
      main.setInnerText("player-selected", option + " player");
      break;
    case 16:
    case 24:
    case 36:
      main.setInnerText("board-size-selected", option + " cards");
      break;
  }
}

export function setThemePreview(option: "Code-vibes" | "DA-projects"): void {
  switch (option) {
    case "DA-projects":
      changeImageSrc(
        "theme-preview",
        "public/assets/img/preview_DA_projects.svg",
      );
      break;
    default:
      changeImageSrc(
        "theme-preview",
        "public/assets/img/preview_code_icons.svg",
      );
      break;
  }
}

export function changeImageSrc(htmlId: string, srcPath: string): void {
  const element = document.getElementById(htmlId);
  if (element && element instanceof HTMLImageElement) {
    element.src = srcPath;
  }
}

export function setListDecorators(element: HTMLElement): void {
  const partentElement = element.parentElement;
  if (partentElement) {
    partentElement.querySelectorAll(".set-point, .set-deco").forEach((el) => {
      el.classList.remove("set");
    });
  }
  element.querySelectorAll(".set-point, .set-deco").forEach((el) => {
    el.classList.add("set");
  });
}

export function getCardBgSrc() {
  let cardSrc: string;
  switch (startSettings.gameTheme) {
    case "Code-vibes":
      cardSrc = "public/assets/img/card--back_Code-vibes.svg";
      break;
    case "DA-projects":
      cardSrc = "public/assets/img/card--back_DA-projects.svg";
      break;
  }
  return cardSrc;
}
