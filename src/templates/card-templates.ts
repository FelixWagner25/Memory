import * as main from "../main";
import { getCardBgSrc } from "../scripts/settings";

export function getCardTemplate(id: number) {
  const cardBackSrc = getCardBgSrc();
  return `
        <button class="card" id="${id}">
        <div class="card__inner">
            <img src=${cardBackSrc} class="card__face" />
            <img src=${main.gameCards[id].src} class="card__face card__face--back" />
        </div>
        </button>
        `;
}
