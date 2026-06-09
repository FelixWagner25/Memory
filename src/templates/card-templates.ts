export function getCardTemplate(id: number) {
  return `
        <button class="card" id="${id}">
        <div class="card__inner">
            <img src="public/assets/img/card--back_DA-theme.svg" class="card__face" />
            <img src="public/assets/img/code-vibes/git.svg" class="card__face card__face--back" />
        </div>
        </button>
        `;
}
