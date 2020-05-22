import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-main-icon',
  templateUrl: './main-icon.component.html',
  styleUrls: ['./main-icon.component.scss']
})
export class MainIconComponent implements OnInit {
  @Input() systemIcon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
