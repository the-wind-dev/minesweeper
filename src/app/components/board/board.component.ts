import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Cell } from "../../models";
import { CellComponent } from "../cell/cell.component";
import { BOARD_CONFIG } from "./board.config";



@Component({
    selector: 'app-board',
    imports: [CommonModule, CellComponent],
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss'
  })
  export class BoardComponent implements OnInit {

    public settings = BOARD_CONFIG;
    public grid: Cell[][] = [];
    public testGrid:  Cell[][] = [];

    // public methods

    public ngOnInit() {
        this.initializeBoard();
    }

    public handleReveal({ x, y }: { x: number; y: number }): void {
        

        console.log(this.grid[x][y]);

        if (this.grid[x][y].isMine) {
            this.grid[x][y].isOpened = true;
            alert('Game Over!');
            this.revealAllMines();
        }

        this.revealCell(x, y);
    }

    public handleFlag({ x, y }: { x: number; y: number}): void {
        this.grid[x][y].isFlagged = !this.grid[x][y].isFlagged;
    }

    // private methods

    private initializeBoard(): void {
        this.grid = Array.from({ length: this.settings.rows }, (_, rowIndex) =>
            Array.from({ length: this.settings.cols }, (_, colIndex) => ({
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

    private placeMines(): void {
        let placedMines = 0;
        const {rows, cols, mines} = this.settings;
        while (placedMines < mines) {
            let x = Math.floor(Math.random() * rows);
            let y = Math.floor(Math.random() * cols);

            if (!this.grid[x][y].isMine) {
                this.grid[x][y].isMine = true;
                placedMines++;
            }
        }
    }

    private calculateAdjacency(): void {
        const directions = [
            [-1, -1],   [-1, 0],  [-1, 1],
            [0, -1],              [0, 1],
            [1, -1],    [1, 0],   [1, 1]
        ];
        const {rows, cols} = this.settings;

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

    private revealAllMines(): void {
        this.grid.forEach(row => {
            row.forEach(cell => {
                if (cell.isMine) cell.isOpened = true;
            });
        });
    }

    

    private revealCell(x: number, y: number): void {
        const cell = this.getCell(x, y);
    
        if (!cell || cell.isOpened || cell.isFlagged) {
          return;
        }
    
        cell.isOpened = true;
    
        if (cell.adjacentMines === 0 && !cell.isMine) {
            this.revealNeighbors(x, y);
        }
      }

      private revealNeighbors(x: number, y: number): void {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue;
      
              const newX = x + i;
              const newY = y + j;
      
              this.revealCell(newX, newY);
            }
          }
    }

    private getCell(x: number, y: number): Cell | undefined {
        if (x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[0].length) {
          return this.grid[x][y];
        }
        return undefined;
    }
    
  }