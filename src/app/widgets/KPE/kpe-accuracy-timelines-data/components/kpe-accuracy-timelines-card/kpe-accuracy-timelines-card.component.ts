import { Component, Input, OnInit } from '@angular/core';
import { IKpeAccuracyTimelinesRow } from '@widgets/KPE/kpe-accuracy-timelines-data/kpe-accuracy-timelines-data.interface';

@Component({
  selector: 'evj-kpe-accuracy-timelines-card',
  templateUrl: './kpe-accuracy-timelines-card.component.html',
  styleUrls: ['./kpe-accuracy-timelines-card.component.scss']
})
export class KpeAccuracyTimelinesCardComponent implements OnInit {
    @Input() public rowData: IKpeAccuracyTimelinesRow;

    constructor() { }

    ngOnInit(): void {}
}
