import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { ISOUFlowIn, ISOUFlowOut } from '../../../dashboard/models/SOU/sou-operational-accounting-system';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme',
    templateUrl: './sou-mvp-mnemonic-scheme.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme.component.scss']
})
export class SouMvpMnemonicSchemeComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    flowIn: ISOUFlowIn[];
    flowOut: ISOUFlowOut[];

    settings: string[] = [
        'Мгновенное',
        'За час',
        'Накоплено'
    ]

    choosenSetting: number = 1;

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'reference';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {
        debugger;
        this.flowIn = ref.flowIn;
        this.flowOut = ref.section[0].flowOut;
    }

    changeSetting(i: number): void {
        this.choosenSetting = i;
    }
}
