import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-ozsm-simple-circle-diagram',
    templateUrl: './ozsm-simple-circle-diagram.component.html',
    styleUrls: ['./ozsm-simple-circle-diagram.component.scss'],
})
export class OzsmSimpleCircleDiagramComponent implements OnInit {
    @Input() innerIcon: string[] = ['water', 'waveLightning', 'fire', 'lightning'];
    constructor() {}

    ngOnInit(): void {}
}
