import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Cell } from "../../models";

@Component({
    selector: 'app-board',
    imports: [CommonModule],
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss'
  })
  export class BoardComponent implements OnInit {
    defaultSettings = {
        rows: 10,
        cols: 10,
        mines: 15,
    }

    grid: Cell[][] = [];

    ngOnInit() {
        this.initializeBoard();
        console.log(this.grid);
    }

    initializeBoard() {
        this.grid = Array.from({ length: this.defaultSettings.rows }, (_, rowIndex) =>
            Array.from({ length: this.defaultSettings.cols }, (_, colIndex) => ({
              x: rowIndex,
              y: colIndex,
              isMine: false,
              isOpened: false,
              isFlagged: false,
              adjacentMines: 0
            }))
          );

        this.placeMines();
        this.calculateAdjacency();
    }

    placeMines() {
        let placedMines = 0;
        const {rows, cols, mines} = this.defaultSettings;
        while (placedMines < mines) {
            let x = Math.floor(Math.random() * rows);
            let y = Math.floor(Math.random() * cols);

            if (!this.grid[x][y].isMine) {
                this.grid[x][y].isMine = true;
                placedMines++;
            }
        }
    }

    calculateAdjacency() {
        const directions = [
            [-1, -1],   [-1, 0],  [-1, 1],
            [0, -1],              [0, 1],
            [1, -1],    [1, 0],   [1, 1]
        ];
        const {rows, cols} = this.defaultSettings;

        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {

                if (this.grid[x][y].isMine) continue;

                let amount = 0;
                for (let [dx, dy] of directions) {
                    const adjRow = x + dx;
                    const adjCol = y + dy;

                    if (adjRow >= 0 && adjRow < rows && adjCol >= 0 && adjCol < cols) {
                        if (this.grid[adjRow][adjCol].isMine) amount++;
                    }
                }

                this.grid[x][y].adjacentMines = amount;
            }
        }
    }

    revealAllMines() {}
  }