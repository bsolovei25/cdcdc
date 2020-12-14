import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IAstueOnpzMnemonicFurnaceCircle } from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-mnemonic-furnace.model';
import { AstueOnpzMnemonicFurnaceService } from '../../astue-onpz-mnemonic-furnace.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'evj-astue-onpz-mnemonic-furnace-circle',
    templateUrl: './astue-onpz-mnemonic-furnace-circle.component.html',
    styleUrls: ['./astue-onpz-mnemonic-furnace-circle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AstueOnpzMnemonicFurnaceCircleComponent implements OnInit {
    @Input() data: IAstueOnpzMnemonicFurnaceCircle = null;
    @Input() isSelected: boolean = false;

    public isSelected$: Observable<boolean> = this.mnemonicFurnaceService.selectedItem$.pipe(
        map((x) => (!!this.data?.id ? x === this.data?.id : false))
    );

    constructor(private mnemonicFurnaceService: AstueOnpzMnemonicFurnaceService) {}

    ngOnInit(): void {}

    public selectCircle(): void {
        if (!this.data.id) {
            console.warn('Warning: there is no such item id');
            return;
        }
        this.mnemonicFurnaceService.selectItem(this.data.id);
    }
}
