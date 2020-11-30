import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { IDatesInterval } from '../../../../../dashboard/services/widget.service';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';

@Component({
    selector: 'evj-oil-operations-line-menu',
    templateUrl: './oil-operations-line-menu.component.html',
    styleUrls: ['./oil-operations-line-menu.component.scss'],
})
export class OilOperationsLineMenuComponent implements OnInit, AfterViewInit {

    public dateFrom: FormControl = new FormControl();

    public dateTo: FormControl = new FormControl();

    @Input()
    public currentDates: IDatesInterval;

    @Output()
    public emitDates: EventEmitter<IDatesInterval> = new EventEmitter<IDatesInterval>();

    constructor() {
    }

    public ngOnInit(): void {
        this.dateFrom.setValue(this.currentDates.fromDateTime);
        this.dateTo.setValue(this.currentDates.toDateTime);
    }

    public ngAfterViewInit(): void {
        if (this.dateFrom && this.dateTo) {
            const datesFormControls = merge(
                this.dateFrom.valueChanges,
                this.dateTo.valueChanges,
            );

            datesFormControls.subscribe(() => {
                this.emitDates.emit({
                    fromDateTime: new Date(this.dateFrom.value),
                    toDateTime: new Date(this.dateTo.value),
                });
            });
        }
    }
}
