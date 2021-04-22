import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'evj-report-loading-file',
    templateUrl: './report-loading-file.component.html',
    styleUrls: ['./report-loading-file.component.scss']
})

export class ReportLoadingFileComponent implements OnInit {
    @Input() data: 'xlsx' | 'pdf' | 'html';

    constructor() {}

    ngOnInit(): void {}
}

