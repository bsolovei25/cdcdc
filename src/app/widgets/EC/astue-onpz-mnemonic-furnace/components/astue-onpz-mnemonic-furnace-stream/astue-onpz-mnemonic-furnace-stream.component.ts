import { Component, Input, OnInit } from '@angular/core';
import { IAstueOnpzMnemonicFurnaceRect } from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-mnemonic-furnace.model';

@Component({
    selector: 'evj-astue-onpz-mnemonic-furnace-stream',
    templateUrl: './astue-onpz-mnemonic-furnace-stream.component.html',
    styleUrls: ['./astue-onpz-mnemonic-furnace-stream.component.scss'],
})
export class AstueOnpzMnemonicFurnaceStreamComponent implements OnInit {
    @Input() public data: IAstueOnpzMnemonicFurnaceRect = null;

    constructor() {}

    ngOnInit(): void {}
}
