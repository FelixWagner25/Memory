let themeSelected: boolean = false;
let playerSelected: boolean = false;
let boardSelected: boolean = false;

let gameTheme: "code-vibes" | "DA-projects";
let startPlayer: "blue" | "oragne";
let boardSize: "16cards" | "24cards" | "36cards";

function setGameTheme(option:"code-vibes" | "DA-projects") {
    gameTheme = option;
    themeSelected = true;
    if(allSettingsSelected()) enableStartBtn();
}

function setStartPlayer(option:"blue" | "oragne") {
    startPlayer = option;
    playerSelected = true;
    if(allSettingsSelected()) enableStartBtn();
}

function setBoardSize(option:"16cards" | "24cards" | "36cards") {
    boardSize = option;
    boardSelected = true;
    if(allSettingsSelected()) enableStartBtn();
}

function allSettingsSelected() {
    return themeSelected && playerSelected && boardSelected;
}

function enableStartBtn() {
    document.getElementById("set-start-btn")?.classList.remove("disabled");
}