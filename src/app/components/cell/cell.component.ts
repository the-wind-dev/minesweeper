import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cell } from '../../models';

@Component({
  selector: 'app-cell',
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss',
})
export class CellComponent {
  @Input() cell!: Cell;

  @Output() onReveal = new EventEmitter<{ x: number; y: number }>();
  @Output() onFlag = new EventEmitter<{ x: number; y: number }>();

  handleLeftClick(): void {
    const {isOpened, isFlagged, x, y} = this.cell;

    if (!isOpened && !isFlagged) {
      this.onReveal.emit({x, y});
    }
  }

  handleRightClick(event: MouseEvent): void {
    event.preventDefault();
    const {isOpened, x, y} = this.cell;
    if (!isOpened) {
      this.onFlag.emit({x, y});
    }
  }
}