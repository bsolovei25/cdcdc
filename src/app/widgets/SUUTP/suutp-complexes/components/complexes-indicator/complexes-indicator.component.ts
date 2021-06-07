import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'evj-complexes-indicator',
    templateUrl: './complexes-indicator.component.html',
    styleUrls: ['./complexes-indicator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexesIndicatorComponent implements OnInit {
    @Input() count: number = 100;
    @Input() planLimit: number;
    @Input() errorLimit: number;
    @Input() greyColor: boolean;

    constructor() {}

    ngOnInit(): void {}
}
