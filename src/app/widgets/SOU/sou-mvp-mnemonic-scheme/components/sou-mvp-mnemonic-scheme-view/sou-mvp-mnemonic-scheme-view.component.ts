import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChannelPlatform } from '../../../../../dashboard/models/@PLATFORM/channel-platform';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    ISouFlowIn,
    ISouFlowOut,
    ISouObjects,
} from '../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';
import { SouMvpMnemonicSchemeService } from '../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

export interface ISouMvpMnemonicSchemeView {
    name: string;
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
    chosenSetting$: Observable<number>;
    @ViewChild('schema') public schemaContainer: ElementRef;

    constructor(
        protected widgetService: WidgetService,
        private mvpService: SouMvpMnemonicSchemeService,
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
        this.chosenSetting$ = this.mvpService.chosenSetting$;
    }

    protected dataHandler(ref: { section: { flowIn: any[]; flowOut: any[]; objects: any[]; name: string }[] }): void {
        // let flowIn = this.data$.getValue()?.flowIn ?? [];
        // ref?.section?.flowIn?.forEach((x) => {
        //     const idx = flowIn.findIndex((s) => s.code === x.code);
        //     if (idx !== -1) {
        //         flowIn.splice(idx, 1);
        //     }
        // });
        // flowIn = [...flowIn, ...(ref?.section?.flowIn ?? [])];
        //
        // let sectionsData = this.data$.getValue()?.sectionsData ?? [];
        // const sectionsUnited = [
        //     ...(ref.section?.flowIn ?? []),
        //     ...(ref.section?.flowOut ?? []),
        //     ...(ref.section?.objects ?? []),
        // ];
        // sectionsUnited?.forEach((x) => {
        //     const idx = sectionsData.findIndex((s) => s.code === x.code);
        //     if (idx !== -1) {
        //         sectionsData.splice(idx, 1);
        //     }
        // });
        // sectionsData = [...sectionsData, ...sectionsUnited];
        // this.data$.next({
        //     name: ref?.section?.name ?? '',
        //     flowIn,
        //     sectionsData,
        // });

        const flowIn = ref.section?.flatMap((x) => x.flowIn) ?? [];
        const sectionsData = ref.section?.flatMap((x) => [...x.flowIn, ...x.flowOut, ...x.objects]) ?? [];
        this.data$.next({
            name: ref?.section?.[0]?.name ?? '',
            flowIn,
            sectionsData,
        });
    }
}
