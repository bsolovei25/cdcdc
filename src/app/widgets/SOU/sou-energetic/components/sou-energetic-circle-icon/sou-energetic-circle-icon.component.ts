import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SouEnergeticElementType } from '../../../../../dashboard/models/SOU/sou-energetic.model';

@Component({
    selector: 'evj-sou-energetic-circle-icon',
    templateUrl: './sou-energetic-circle-icon.component.html',
    styleUrls: ['./sou-energetic-circle-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SouEnergeticCircleIconComponent implements OnInit {
    @Input() set iconType(value: SouEnergeticElementType) {
        if (!value) {
            this.iconUrl = null;
        }
        this.iconUrl = `assets/icons/widgets/SOU/sou-energetic/${value}.svg`;
    }
    iconUrl: string = null;

    constructor() {}

    ngOnInit(): void {}
}
