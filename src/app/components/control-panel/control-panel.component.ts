import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { GridSettings, ModalType } from "../../models";
import { ModalComponent } from "../shared/modal/modal.component";
import { CounterComponent } from "../counter/counter.component";
import { SettingsComponent } from "../settings/settings.component";
import { GameSettingsService } from "../../services/game-settings.service";

@Component({
    selector: 'app-control-panel',
    imports: [CounterComponent, ModalComponent, SettingsComponent],
    templateUrl: './control-panel.component.html',
    styleUrl: './control-panel.component.scss',
  })
  export class ControlPanelComponent {
    @ViewChild('modal') modal!: ModalComponent;
    
    @Input() remainingMines!: number;
    @Input() isGameOver: boolean = false;

    @Output() reset = new EventEmitter<void>();

    isSettingsVisible: boolean = false;
    rows: number = 10;
    cols: number = 10;
    mines: number = 10;

    constructor(private gameSettingsService: GameSettingsService) {}

    private onSettingsChange(settings: GridSettings) {
        // Отправляем новые настройки через сервис
        this.gameSettingsService.updateSettings(settings);
    }
    
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

    public openSettings() {
        this.isSettingsVisible = true;
    }

    public onSaveSettings(settings: GridSettings) {
        console.log(settings);
        this.rows = settings.rows;
        this.cols = settings.cols;
        this.mines = settings.mines;
        this.onSettingsChange(settings);
        this.isSettingsVisible = false;
        // Здесь можно добавить логику для перезапуска игры с новыми настройками
    }

    public onCloseSettings() {
        this.isSettingsVisible = false;
    }
  }