import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  imports: [CommonModule],
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent {
    @Input() header?: string;
    @Input() question!: string;

    @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

    public confirm() {
        this.isConfirmed.emit(true);
    }

    public close() {
        this.isConfirmed.emit(false);
    }
}