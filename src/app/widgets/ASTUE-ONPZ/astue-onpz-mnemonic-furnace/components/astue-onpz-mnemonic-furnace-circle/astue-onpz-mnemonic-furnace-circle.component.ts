import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IAstueOnpzMnemonicFurnaceCircle } from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-mnemonic-furnace.model';

@Component({
    selector: 'evj-astue-onpz-mnemonic-furnace-circle',
    templateUrl: './astue-onpz-mnemonic-furnace-circle.component.html',
    styleUrls: ['./astue-onpz-mnemonic-furnace-circle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AstueOnpzMnemonicFurnaceCircleComponent implements OnInit {
    @Input() data: IAstueOnpzMnemonicFurnaceCircle = null;
    @Input() isSelected: boolean = false;

    constructor() {}

    ngOnInit(): void {}
}
