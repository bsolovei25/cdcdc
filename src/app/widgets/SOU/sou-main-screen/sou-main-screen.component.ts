import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { SouMvpMnemonicSchemeService } from '../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';
import { IInstallationsObj
} from '../../../dashboard/models/SOU/sou-main-screen.model';
import { SouMainScreenService } from '../../../dashboard/services/widgets/SOU/sou-main-screen.service';

@Component({
    selector: 'evj-sou-main-screen',
    templateUrl: './sou-main-screen.component.html',
    styleUrls: ['./sou-main-screen.component.scss']
})
export class SouMainScreenComponent extends WidgetPlatform<unknown> implements OnInit {

    public allInstallations: IInstallationsObj = {};

    constructor(
        protected widgetService: WidgetService,
        public mvpService: SouMvpMnemonicSchemeService,
        public souMainScreenService: SouMainScreenService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.getAllInstallations();
    }

    async getAllInstallations(): Promise<void> {
        try {
            const d = await this.souMainScreenService.getAllInstallations('sou-main-screen');
            this.allInstallations = d[1].data.group.reduce((p, c) => { p[c.type] = c; return p; }, {});
        } catch (e) {
            console.error(e);
        }
    }

    protected dataHandler(ref: any): void {
    }

}
