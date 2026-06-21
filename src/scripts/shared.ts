interface Settings {
  gameTheme: "Code-vibes" | "DA-projects";
  startPlayer: "Blue" | "Orange";
  boardSize: 16 | 24 | 36;
}

interface GameState {
  currentPlayer: "Blue" | "Orange";
  scoreBlue: number;
  scoreOrange: number;
  flippedCards: number;
  gameResult: "open" | "Winner-Blue" | "Winner-Orange" | "Draw";
  firstTurnId: number | null;
  secondTurnId: number | null;
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
  flippedCards: 12,
  gameResult: "open",
  firstTurnId: null,
  secondTurnId: null,
};

export let gameCards: GameCard[] = [];
