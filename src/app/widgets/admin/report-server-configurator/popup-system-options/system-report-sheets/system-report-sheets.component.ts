import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'evj-system-report-sheets',
    templateUrl: './system-report-sheets.component.html',
    styleUrls: ['./system-report-sheets.component.scss'],
})
export class SystemReportSheetsComponent implements OnInit, AfterViewInit {
    @Output() public result: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('reportSheets') public block: ElementRef;

    data: any = [
        {
            name: 'test1',
            isView: true,
            value: 1,
        },
        {
            name: 'test2',
            isView: false,
            value: 2,
        },
        {
            name: 'test3',
            isView: true,
            value: 3,
        },
    ];

    blockOut: any = [];

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.blockNeed();
    }

    close(): void {
        const obj = {
            close: false,
            type: 'reportSheets',
        };
        this.result.emit(obj);
    }

    save(): void {
        const obj = {
            close: true,
            type: 'reportSheets',
        };
        this.result.emit(obj);
    }

    changeSwap(item) {
        item.isView = !item.isView;
    }

    blockNeed(): void {
        if (this.data) {
            const heightTemplate = this.data.length * 40;
            const heightOut = (this.block.nativeElement.clientHeight - heightTemplate) / 40;
            for (let i = 0; i < heightOut - 2; i++) {
                this.blockOut.push(i);
            }
        }
    }
}
