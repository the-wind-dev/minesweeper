import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GameSettings, GridSettings } from '../../models';
import { DEFAULT_BOARD_SETTINGS, GAME_SETTINGS } from '../../constants';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  @Input() isVisible: boolean = false;
  @Output() saveSettings = new EventEmitter<GridSettings>();
  @Output() close = new EventEmitter<void>();

  public gameSettings: GameSettings = GAME_SETTINGS;
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      rows: [
        DEFAULT_BOARD_SETTINGS.rows,
        [
          Validators.required,
          Validators.min(this.gameSettings.minRows),
          Validators.max(this.gameSettings.maxRows),
        ]
      ],
      cols: [
        DEFAULT_BOARD_SETTINGS.cols,
        [
          Validators.required,
          Validators.min(this.gameSettings.minCols),
          Validators.max(this.gameSettings.maxCols),
        ]
      ],
      mines: [
        DEFAULT_BOARD_SETTINGS.mines,
        [
          Validators.required,
          Validators.min(this.gameSettings.minMines),
        ]
      ],
    });

    this.settingsForm.get('rows')?.valueChanges.subscribe(() => this.updateMaxMines());
    this.settingsForm.get('cols')?.valueChanges.subscribe(() => this.updateMaxMines());
  }

  get maxMines(): number {
    const rows = this.settingsForm.get('rows')?.value || 0;
    const cols = this.settingsForm.get('cols')?.value || 0;
    return rows * cols - 1;
  }

  updateMaxMines() {
    const minesControl = this.settingsForm.get('mines');
    if (minesControl) {
      minesControl.setValidators([Validators.required, Validators.min(1), Validators.max(this.maxMines)]);
      minesControl.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      this.saveSettings.emit(this.settingsForm.value);
      this.onClose();
    }
  }

  onClose() {
    this.close.emit();
  }
}
