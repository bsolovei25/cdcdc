import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'evj-astue-onpz-mnemonic-furnace-popup-stream',
    templateUrl: './astue-onpz-mnemonic-furnace-popup-stream.component.html',
    styleUrls: ['./astue-onpz-mnemonic-furnace-popup-stream.component.scss'],
})
export class AstueOnpzMnemonicFurnacePopupStreamComponent implements OnInit {
    @Input() data: { idx: number; value: number } = null;

    constructor() {}

    ngOnInit(): void {}
}
