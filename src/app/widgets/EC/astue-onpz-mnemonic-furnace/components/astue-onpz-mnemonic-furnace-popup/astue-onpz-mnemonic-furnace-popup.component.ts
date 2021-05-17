import { Component, Input, OnInit } from '@angular/core';
import { IAstueOnpzMnemonicFurnaceStreamStats } from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-mnemonic-furnace.model';

@Component({
    selector: 'evj-astue-onpz-mnemonic-furnace-popup',
    templateUrl: './astue-onpz-mnemonic-furnace-popup.component.html',
    styleUrls: ['./astue-onpz-mnemonic-furnace-popup.component.scss'],
})
export class AstueOnpzMnemonicFurnacePopupComponent implements OnInit {
    @Input() data: IAstueOnpzMnemonicFurnaceStreamStats = null;

    constructor() {}

    ngOnInit(): void {}
}
