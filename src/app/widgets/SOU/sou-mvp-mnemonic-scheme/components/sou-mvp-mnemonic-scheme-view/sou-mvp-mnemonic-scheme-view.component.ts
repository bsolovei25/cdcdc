import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ChannelPlatform } from '../../../../../dashboard/models/@PLATFORM/channel-platform';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { BehaviorSubject } from 'rxjs';
import {
    ISouFlowIn,
    ISouFlowOut,
    ISouObjects,
} from '../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';

export interface ISouMvpMnemonicSchemeView {
    flowIn: ISouFlowIn[];
    sectionsData: (ISouFlowOut | ISouFlowIn | ISouObjects)[];
}

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-view',
    templateUrl: './sou-mvp-mnemonic-scheme-view.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-view.component.scss'],
})
export class SouMvpMnemonicSchemeViewComponent extends ChannelPlatform<unknown> implements OnInit, OnDestroy {
    public data$: BehaviorSubject<ISouMvpMnemonicSchemeView> = new BehaviorSubject<ISouMvpMnemonicSchemeView>(null);
    public chosenSetting: number = 1;

    constructor(
        protected widgetService: WidgetService,
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string,
        @Inject('viewType') public viewType: string,
        @Inject('unitName') public unitName: string
    ) {
        super(widgetId, channelId, widgetService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        console.log('inject', { channelId: this.channelId, view: this.viewType });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: { section: { flowIn: any; flowOut: any; objects: any } }): void {
        this.data$.next({
            flowIn: [...ref.section.flowIn, ...ref.section.flowIn],
            sectionsData: [...ref.section.flowIn, ...ref.section.flowOut, ...ref.section.objects],
        });
        console.log('data', this.data$.value);
    }
}
