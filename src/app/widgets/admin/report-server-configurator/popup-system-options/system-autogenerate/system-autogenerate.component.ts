import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { CUSTOM_DATE_FORMATS } from '@shared/components/time-data-picker/time-data-picker.component';

@Component({
    selector: 'evj-system-autogenerate',
    templateUrl: './system-autogenerate.component.html',
    styleUrls: ['./system-autogenerate.component.scss'],
    providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }],
})
export class SystemAutogenerateComponent implements OnInit {
    @Output() public result: EventEmitter<any> = new EventEmitter<any>();

    dateNow: Date = new Date();

    public isAutoGen: boolean = false;
    public isInterval: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    close() {
        const obj = {
            close: false,
            type: 'autogenerate',
        };
        this.result.emit(obj);
    }

    save() {
        const obj = {
            close: true,
            type: 'autogenerate',
        };
        this.result.emit(obj);
    }

    changeSwap(type: string) {
        if (type === 'interval') {
            this.isInterval = !this.isInterval;
        } else if (type === 'auto') {
            this.isAutoGen = !this.isAutoGen;
        }
    }

    dateTimePickerInput(event) {}
}
