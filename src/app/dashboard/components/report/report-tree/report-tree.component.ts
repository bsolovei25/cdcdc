import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { IReportTemplate } from '../../../models/ADMIN/report-server.model';
import { SelectionModel } from '@angular/cdk/collections';

export const fadeAnimation = trigger('fadeAnimation', [
    transition(':enter', [style({ opacity: 0, height: 0 }), animate('100ms', style({ opacity: 1, height: 145 }))]),
    transition(':leave', [style({ opacity: 1, height: 145 }), animate('100ms', style({ opacity: 0, height: 0 }))]),
]);

export interface IReportTree {
    id: number;
    name: string;
    templates: IReportTemplate[];
    childFolders: IReportTree[];
}

@Component({
    selector: 'evj-report-tree',
    templateUrl: './report-tree.component.html',
    styleUrls: ['./report-tree.component.scss'],
    animations: [fadeAnimation],
})
export class ReportTreeComponent implements OnInit {
    isLoading: boolean = false;

    count: number = 1;

    @Input() selectedFolders: SelectionModel<number>;
    @Input() activeElements: SelectionModel<number>;
    @Input() data: IReportTree;
    @Input() search: string;

    @Input() set dataCount(count: number) {
        this.count = count + 6;
    }

    constructor() {}

    ngOnInit(): void {}
}
