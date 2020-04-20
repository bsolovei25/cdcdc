import { Component, OnInit, Input } from '@angular/core';
import { ITankInformation } from 'src/app/dashboard/models/tank-information';

@Component({
  selector: 'evj-tank-line',
  templateUrl: './tank-line.component.html',
  styleUrls: ['./tank-line.component.scss']
})
export class TankLineComponent implements OnInit {
  @Input() public data: ITankInformation;

  constructor() { }

  ngOnInit(): void {
  }

}
