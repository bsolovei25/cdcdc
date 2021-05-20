import { Component, Input, OnInit } from '@angular/core';
import { IAstueOnpzMnemonicFurnaceStreamStatsMini } from '../../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-mnemonic-furnace.model';

@Component({
    selector: 'evj-astue-onpz-mnemonic-furnace-popup-stream',
    templateUrl: './astue-onpz-mnemonic-furnace-popup-stream.component.html',
    styleUrls: ['./astue-onpz-mnemonic-furnace-popup-stream.component.scss'],
})
export class AstueOnpzMnemonicFurnacePopupStreamComponent implements OnInit {
    @Input() data: { idx: number; data: IAstueOnpzMnemonicFurnaceStreamStatsMini } = null;

    constructor() {}

    ngOnInit(): void {}
}
