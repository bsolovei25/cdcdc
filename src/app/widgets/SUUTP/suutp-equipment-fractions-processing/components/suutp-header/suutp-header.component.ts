import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
  selector: 'evj-suutp-header',
  templateUrl: './suutp-header.component.html',
  styleUrls: ['./suutp-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuutpHeaderComponent implements OnInit {
    @Input() title: string;
  constructor() { }

  ngOnInit(): void {
  }

}
