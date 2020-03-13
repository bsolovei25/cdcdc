import { Component, OnInit, Input } from '@angular/core';
import { ITankInfo } from '../../../models/petroleum-products-movement.model';

@Component({
    selector: 'evj-petroleum-reference-left',
    templateUrl: './petroleum-reference-left.component.html',
    styleUrls: ['./petroleum-reference-left.component.scss'],
})
export class PetroleumReferenceLeftComponent implements OnInit {
    @Input() typeScreen: string;

    constructor() {}

    ngOnInit(): void {}
}
