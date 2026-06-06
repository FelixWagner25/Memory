let themeSelected: boolean = false;
let playerSelected: boolean = false;
let boardSelected: boolean = false;

let gameTheme: "Code-vibes" | "DA-projects";
let startPlayer: "Blue" | "Orange";
let boardSize: "16" | "24" | "36";

function setGameTheme(option: "Code-vibes" | "DA-projects"): void {
  gameTheme = option;
  renderSetPanel(option);
  setThemePreview(option);
  themeSelected = true;
  if (allSettingsSelected()) enableStartBtn();
}

function setStartPlayer(option: "Blue" | "Orange"): void {
  startPlayer = option;
  renderSetPanel(option);
  playerSelected = true;
  if (allSettingsSelected()) enableStartBtn();
}

function setBoardSize(option: "16" | "24" | "36"): void {
  boardSize = option;
  renderSetPanel(option);
  boardSelected = true;
  if (allSettingsSelected()) enableStartBtn();
}

function allSettingsSelected() {
  return themeSelected && playerSelected && boardSelected;
}

function enableStartBtn(): void {
  document.getElementById("set-start-btn")?.classList.remove("disabled");
}

function renderSetPanel(option: string): void {
  switch (option) {
    case "Code-vibes":
    case "DA-projects":
      setInnerText("game-theme-selected", option + " theme");
      break;
    case "Blue":
    case "Orange":
      setInnerText("player-selected", option + " player");
      break;
    case "16":
    case "24":
    case "36":
      setInnerText("board-size-selected", option + " cards");
      break;
  }
}

function setInnerText(htmlId: string, text: string): void {
  const element = document.getElementById(htmlId);
  if (element) {
    element.innerText = text;
  }
}

function changeImageSrc(htmlId: string, srcPath: string): void {
  const element = document.getElementById(htmlId);
  if (element && element instanceof HTMLImageElement) {
    element.src = srcPath;
  }
}

function setThemePreview(option: "Code-vibes" | "DA-projects"): void {
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

function setListDecorators(element: HTMLElement): void {
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

function moveExitOverlay(moveType: string) {
  const overlayElement = document.getElementById("exit-overlay");
  if (!overlayElement) return;

  if (moveType == "move-in") {
    overlayElement.classList.add("exit-overlay-in");
  } else if (moveType == "move-out") {
    overlayElement.classList.remove("exit-overlay-in");
  }
}
