import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-popup-system-options',
  templateUrl: './popup-system-options.component.html',
  styleUrls: ['./popup-system-options.component.scss']
})
export class PopupSystemOptionsComponent implements OnInit {
  @Input() optionsType: string;

  constructor() { }

  ngOnInit(): void {
  }

}
