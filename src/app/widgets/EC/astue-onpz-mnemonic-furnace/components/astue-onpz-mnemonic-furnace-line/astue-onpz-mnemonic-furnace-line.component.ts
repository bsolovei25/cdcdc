import { Component, Input, OnInit } from '@angular/core';
import {
    IAstueOnpzMnemonicFurnace,
    IAstueOnpzMnemonicFurnaceLine,
} from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-mnemonic-furnace.model';

@Component({
    selector: 'evj-astue-onpz-mnemonic-furnace-line',
    templateUrl: './astue-onpz-mnemonic-furnace-line.component.html',
    styleUrls: ['./astue-onpz-mnemonic-furnace-line.component.scss'],
})
export class AstueOnpzMnemonicFurnaceLineComponent implements OnInit {
    @Input() public data: IAstueOnpzMnemonicFurnaceLine[] = [];

    constructor() {}

    ngOnInit(): void {}
}
