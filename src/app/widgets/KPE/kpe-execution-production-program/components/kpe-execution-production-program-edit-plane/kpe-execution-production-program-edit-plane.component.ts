import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'evj-kpe-execution-production-program-edit-plane',
    templateUrl: './kpe-execution-production-program-edit-plane.component.html',
    styleUrls: ['./kpe-execution-production-program-edit-plane.component.scss'],
})
export class KpeExecutionProductionProgramEditPlaneComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    public dateControl: FormControl = new FormControl({ value: new Date(), disabled: false });
}
