export function getDrawTemplate(gameTheme: "Code-vibes" | "DA-projects") {
  switch (gameTheme) {
    case "DA-projects":
      return ` 
      `;
    default:
      return `
      <div class="draw__headline">
        <div class="draw__headline--secondary">It's a</div>
        <div class="draw__headline--primary">Draw</div>
      </div>
      <img
        src="public/assets/img/scale_icon.svg"
        alt="equal scale"
        class="draw__img"
      />
      <button class="draw__btn" id="back-to-start-btn-draw">
        Back to the start
      </button>
        `;
  }
}
