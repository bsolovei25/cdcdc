import { Component, OnInit, Input, ViewChild, TemplateRef, Pipe } from '@angular/core';

@Component({
    selector: 'evj-column-grid',
    templateUrl: './column-grid.component.html',
    styleUrls: ['./column-grid.component.scss'],
})
export class ColumnGridComponent implements OnInit {
    @ViewChild('default', { static: true }) default: TemplateRef<any>;
    @Input() key: string;
    @Input() name: string;
    @Input() width: number;
    @Input() className: string;
    @Input() template: TemplateRef<any>;
    @Input() tooltip: string; //in future

    constructor() {}

    ngOnInit(): void {
        this.template = this.template || this.default;
    }
}
