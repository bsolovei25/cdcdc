import { Component, OnInit, Input } from '@angular/core';
import { ITankInformation } from '../../tank-information.component';

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
