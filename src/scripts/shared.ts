interface Settings {
  gameTheme: "Code-vibes" | "DA-projects";
  startPlayer: "Blue" | "Orange";
  boardSize: 16 | 24 | 36;
}

interface GameState {
  currentPlayer: "Blue" | "Orange";
  scoreBlue: number;
  scoreOrange: number;
}

export interface GameCard {
  id: number;
  src: string;
  partnerId: number;
}

export let startSettings: Settings = {
  gameTheme: "Code-vibes",
  startPlayer: "Blue",
  boardSize: 16,
};

export let gameState: GameState = {
  currentPlayer: "Blue",
  scoreBlue: 0,
  scoreOrange: 0,
};

export let gameCards: GameCard[] = [];
