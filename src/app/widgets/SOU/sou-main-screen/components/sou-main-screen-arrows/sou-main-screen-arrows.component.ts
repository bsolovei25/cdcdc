import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'evj-sou-main-screen-arrows',
    templateUrl: './sou-main-screen-arrows.component.html',
    styleUrls: ['./sou-main-screen-arrows.component.scss'],
})
export class SouMainScreenArrowsComponent implements OnInit {
    @Input() type: 'two' | 'three' = 'three';

    constructor() {}

    ngOnInit(): void {}
}
