import { Component, OnInit, Input } from '@angular/core';

interface IInputAps {
    title: string;
    value: string;
}

@Component({
    selector: 'evj-aps-input',
    templateUrl: './aps-input.component.html',
    styleUrls: ['./aps-input.component.scss'],
})
export class ApsInputComponent implements OnInit {
    @Input() public data: IInputAps;

    constructor() {}

    public ngOnInit(): void {}
}
