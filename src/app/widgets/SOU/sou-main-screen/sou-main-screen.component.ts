import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { SouMvpMnemonicSchemeService } from '../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';
import { IAllInstallations, IInstallationsObj } from '../../../dashboard/models/SOU/sou-main-screen.model';

@Component({
    selector: 'evj-sou-main-screen',
    templateUrl: './sou-main-screen.component.html',
    styleUrls: ['./sou-main-screen.component.scss'],
})
export class SouMainScreenComponent extends WidgetPlatform<unknown> implements OnInit {
    public allInstallations: IInstallationsObj = {};

    constructor(
        protected widgetService: WidgetService,
        public mvpService: SouMvpMnemonicSchemeService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: { group: IAllInstallations[] }): void {
        this.allInstallations = ref.group.reduce((gr, inst) => {
            gr[inst.type] = inst;
            return gr;
        }, {});
    }
}
