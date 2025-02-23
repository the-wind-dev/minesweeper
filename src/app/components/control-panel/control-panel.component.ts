import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ModalType } from "../../models";
import { ModalComponent } from "../shared/modal/modal.component";
import { CounterComponent } from "../counter/counter.component";

@Component({
    selector: 'app-control-panel',
    imports: [CounterComponent, ModalComponent],
    templateUrl: './control-panel.component.html',
    styleUrl: './control-panel.component.scss',
  })
  export class ControlPanelComponent {
    @ViewChild('modal') modal!: ModalComponent;
    
    @Input() remainingMines!: number;
    @Input() isGameOver: boolean = false;

    @Output() reset = new EventEmitter<void>();
    
    private showDialog(message: string): void {
        this.modal.type = ModalType.Confirm;
        this.modal.show(message);
    }

    public startNewGame() {
        if (!this.isGameOver) {
            this.showDialog("Start new Game?");
        } else {
            this.reset.emit();
        }
    }

    public handleConfirm(confirmed: boolean) {
        if (confirmed) {
            this.reset.emit();
        } 
        this.modal.close();
    }

    public onSettings() {
        console.log("OpenSettings");
    }
  }