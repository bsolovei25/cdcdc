import { BehaviorSubject } from "rxjs";
import { ISouMvpMnemonicSchemeView } from "@widgets/SOU/sou-mvp-mnemonic-scheme/components/sou-mvp-mnemonic-scheme-view/sou-mvp-mnemonic-scheme-view.component";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class SouStreamsService {
    data$: BehaviorSubject<ISouMvpMnemonicSchemeView> = new BehaviorSubject<ISouMvpMnemonicSchemeView>(null);

    async getTableData(): Promise<void> {
        this.tableData = await this.http.get<ISouConfig[]>('assets/mock/SOU/sou-config.json').toPromise();
    }
}
