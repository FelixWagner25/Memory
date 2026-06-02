let themeSelected: boolean = false;
let playerSelected: boolean = false;
let boardSelected: boolean = false;

let gameTheme: "Code-vibes" | "DA-projects";
let startPlayer: "Blue" | "Orange";
let boardSize: "16" | "24" | "36";

function setGameTheme(option: "Code-vibes" | "DA-projects") {
  gameTheme = option;
  renderSetPanel(option);
  themeSelected = true;
  if (allSettingsSelected()) enableStartBtn();
}

function setStartPlayer(option: "Blue" | "Orange") {
  startPlayer = option;
  renderSetPanel(option);
  playerSelected = true;
  if (allSettingsSelected()) enableStartBtn();
}

function setBoardSize(option: "16" | "24" | "36") {
  boardSize = option;
  renderSetPanel(option);
  boardSelected = true;
  if (allSettingsSelected()) enableStartBtn();
}

function allSettingsSelected() {
  return themeSelected && playerSelected && boardSelected;
}

function enableStartBtn() {
  document.getElementById("set-start-btn")?.classList.remove("disabled");
}

function renderSetPanel(option: string) {
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

function setInnerText(htmlId: string, text: string) {
  const element = document.getElementById(htmlId);
  if (element) {
    element.innerText = text;
  }
}
