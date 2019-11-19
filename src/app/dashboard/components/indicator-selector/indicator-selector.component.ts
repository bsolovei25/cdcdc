import { Component, OnInit } from '@angular/core';
import {UserSettingsService} from '../../services/user-settings.service';

@Component({
  selector: 'evj-indicator-selector',
  templateUrl: './indicator-selector.component.html',
  styleUrls: ['./indicator-selector.component.scss']
})
export class IndicatorSelectorComponent implements OnInit {

  constructor(userSettingsService: UserSettingsService) { }

  ngOnInit() {
  }

}
