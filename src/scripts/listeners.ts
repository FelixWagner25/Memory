import { switchScreens, clearCurrentGame, initGame } from "../main";
import { moveExitOverlay } from "./game";
import {
  setListDecorators,
  setGameTheme,
  setThemePreview,
  setStartPlayer,
  setBoardSize,
} from "./settings";
import { startSettings } from "./shared";

const homeStartBtn = document.getElementById("home-start-btn");
const codeVibesBtnRef = document.getElementById("set-btn-code-vibes");
const daProjectsBtnRef = document.getElementById("set-btn-DA-projects");
const blueBtnRef = document.getElementById("set-btn-blue");
const organgeBtnRef = document.getElementById("set-btn-orange");
const sixteenBtnRef = document.getElementById("set-btn-16-cards");
const twentyfourBtnRef = document.getElementById("set-btn-24-cards");
const thirtysixBtnRef = document.getElementById("set-btn-36-cards");
const setStartBtn = document.getElementById("set-start-btn");

homeStartBtn?.addEventListener("click", () => {
  switchScreens("home-screen", "settings-screen");
});

codeVibesBtnRef?.addEventListener("click", () => {
  setGameTheme("Code-vibes");
  setListDecorators(codeVibesBtnRef);
});
codeVibesBtnRef?.addEventListener("mouseenter", () =>
  setThemePreview("Code-vibes"),
);
codeVibesBtnRef?.addEventListener("mouseout", () =>
  setThemePreview(startSettings.gameTheme),
);

daProjectsBtnRef?.addEventListener("click", () => {
  setGameTheme("DA-projects");
  setListDecorators(daProjectsBtnRef);
});
daProjectsBtnRef?.addEventListener("mouseenter", () =>
  setThemePreview("DA-projects"),
);
daProjectsBtnRef?.addEventListener("mouseout", () =>
  setThemePreview(startSettings.gameTheme),
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
  initGame();
});

/**
 * Sets all event listeners for buttons in document.
 *
 */
export function setBtnEventListeners(): void {
  const backToStartBtnDraw = document.getElementById("back-to-start-btn-draw");
  const backToStartBtnOrange = document.getElementById(
    "back-to-start-btn-orange",
  );
  const backToStartBtnBlue = document.getElementById("back-to-start-btn-blue");
  const confirmExitGameBtn = document.getElementById("confirm-exit-game-btn");
  const exitBtnRef = document.getElementById("exit-btn");
  const exitOverlayBgBlurRef = document.getElementById("exit-overlay-bg-blur");
  const backToGameBtnRef = document.getElementById("back-to-game-btn");

  backToStartBtnDraw?.addEventListener("click", () => {
    switchScreens("draw", "settings-screen");
    clearCurrentGame();
  });

  backToStartBtnOrange?.addEventListener("click", () => {
    switchScreens("winner-orange", "settings-screen");
    clearCurrentGame();
  });

  backToStartBtnBlue?.addEventListener("click", () => {
    switchScreens("winner-blue", "settings-screen");
    clearCurrentGame();
  });

  confirmExitGameBtn?.addEventListener("click", (event) => {
    switchScreens("game-screen", "settings-screen");
    moveExitOverlay("move-out", event);
    clearCurrentGame();
  });

  exitBtnRef?.addEventListener("click", (event) => {
    moveExitOverlay("move-in", event);
  });

  exitOverlayBgBlurRef?.addEventListener("click", (event) => {
    moveExitOverlay("move-out", event);
  });

  backToGameBtnRef?.addEventListener("click", (event) => {
    moveExitOverlay("move-out", event);
  });
}
