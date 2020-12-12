import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ISouEnergeticElement } from '../../../../../dashboard/models/SOU/sou-energetic.model';

@Component({
    selector: 'evj-sou-energetic-card',
    templateUrl: './sou-energetic-card.component.html',
    styleUrls: ['./sou-energetic-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SouEnergeticCardComponent implements OnInit {
    @Input() data: ISouEnergeticElement = null;

    constructor() {}

    ngOnInit(): void {}
}
