import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-events-reasons',
    templateUrl: './events-reasons.component.html',
    styleUrls: ['./events-reasons.component.scss'],
})
export class EventsReasonsComponent implements OnInit {
    @Input() public title: string = '';
    @Input() public reasons: string[] = [];

    constructor() {}

    public ngOnInit(): void {}
}
