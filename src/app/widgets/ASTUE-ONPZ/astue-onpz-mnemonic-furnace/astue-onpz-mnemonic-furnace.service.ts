import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    IAstueOnpzMnemonicFurnaceOptions,
    IAstueOnpzMnemonicFurnaceSelectReferences,
} from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-mnemonic-furnace.model';

@Injectable({
    providedIn: 'root',
})
export class AstueOnpzMnemonicFurnaceService {
    selectedItem$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    furnaceOptions$: Observable<IAstueOnpzMnemonicFurnaceOptions>;
    furnaceOptionsReferences: BehaviorSubject<IAstueOnpzMnemonicFurnaceSelectReferences>;

    constructor() {}

    public selectItem(id: string): void {
        if (this.selectedItem$.getValue() === id) {
            this.selectedItem$.next(null);
            return;
        }
        this.selectedItem$.next(id);
    }
}
