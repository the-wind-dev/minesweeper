import { GameSettings, GridSettings } from "../models";

export const GAME_SETTINGS: GameSettings = {
    minRows: 5,
    maxRows: 20,
    minCols: 5,
    maxCols: 20,
    minMines: 5,
};

export const DEFAULT_BOARD_SETTINGS: GridSettings = {
    rows: 14,
    cols: 12,
    mines: 10,
}