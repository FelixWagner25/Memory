import * as main from "../main";

export let themeSelected: boolean = false;
export let playerSelected: boolean = false;
export let boardSelected: boolean = false;

export let gameTheme: "Code-vibes" | "DA-projects";
export let startPlayer: "Blue" | "Orange";
export let boardSize: 16 | 24 | 36;

export function setGameTheme(option: "Code-vibes" | "DA-projects"): void {
  gameTheme = option;
  renderSetPanel(option);
  setThemePreview(option);
  themeSelected = true;
  if (allSettingsSelected()) enableStartBtn();
}

export function setStartPlayer(option: "Blue" | "Orange"): void {
  startPlayer = option;
  renderSetPanel(option);
  playerSelected = true;
  if (allSettingsSelected()) enableStartBtn();
}

export function setBoardSize(option: 16 | 24 | 36): void {
  boardSize = option;
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

const codeVibesBtnRef = document.getElementById("set-btn-code-vibes");
const daProjectsBtnRef = document.getElementById("set-btn-DA-projects");
const blueBtnRef = document.getElementById("set-btn-blue");
const organgeBtnRef = document.getElementById("set-btn-orange");
const sixteenBtnRef = document.getElementById("set-btn-16-cards");
const twentyfourBtnRef = document.getElementById("set-btn-24-cards");
const thirtysixBtnRef = document.getElementById("set-btn-36-cards");
const setStartBtn = document.getElementById("set-start-btn");

codeVibesBtnRef?.addEventListener("click", () => {
  setGameTheme("Code-vibes");
  setListDecorators(codeVibesBtnRef);
});
codeVibesBtnRef?.addEventListener("mouseenter", () =>
  setThemePreview("Code-vibes"),
);
codeVibesBtnRef?.addEventListener("mouseout", () => setThemePreview(gameTheme));

daProjectsBtnRef?.addEventListener("click", () => {
  setGameTheme("DA-projects");
  setListDecorators(daProjectsBtnRef);
});
daProjectsBtnRef?.addEventListener("mouseenter", () =>
  setThemePreview("DA-projects"),
);
daProjectsBtnRef?.addEventListener("mouseout", () =>
  setThemePreview(gameTheme),
);

blueBtnRef?.addEventListener("click", () => {
  setStartPlayer("Blue");
  setListDecorators(blueBtnRef);
});

organgeBtnRef?.addEventListener("click", () => {
  setStartPlayer("Orange");
  setListDecorators(organgeBtnRef);
});

sixteenBtnRef?.addEventListener("click", () => {
  setBoardSize(16);
  setListDecorators(sixteenBtnRef);
});

twentyfourBtnRef?.addEventListener("click", () => {
  setBoardSize(24);
  setListDecorators(twentyfourBtnRef);
});

thirtysixBtnRef?.addEventListener("click", () => {
  setBoardSize(36);
  setListDecorators(thirtysixBtnRef);
});

setStartBtn?.addEventListener("click", () => {
  main.initGame();
});
