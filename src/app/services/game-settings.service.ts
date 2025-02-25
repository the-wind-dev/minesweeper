import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GridSettings } from '../models';
import { BOARD_CONFIG } from '../components/board/board.config';

@Injectable({
  providedIn: 'root'
})
export class GameSettingsService {

  private settingsSubject = new BehaviorSubject<GridSettings>(BOARD_CONFIG);

  $settings = this.settingsSubject.asObservable();

  updateSettings(settings: GridSettings) {
    this.settingsSubject.next(settings);
  }
}
