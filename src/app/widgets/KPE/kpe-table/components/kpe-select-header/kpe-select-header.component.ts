import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { KpeTableService } from '../../services/kpe-table.service';

@Component({
  selector: 'evj-kpe-select-header',
  templateUrl: './kpe-select-header.component.html',
  styleUrls: ['./kpe-select-header.component.scss']
})
export class KpeSelectHeaderComponent implements OnInit {
    @Input() public items: { id: number, value: string }[] = [];
    @Input() public type: 'planUnit' | 'valuePlanUnit' | 'averageUnit' | 'instantUnit' | 'totalUnit' | 'predictionUnit' | 'deviationUnits' |'valueRecommended';

    public selectedValue = this.items[0];

    constructor(
        private kpeTableService: KpeTableService
    ) { }

    ngOnInit(): void {
    }

    public changeUnit(event: MatSelectChange): void {
        this.kpeTableService.changeUnits(this.type, event.value);
    }

    public compareFn(a, b): boolean {
        return a?.id === b?.id;
    }
}
