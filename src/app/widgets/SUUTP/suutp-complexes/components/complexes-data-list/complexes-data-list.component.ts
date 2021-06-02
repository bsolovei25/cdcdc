import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { IComplexData } from "@widgets/SUUTP/suutp-complexes/complexes.interface";

@Component({
    selector: 'evj-complexes-data-list',
    templateUrl: './complexes-data-list.component.html',
    styleUrls: ['./complexes-data-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexesDataListComponent {
    @Input() data: IComplexData[];

    public trackByIndex(index: number): number {
        return index;
    }

}

