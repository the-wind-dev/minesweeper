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
    grid: Cell[][] = [];

    ngOnInit() {
        this.initializeBoard();
        console.log(this.grid)
    }

    initializeBoard() {
        console.log("init");

        this.placeMines();
        this.calculateAdjacency();
    }

    placeMines() {}

    calculateAdjacency() {}

    revealAllMines() {}
  }