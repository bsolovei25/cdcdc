import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import {
    ISOUFlowIn,
    ISOUFlowOut,
    ISOUObjects,
    ISOUOperationalAccountingSystem,
} from '../../../dashboard/models/SOU/sou-operational-accounting-system';
import { SouMvpMnemonicSchemeService } from '../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme',
    templateUrl: './sou-mvp-mnemonic-scheme.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme.component.scss'],
    animations: [
        trigger('Branch', [
            state(
                'closed',
                style({
                    height: 0,
                    opacity: 0,
                    overflow: 'hidden',
                })
            ),
            state(
                'opened',
                style({
                    height: '110px',
                    opacity: 1,
                })
            ),
            transition('closed => opened', animate('200ms ease-in')),
            transition('opened => closed', animate('200ms ease-out')),
        ]),
    ],
})
export class SouMvpMnemonicSchemeComponent extends WidgetPlatform<unknown>
    implements OnInit, OnDestroy {
    flowInAb: ISOUFlowIn[];
    flowInVb: ISOUFlowIn[];

    mainData: ISOUOperationalAccountingSystem;

    settings: string[] = ['Мгновенное', 'За час', 'Накоплено'];

    sectionsData: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[] = []; // Массив всех элементов
    sectionsDataIzo: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[] = []; // Массив всех элементов Изомалка

    factories: string[] = ['Производство 1', 'Производство 4'];
    installations: string[] = ['АВТ-10', 'Изомалк-2'];

    set selectedInstallation(value: number) {
        this.mvpService.selectedInstallation$.next(value);
    }
    get selectedInstallation(): number {
        return this.mvpService.selectedInstallation$.getValue();
    }

    sections: {
        title: string;
        value: number;
    }[][] = [
        [
            {
                title: 'АБ',
                value: 0,
            },
            {
                title: 'BБ',
                value: 0,
            },
        ],
        [],
    ];

    choosenSetting: number = 1;
    choosenSection: number = 0;

    constructor(
        public widgetService: WidgetService,
        public mvpService: SouMvpMnemonicSchemeService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'reference';
    }

    ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            this.mvpService.selectedInstallation$.asObservable().subscribe((ref) => {
                this.mvpService.closePopup();
            })
        );
    }

    protected dataHandler(ref: ISOUOperationalAccountingSystem): void {
        this.mainData = ref;
        this.flowInAb = ref.section[0].flowIn;
        this.flowInVb = ref.section[1].flowIn;

        this.sectionsData = [];
        this.sectionsDataIzo = [];
        ref.section.forEach((item, i) => {
            if (i !== 2) {
                this.sectionsData = [
                    ...this.sectionsData,
                    ...item.flowIn,
                    ...item.flowOut,
                    ...item.objects,
                ];
            } else {
                this.sectionsDataIzo = [
                    ...this.sectionsDataIzo,
                    ...item.flowIn,
                    ...item.flowOut,
                    ...item.objects,
                ];
            }
            if (item.name !== 'Изомалк-2') {
                if (this.sections[0].find(section => section.title === item.name.split('-')[2])) {
                    this.sections[0].find(section => section.title === item.name.split('-')[2]).value = item.countFlowExceedingConfInterval;
                }
            }
        });
    }

    changeSetting(i: number): void {
        this.choosenSetting = i;
    }

    changeSection(i: number): void {
        this.choosenSection = i;
    }
}
