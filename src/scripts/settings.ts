import * as main from "../main";
import { startSettings, gameState } from "./shared";

export let themeSelected: boolean = false;
export let playerSelected: boolean = false;
export let boardSelected: boolean = false;

/**
 * Sets game theme.
 *
 * @param option - Game theme
 */
export function setGameTheme(option: "Code-vibes" | "DA-projects"): void {
  startSettings.gameTheme = option;
  renderSetPanel(option);
  setThemePreview(option);
  themeSelected = true;
  if (allSettingsSelected()) enableStartBtn();
  setStyleDataTheme(option);
}

/**
 * Sets data theme for application of styling variables depending on game theme.
 *
 * @param option - Game theme
 */
function setStyleDataTheme(option: "Code-vibes" | "DA-projects"): void {
  document.documentElement.removeAttribute("data-theme");
  switch (option) {
    case "Code-vibes":
      // default
      break;
    case "DA-projects":
      document.documentElement.setAttribute("data-theme", option);
      break;
  }
}

/**
 * Sets playe who starts the game.
 *
 * @param option - Game theme
 */
export function setStartPlayer(option: "Blue" | "Orange"): void {
  startSettings.startPlayer = option;
  gameState.currentPlayer = option;
  renderSetPanel(option);
  playerSelected = true;
  if (allSettingsSelected()) enableStartBtn();
}

/**
 * Sets game board size.
 *
 * @param option - Game theme
 */
export function setBoardSize(option: 16 | 24 | 36): void {
  startSettings.boardSize = option;
  renderSetPanel(option);
  boardSelected = true;
  if (allSettingsSelected()) enableStartBtn();
}

/**
 * Checks whether all required settings are selected.
 *
 * @returns - True if all settings were selected; otherwise false.
 */
export function allSettingsSelected() {
  return themeSelected && playerSelected && boardSelected;
}

/**
 * Enables start button.
 */
export function enableStartBtn(): void {
  document.getElementById("set-start-btn")?.classList.remove("disabled");
}

/**
 * Renders start settings into settings panel.
 *
 * @param option - Game theme, starting player or board size
 */
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

/**
 * Sets theme preview picture in settings screen.
 *
 * @param option - Game theme
 */
export function setThemePreview(option: "Code-vibes" | "DA-projects"): void {
  switch (option) {
    case "DA-projects":
      changeImageSrc("theme-preview", "assets/img/preview_DA_projects.svg");
      break;
    default:
      changeImageSrc("theme-preview", "assets/img/preview_code_icons.svg");
      break;
  }
}

/**
 * Sets new image source path to image html element.
 *
 * @param htmlId - image element id
 * @param srcPath - image source path to be set
 */
export function changeImageSrc(htmlId: string, srcPath: string): void {
  const element = document.getElementById(htmlId);
  if (element && element instanceof HTMLImageElement) {
    element.src = srcPath;
  }
}

/**
 * Sets list decorators to HTML element.
 *
 * @param element - HTML element
 */
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

/**
 * Returns card background source path depending on game theme.
 *
 * @returns - source path of card
 */
export function getCardBgSrc() {
  let cardSrc: string;
  switch (startSettings.gameTheme) {
    case "Code-vibes":
      cardSrc = "assets/img/card--back_Code-vibes.svg";
      break;
    case "DA-projects":
      cardSrc = "assets/img/card--back_DA-projects.svg";
      break;
  }
  return cardSrc;
}
