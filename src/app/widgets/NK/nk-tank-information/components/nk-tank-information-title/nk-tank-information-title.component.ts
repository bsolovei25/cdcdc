import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-title',
  templateUrl: './nk-tank-information-title.component.html',
  styleUrls: ['./nk-tank-information-title.component.scss']
})
export class NkTankInformationTitleComponent implements OnInit {
  @Input() roofType: string;
  @Input() title: string;
  @Input() isRepair: boolean;

  constructor() { }
  ngOnInit(): void {
  }

}
