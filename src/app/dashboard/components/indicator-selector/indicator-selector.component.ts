import { Component, OnInit } from '@angular/core';
import { NewUserSettingsService } from '../../services/new-user-settings.service';
import { Subscription } from 'rxjs';
import { timingSafeEqual } from 'crypto';
import { ScreenSettings } from '../../models/user-settings.model';

@Component({
  selector: 'evj-indicator-selector',
  templateUrl: './indicator-selector.component.html',
  styleUrls: ['./indicator-selector.component.scss']
})
export class IndicatorSelectorComponent implements OnInit {

  public dataScreen: ScreenSettings[] = [];

  private isReadyAdd: boolean = false;

  private tempScreen: string = '';

  private newNameScreen: string = ''

  private subscription: Subscription;

  public idScreen: number;

  public nameScreen: string;

  private timerOff = null;

  private isShowScreens: boolean = false;

  constructor(
    private userSettings: NewUserSettingsService
    ) { }

  ngOnInit() {

    this.subscription = this.userSettings.screens$.subscribe(dataW => {
      this.dataScreen = dataW;
      for (const item of this.dataScreen) {
        item.updateScreen = false;
      }

    });

    this.nameScreen = this.getActiveScreen();
  }

  public LoadScreen(id) {
    this.userSettings.LoadScreen(id);
  }

  private ScreenActive(e) {
    if (this.timerOff) {
      clearTimeout(this.timerOff);
    }
    this.isShowScreens = true;
  }

  private ScreenDisable(e) {
    this.timerOff = setTimeout(() => {
      this.isShowScreens = false;
    }, 700);
  }

  getActiveScreen(): string {
    if (this.idScreen) {
      const currentScreen = this.dataScreen.find(x => x.id === this.idScreen);
      if (currentScreen)
        return currentScreen.screenName;
    }
    if (this.dataScreen[0])
      return this.dataScreen[0].screenName;
  }

  setActiveScreen(screen) {
    this.nameScreen = screen.screenName;
    this.idScreen = screen.id;
    screen.isActive = true;
  }

  onChangeAdder() {
    if (this.tempScreen !== '') {
      this.isReadyAdd = true;
    } else {
      this.isReadyAdd = false;
    }
  }

  public deleteScreen(id){
    this.userSettings.deleteScreen(id);
    for (let item of this.dataScreen) {
      if (item.id === id){
        this.dataScreen.splice(this.dataScreen.indexOf(item), 1);
      }
    }

    if (this.idScreen === id) {
      this.nameScreen = this.dataScreen[0].screenName;
      this.idScreen = this.dataScreen[0].id;
    }
  }

  public updateScreen(id, newName){
    for(let item of this.dataScreen){
      if(item.id === id){
        item.updateScreen = false;
      }
    }
    this.userSettings.updateScreen(id, newName);
  }

  public addScreen() {
    const newScreen = {
      id: 0,
      name: this.tempScreen,
      isActive: false
    }
    this.userSettings.PushScreen(this.tempScreen);
    this.tempScreen = '';
  }

  onUpdateForm(id) {
    for (let item of this.dataScreen){
      if (item.id === id) {
        item.updateScreen = true;
        this.newNameScreen = item.screenName;
      }
    }
  }

  isLeaveScreen(e){
    for(let item of this.dataScreen){
      item.updateScreen = false;
    }
  }
  isOverScreen(e) { }
}
