import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'evj-sou-workspace-info-bar',
  templateUrl: './sou-workspace-info-bar.component.html',
  styleUrls: ['./sou-workspace-info-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SouWorkspaceInfoBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
