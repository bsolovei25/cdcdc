import { Component, ElementRef, Input, OnInit } from '@angular/core';

type SimpleButtonSize = 'small' | 'middle' | 'big';

@Component({
    selector: 'evj-simple-button',
    templateUrl: './simple-button.component.html',
    styleUrls: ['./simple-button.component.scss'],
})
export class SimpleButtonComponent implements OnInit {
    @Input() public size: SimpleButtonSize = 'middle';
    @Input() private set disabled(value: boolean) {
        this._disabled = value;
        this.hostElement.nativeElement.style.pointerEvents = value ? 'none' : 'all';
    }
    public _disabled: boolean = false;

    constructor(private hostElement: ElementRef) {}

    ngOnInit(): void {}
}
