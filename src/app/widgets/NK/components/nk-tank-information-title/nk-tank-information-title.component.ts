import { ITitle } from './../../../../dashboard/models/NK/nk-tank-information.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-title',
  templateUrl: './nk-tank-information-title.component.html',
  styleUrls: ['./nk-tank-information-title.component.scss']
})
export class NkTankInformationTitleComponent implements OnInit {

  @Input() titleData: ITitle;

  constructor() { }

  ngOnInit(): void {
  }

}
