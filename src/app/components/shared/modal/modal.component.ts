import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalType } from '../../../models';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
    @Input() type: ModalType = ModalType.Notification;
    @Input() message: String = '';

    @Output() onConfirm = new EventEmitter<boolean>();

    isVisible: boolean = false;

    get isConfirm(): boolean {
        return this.type === ModalType.Confirm;
    }

    public show(message: string) {
        this.message = message;
        this.isVisible = true;
    }

    public confirm(confirmed: boolean) {
        this.onConfirm.emit(confirmed);
        this.close();
    }

    public close() {
        this.isVisible = false;
    }
}