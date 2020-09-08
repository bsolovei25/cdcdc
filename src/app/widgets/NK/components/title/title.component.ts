import { ITitle } from './../../interfaces/interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() titleData: ITitle;

  constructor() { }

  ngOnInit(): void {
  }

}
