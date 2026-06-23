export function getWinnerOrangeTemplate(
  gameTheme: "Code-vibes" | "DA-projects",
) {
  switch (gameTheme) {
    case "DA-projects":
      return `
        <div>
        <div class="winner-content pd-t-192px">
          <div class="winner-content__headline">
            <div class="winner-content__headline--secondary">The winner is</div>
            <div class="winner-content__headline--primary">
              Orange Player
            </div>
          </div>
          <img
            src="public/assets/img/DA-projects/chess_pawn_orange.svg"
            alt="Chess pawn orange"
            class="winner-content__img"
          />
          <button class="winner-content__btn" id="back-to-start-btn-orange">
            Home
          </button>
        </div>
      </div>
      `;
    default:
      return `
      <div>
        <img
          src="public/assets/img/confetti.svg"
          alt="confetti"
          class="confetti"
        />
        <div class="winner-content">
          <div class="winner-content__headline">
            <div class="winner-content__headline--secondary">The winner is</div>
            <div class="winner-content__headline--primary color-orange">
              Orange Player
            </div>
          </div>
          <img
            src="public/assets/img/code-vibes/chess_pawn_orange.svg"
            alt="Chess pawn orange"
            class="winner-content__img"
          />
          <button class="winner-content__btn" id="back-to-start-btn-orange">
            Back to the start
          </button>
        </div>
      </div>
            `;
  }
}

export function getWinnerBlueTemplate(gameTheme: "Code-vibes" | "DA-projects") {
  switch (gameTheme) {
    case "DA-projects":
      return `
      <div>
        <div class="winner-content pd-t-192px">
          <div class="winner-content__headline">
            <div class="winner-content__headline--secondary">The winner is</div>
            <div class="winner-content__headline--primary">
              Orange Player
            </div>
          </div>
          <img
            src="public/assets/img/DA-projects/chess_pawn_blue.svg"
            alt="Chess pawn blue"
            class="winner-content__img"
          />
          <button class="winner-content__btn" id="back-to-start-btn-blue">
            Home
          </button>
        </div>
      </div>
      `;
    default:
      return `
        <div>
        <img
          src="public/assets/img/confetti.svg"
          alt="confetti"
          class="confetti"
        />
        <div class="winner-content">
          <div class="winner-content__headline">
            <div class="winner-content__headline--secondary">The winner is</div>
            <div class="winner-content__headline--primary color-blue">
              Blue Player
            </div>
          </div>
          <img
            src="public/assets/img/code-vibes/chess_pawn_blue.svg"
            alt="orange chess pawn"
            class="winner-content__img"
          />
          <button class="winner-content__btn" id="back-to-start-btn-blue">
            Back to the start
          </button>
        </div>
      </div>
            `;
  }
}
