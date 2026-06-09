const exitBtnRef = document.getElementById("exit-btn");
const exitOverlayBgBlurRef = document.getElementById("exit-overlay-bg-blur");
const backToGameBtnRef = document.getElementById("back-to-game-btn");

exitBtnRef?.addEventListener("click", (event) => {
  moveExitOverlay("move-in", event);
});

exitOverlayBgBlurRef?.addEventListener("click", (event) => {
  moveExitOverlay("move-out", event);
});

backToGameBtnRef?.addEventListener("click", (event) => {
  moveExitOverlay("move-out", event);
});

export function moveExitOverlay(moveType: string, event: Event): void {
  event.stopPropagation();
  const overlayElement = document.getElementById("exit-overlay");
  const bgOverlayElement = document.getElementById("exit-overlay-bg-blur");
  if (!overlayElement || !bgOverlayElement) return;

  if (moveType == "move-in") {
    overlayElement.classList.add("exit-overlay-in");
    bgOverlayElement.classList.add("blur-on");
  } else if (moveType == "move-out") {
    overlayElement.classList.remove("exit-overlay-in");
    bgOverlayElement.classList.remove("blur-on");
  }
}
