export function getCardTemplate(id: number) {
  return `
        <button class="card" id="${id}">
        <div class="card__inner">
            <div class="card__face card__face--front"></div>
            <div class="card__face card__face--back"></div>
        </div>
        </button>
        `;
}
