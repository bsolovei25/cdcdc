import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";
import { IComplexData } from "@widgets/SUUTP/suutp-complexes/complexes.interface";

@Component({
    selector: 'evj-complexes-data-item',
    templateUrl: './complexes-data-item.component.html',
    styleUrls: ['./complexes-data-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexesDataItemComponent implements OnInit {
    @Input() data: IComplexData;
    constructor() {}

    ngOnInit(): void {}
}
