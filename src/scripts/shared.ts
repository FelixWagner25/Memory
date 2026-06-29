export type GameTheme = "Code-vibes" | "DA-projects";
export type PlayerColor = "Blue" | "Orange";
export type BoardSize = 16 | 24 | 36;

interface Settings {
  gameTheme: GameTheme;
  startPlayer: PlayerColor;
  boardSize: BoardSize;
  initCardListeners: boolean;
}

interface GameState {
  currentPlayer: PlayerColor;
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
  initCardListeners: false,
};

export let gameState: GameState = {
  currentPlayer: "Blue",
  scoreBlue: 0,
  scoreOrange: 0,
  flippedCards: 0,
  gameResult: "open",
  firstTurnId: null,
  secondTurnId: null,
};

export let gameCards: GameCard[] = [];

export function clearGameCardsArray() {
  gameCards = [];
}
