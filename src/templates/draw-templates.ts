export function getDrawTemplate(gameTheme: "Code-vibes" | "DA-projects") {
  switch (gameTheme) {
    case "DA-projects":
      return `
      <div class="draw__headline">
        <div class="draw__headline--secondary">It's a</div>
        <div class="draw__headline--primary">Draw</div>
      </div>
      <img
        src="assets/img/DA-projects/scale.svg"
        alt="equal scale"
        class="draw__img"
      />
      <button class="draw__btn" id="back-to-start-btn-draw">
        Home
      </button> 
      `;
    default:
      return `
      <div class="draw__headline">
        <div class="draw__headline--secondary">It's a</div>
        <div class="draw__headline--primary">Draw</div>
      </div>
      <img
        src="assets/img/code-vibes/scale.svg"
        alt="equal scale"
        class="draw__img"
      />
      <button class="draw__btn" id="back-to-start-btn-draw">
        Back to the start
      </button>
        `;
  }
}
