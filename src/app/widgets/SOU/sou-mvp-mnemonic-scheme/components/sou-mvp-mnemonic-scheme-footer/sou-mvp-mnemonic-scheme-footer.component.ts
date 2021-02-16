import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ChannelPlatform } from '../../../../../dashboard/models/@PLATFORM/channel-platform';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { ISOUOperationalAccountingSystem } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-footer',
    templateUrl: './sou-mvp-mnemonic-scheme-footer.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-footer.component.scss'],
})
export class SouMvpMnemonicSchemeFooterComponent
    extends ChannelPlatform<ISOUOperationalAccountingSystem>
    implements OnInit, OnDestroy {
    public data$: BehaviorSubject<ISOUOperationalAccountingSystem> = new BehaviorSubject<ISOUOperationalAccountingSystem>(
        null
    );

    constructor(
        protected widgetService: WidgetService,
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string
    ) {
        super(widgetId, channelId, widgetService);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: ISOUOperationalAccountingSystem): void {
        this.data$.next({ ...ref });
    }
}
