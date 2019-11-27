import { Component, OnInit } from '@angular/core';
import {UserSettingsService} from '../../services/user-settings.service';
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
    },
    {
      id: 4,
      name: 'Экран 4',
      isActive: false
    }
  ];

  public dataScreen: ScreenSettings[] = [];

  private isReadyAdd: boolean = false;

  private tempScreen: string = '';

  private newNameScreen: string = ''

  private subscription: Subscription;

  public idScreen = 1;

  public nameScreen;
  
  constructor(
    private userSettingsService: UserSettingsService,
    private userSettings: NewUserSettingsService
    ) {
      /*
      this.subscription = this.userSettings.GetScreen().subscribe(dataW => {
        this.dataScreen = dataW;
        debugger
      });
      */
     }

  ngOnInit() {
   
    this.subscription = this.userSettings.screens$.subscribe(dataW => {
      this.dataScreen = dataW;
      for(let item of this.dataScreen){
        item.updateScreen = false;
      //  this.idScreen = item.id;
      }
      
    });
  
    this.getActiveScreen();
  }

  public LoadScreen(id){
    this.userSettings.LoadScreen(id);
  
  }
  
  getActiveScreen(){
    for(let item of this.dataScreen){
      if(this.idScreen === item.id){
        return this.nameScreen = item.screenName;
      }
    }
  }

  setActiveScreen(screen) {
    this.nameScreen = this.dataScreen[0].id;
    screen.isActive = true;
    this.idScreen = screen.id; 
  
  }

  onChangeAdder() {
    if (this.tempScreen !== '') {
      this.isReadyAdd = true;
    } else {
      this.isReadyAdd = false;
    }
  }
/*
  async addScreen() {
    const newScreen = {
      id: 0,
      name: this.tempScreen,
      isActive: false
    }
    const newscreen = await this.userSettings.PushScreen(this.tempScreen);
    this.dataScreen.push(newscreen);
    debugger
    //this.screens.push(newScreen);
    this.tempScreen = '';
  }
*/
  public deleteScreen(id){
    this.userSettings.deleteScreen(id);
    for(let item of this.dataScreen){
      if(item.id === id){
        this.dataScreen.splice(this.dataScreen.indexOf(item), 1);
        this.nameScreen = this.dataScreen[0].screenName;
        this.idScreen = this.dataScreen[0].id;
      }
    }
 
  }

  public updateScreen(id, newName){
    for(let item of this.dataScreen){
      if(item.id === id){
        item.updateScreen = false; 
      //  item.screenName = newName;
      }
    }
    this.userSettings.updateScreen(id, newName);
   // this.getActiveScreen();
  }

  public addScreen() {
    const newScreen = {
      id: 0,
      name: this.tempScreen,
      isActive: false
    }
    this.userSettings.PushScreen(this.tempScreen);
 
    //this.screens.push(newScreen);
    this.tempScreen = '';
  }

  onUpdateForm(id){
    for(let item of this.dataScreen){
      if(item.id === id){
        item.updateScreen = true; 
        this.newNameScreen = item.screenName;
       // this.getActiveScreen(); 
      }
    }
    //this.newNameScreen = '';
  }

  isLeaveScreen(e){
    for(let item of this.dataScreen){
      item.updateScreen = false;
    }
    // console.log('leave', e);
  }
  isOverScreen(e) {
    // console.log('over', e);  
  }

}
