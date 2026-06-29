import { GameTheme } from "../scripts/shared";

export function getGameHeaderTemplate(gameTheme: GameTheme) {
  switch (gameTheme) {
    case "DA-projects":
      return `
          <div class="game-header__score">
            <div class="game-header__score--orange">
              <img class="player-icon-img" src="assets/img/DA-projects/chess_pawn_orange.svg" />
              <span id="score-orange">0</span>
            </div>
            <div class="game-header__score--blue">
              <img class="player-icon-img" src="assets/img/DA-projects/chess_pawn_blue.svg" />
              <span id="score-blue">0</span>
            </div>
          </div>
          <div class="game-header__current-player">
            <span>Current player:</span>
            <img id="current-player-icon" class="current-player-icon-img bg-blue" src="assets/img/chess_pawn_white.svg"/>
          </div>
          <button class="game-header__exit-btn" id="exit-btn">
            <img class="img-blue" alt="exit icon" />
            <span>Exit game</span>
          </button>
      `;
    default:
      return `
          <div class="game-header__score">
            <div class="game-header__score--blue">
              <div class="player-icon bg-blue"></div>
              <span>Blue</span>
              <span id="score-blue">0</span>
            </div>
            <div class="game-header__score--orange">
              <div class="player-icon bg-orange"></div>
              <span>Orange</span>
              <span id="score-orange">0</span>
            </div>
          </div>
          <div class="game-header__current-player">
            <span>Current player:</span>
            <div
              id="current-player-icon"
              class="player-icon bg-blue"
            ></div>
          </div>
          <button class="game-header__exit-btn" id="exit-btn">
            <img src="assets/img/leave.svg" alt="exit icon" />
            <span>Exit game</span>
          </button>
            `;
  }
}
