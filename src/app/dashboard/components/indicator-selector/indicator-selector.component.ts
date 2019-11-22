import { Component, OnInit } from '@angular/core';
import {UserSettingsService} from '../../services/user-settings.service';

@Component({
  selector: 'evj-indicator-selector',
  templateUrl: './indicator-selector.component.html',
  styleUrls: ['./indicator-selector.component.scss']
})
export class IndicatorSelectorComponent implements OnInit {

  public screens = [
    {
      id: 1,
      name: 'Экран 1',
      isActive: true
    },
    {
      id: 2,
      name: 'Экран 2',
      isActive: false
    },
    {
      id: 3,
      name: 'Экран 3',
      isActive: false
    }
  ];

  private isReadyAdd: boolean = false;

  private tempScreen: string = '';

  constructor(userSettingsService: UserSettingsService) { }

  ngOnInit() {

  }

  getActiveScreen(): string {
    const activeScreen = this.screens.find(el => el.isActive === true);
    return activeScreen.name;
  }

  setActiveScreen(screen) {
    for (const i in this.screens) {
      this.screens[i].isActive = false;
    }
    screen.isActive = true;
  }

  onChangeAdder() {
    if (this.tempScreen !== '') {
      this.isReadyAdd = true;
    } else {
      this.isReadyAdd = false;
    }
  }

  addScreen() {
    const newScreen = {
      id: 0,
      name: this.tempScreen,
      isActive: false
    }
    this.screens.push(newScreen);
    this.tempScreen = '';
  }

}
