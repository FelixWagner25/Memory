import { gameCards, GameTheme } from "../scripts/shared";

export function getCardTemplate(gameTheme: GameTheme, id: number) {
  switch (gameTheme) {
    case "DA-projects":
      return `
        <button class="card" id="${id}">
            <div class="card__inner">
                <img src="assets/img/card--back_DA-projects.svg" class="card__face" />
                <img src=${gameCards[id].src} class="card__face card__face--back" />
            </div>
        </button>
        `;

    default:
      return `
        <button class="card" id="${id}">
            <div class="card__inner">
                <img src="assets/img/card--back_Code-vibes.svg" class="card__face" />
                <img src=${gameCards[id].src} class="card__face card__face--back" />
            </div>
        </button>
        `;
  }
}
