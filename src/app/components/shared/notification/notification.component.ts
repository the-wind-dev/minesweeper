import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
    @Input() notification!: string;

    @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();

    public close() {
        this.closed.emit(true);
    }
}