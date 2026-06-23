export function getGameOverTemplate(gameTheme: "Code-vibes" | "DA-projects") {
  switch (gameTheme) {
    case "DA-projects":
      return ``;
    default:
      return `
      <div>
        <div class="game-over__headline">Game over</div>
        <div class="game-over-score-wrap">
          <div>Final score</div>
          <div class="game-over__score">
            <div class="game-over__score--blue">
              <div class="player-icon player-icon--blue"></div>
              <span>Blue</span>
              <span id="final-score-blue">0</span>
            </div>
            <div class="game-over__score--orange">
              <div class="player-icon player-icon--orange"></div>
              <span>Orange</span>
              <span id="final-score-orange">0</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
