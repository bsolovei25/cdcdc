import { Component, Input, OnInit } from '@angular/core';
import { IInstallation } from '../../sou-main-screen.component';

@Component({
  selector: 'evj-sou-installation-card',
  templateUrl: './sou-installation-card.component.html',
  styleUrls: ['./sou-installation-card.component.scss']
})
export class SouInstallationCardComponent implements OnInit {

  @Input() installation: IInstallation;
  constructor() { }

  ngOnInit(): void {
  }

}
