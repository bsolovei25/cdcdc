import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AstueOnpzMnemonicFurnaceService {
    selectedItem$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor() {}

    public selectItem(id: string): void {
        if (this.selectedItem$.getValue() === id) {
            this.selectedItem$.next(null);
            return;
        }
        this.selectedItem$.next(id);
    }
}
