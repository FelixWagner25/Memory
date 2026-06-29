import { GameTheme } from "../scripts/shared";

export function getGameOverTemplate(gameTheme: GameTheme) {
  switch (gameTheme) {
    case "DA-projects":
      return `
      <div>
        <div class="game-over__headline">Game over</div>
        <div class="game-over-score-wrap">
            <div>Final score</div>
            <div class="game-over__score">
                <div class="game-over__score--orange">
                    <img class="player-icon-img" src="assets/img/DA-projects/chess_pawn_orange.svg" />
                    <span id="final-score-orange" class="color-orange">0</span>
                </div>
                <div class="game-over__score--blue">
                    <img class="player-icon-img" src="assets/img/DA-projects/chess_pawn_blue.svg" />
                    <span id="final-score-blue" class="color-blue">0</span>
                </div>            
            </div>
        </div>
      </div>
      `;
    default:
      return `
      <div>
        <div class="game-over__headline">Game over</div>
        <div class="game-over-score-wrap">
          <div>Final score</div>
          <div class="game-over__score">
            <div class="game-over__score--blue">
              <div class="player-icon bg-blue"></div>
              <span>Blue</span>
              <span id="final-score-blue">0</span>
            </div>
            <div class="game-over__score--orange">
              <div class="player-icon bg-orange"></div>
              <span>Orange</span>
              <span id="final-score-orange">0</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
