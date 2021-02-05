import { Component, OnInit, Input } from '@angular/core';
import { TooltipModel } from './service/tooltip.service';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
    @Input() value: TooltipModel;

    constructor() {}

    ngOnInit(): void {}
}
