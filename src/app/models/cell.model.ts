export interface Cell {
    x: number;
    y: number;
    isMine: boolean;
    isOpened: boolean;
    isFlagged: boolean;
    adjacentMines: number;
    isIncorrectFlag: boolean;
  }
  