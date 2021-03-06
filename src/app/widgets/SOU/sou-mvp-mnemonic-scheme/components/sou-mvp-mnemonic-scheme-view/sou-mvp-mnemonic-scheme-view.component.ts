import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChannelPlatform } from '../../../../../dashboard/models/@PLATFORM/channel-platform';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    ISouFlowIn,
    ISouFlowOut,
    ISouObjects,
    SouSectionData
} from '@dashboard/models/SOU/sou-operational-accounting-system.model';
import { SouMvpMnemonicSchemeService } from '../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

export interface ISouMvpMnemonicSchemeView {
    name: string;
    flowIn: ISouFlowIn[];
    sectionsData: SouSectionData[];
}

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-view',
    templateUrl: './sou-mvp-mnemonic-scheme-view.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-view.component.scss']
})
export class SouMvpMnemonicSchemeViewComponent extends ChannelPlatform<unknown> implements OnInit, OnDestroy {
    private readonly emptyGuid: string = '00000000-0000-0000-0000-000000000000';

    public data$: BehaviorSubject<ISouMvpMnemonicSchemeView>;
    chosenSetting$: Observable<number>;
    @ViewChild('schema') public schemaContainer: ElementRef;

    constructor(
        private mvpService: SouMvpMnemonicSchemeService,
        protected widgetService: WidgetService,
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string,
        @Inject('viewType') public viewType: string,
        @Inject('unitName') public unitName: string,
        @Inject('svgName') public svgName: string,
    ) {
        super(widgetId, channelId, widgetService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        console.log('inject', { channelId: this.channelId, view: this.viewType });
        this.chosenSetting$ = this.mvpService.chosenSetting$;
        this.data$ = this.mvpService.data$;

    }

    protected dataHandler(ref: { section: { flowIn: ISouFlowIn[]; flowOut: ISouFlowOut[]; objects: ISouObjects[]; name: string }[] }): void {
        // const flowIn = ref.section?.flatMap((x) => x.flowIn) ?? [];
        // const sectionsData = ref.section?.flatMap((x) => [...x.flowIn, ...x.flowOut, ...x.objects]) ?? [];
        //
        // sectionsData?.forEach((x) => {
        //     if (x.linkId === this.emptyGuid) {
        //         delete x.linkId;
        //     }
        // });
        // this.mvpService.data$.next({
        //     name: ref?.section?.[0]?.name ?? "",
        //     flowIn,
        //     sectionsData
        // });
        // this.mvpService.currentSection$.next(ref.section?.[0]);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
