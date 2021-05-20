import { Component, Input, OnInit } from '@angular/core';
import { IAstueOnpzMnemonicFurnaceQuad } from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-mnemonic-furnace.model';

@Component({
    selector: 'evj-astue-onpz-mnemonic-furnace-quad',
    templateUrl: './astue-onpz-mnemonic-furnace-quad.component.html',
    styleUrls: ['./astue-onpz-mnemonic-furnace-quad.component.scss'],
})
export class AstueOnpzMnemonicFurnaceQuadComponent implements OnInit {
    @Input() data: IAstueOnpzMnemonicFurnaceQuad = null;

    constructor() {}

    ngOnInit(): void {}
}
