import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GridSettings } from '../../models';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  @Input() isVisible: boolean = false; // Видимость popup
  @Output() saveSettings = new EventEmitter<GridSettings>();
  @Output() close = new EventEmitter<void>();

  settingsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      rows: [10, [Validators.required, Validators.min(5), Validators.max(20)]],
      cols: [10, [Validators.required, Validators.min(5), Validators.max(20)]],
      mines: [10, [Validators.required, Validators.min(1)]],
    });

    // Динамически обновляем максимальное количество мин
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
