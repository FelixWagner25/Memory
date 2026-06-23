export function getGameHeaderTemplate(gameTheme: "Code-vibes" | "DA-projects") {
  switch (gameTheme) {
    case "DA-projects":
      return ``;
    default:
      return `
            <div class="game-header__score">
            <div class="game-header__score--blue">
              <div class="player-icon player-icon--blue"></div>
              <span>Blue</span>
              <span id="score-blue">0</span>
            </div>
            <div class="game-header__score--orange">
              <div class="player-icon player-icon--orange"></div>
              <span>Orange</span>
              <span id="score-orange">0</span>
            </div>
          </div>
          <div class="game-header__current-player">
            <span>Current player:</span>
            <div
              id="current-player-icon"
              class="player-icon player-icon--blue"
            ></div>
          </div>
          <button class="game-header__exit-btn" id="exit-btn">
            <img src="public/assets/img/leave.svg" alt="exit icon" />
            <span>Exit game</span>
          </button>
            `;
      break;
  }
}
