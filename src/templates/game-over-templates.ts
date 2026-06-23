export function getGameOverTemplate(gameTheme: "Code-vibes" | "DA-projects") {
  switch (gameTheme) {
    case "DA-projects":
      return `
      <div>
        <div class="game-over__headline">Game over</div>
        <div class="game-over-score-wrap">
            <div>Final score</div>
            <div class="game-over__score">
                <div class="game-over__score--orange">
                    <img class="player-icon-img" src="public/assets/img/chess_pawn_orange.svg" />
                    <span id="final-score-orange">0</span>
                </div>
                <div class="game-over__score--blue">
                    <img class="player-icon-img" src="public/assets/img/chess_pawn_blue.svg" />
                    <span id="final-score-blue">0</span>
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
