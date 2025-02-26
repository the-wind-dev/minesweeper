import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GridSettings } from '../models';
import { DEFAULT_BOARD_SETTINGS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  private settingsSubject = new BehaviorSubject<GridSettings>(DEFAULT_BOARD_SETTINGS);

  $settings = this.settingsSubject.asObservable();

  updateSettings(settings: GridSettings) {
    this.settingsSubject.next(settings);
  }
}
