import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import {
    ISOUFlowIn,
    ISOUFlowOut,
    ISOUObjects,
    ISOUOperationalAccountingSystem,
} from '../../../dashboard/models/SOU/sou-operational-accounting-system';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SouMvpMnemonicSchemeService } from '../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

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
    sectionsDataPark: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[] = [];

    factories: string[] = ['Производство №1', 'Производство №4', 'Товарное производство'];
    installations: string[][] = [['АВТ-10'], ['Изомалк-2'], ['АССБ Авиасмеси', 'АССБ А-95']];
    // installations: string[][] = [
    //     ['АВТ-10'],
    //     ['Изомалк-2'],
    //     [
    //         'АССБ Авиасмеси',
    //         'АССБ А-95',
    //         'АССБ А-98',
    //         'Насосная т.1163-1164 парк БГС',
    //         'Насосная т.1163-1164 парк А-95',
    //         'Насосная т.1163-1164 парк А-92',
    //     ],
    // ];

    twoSelection: string[] = [];

    set selectedInstallation(value: number) {
        this.stateController().save({ installation: value });
        this.mvpService.selectedInstallation$.next(value);
        this.changeInstall(this.installations[this.selectedInstallation][0]);
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
                title: 'ВБ',
                value: 0,
            },
        ],
        [
            {
                title: '',
                value: 0,
            },
        ],
    ];

    chosenSetting: number = 1;
    chosenSection: number = 0;
    chosenInstall: string = '';

    flag: boolean = true;

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

    protected dataConnect(): void {
        super.dataConnect();
        this.changeInstall(null);
        this.loadState();
    }

    protected dataHandler(ref: ISOUOperationalAccountingSystem): void {
        this.mainData = ref;
        if (ref.section[0].name === 'АВТ-10-АБ' || ref.section[0].name === 'АВТ-10-ВБ') {
            this.flowInAb = ref.section[0].flowIn;
            this.flowInVb = ref.section[1].flowIn;
        }
        this.sectionsData = [];
        this.sectionsDataIzo = [];
        this.flag = true;
        ref?.section?.forEach((item, i) => {
            if (item.name !== 'Изомалк-2') {
                this.sectionsData = [
                    ...this.sectionsData,
                    ...item.flowIn,
                    ...item.flowOut,
                    ...item.objects,
                ];
            } else {
                if (this.sectionsDataIzo && item?.flowIn && item?.flowOut && item?.objects) {
                    this.sectionsDataIzo = [
                        ...this.sectionsDataIzo,
                        ...item.flowIn,
                        ...item.flowOut,
                        ...item.objects,
                    ];
                }
            }

            if (this.selectedInstallation === 2) {
                if (this.flag) {
                    this.sectionsDataPark = [];
                    this.flag = false;
                }
                this.sectionsDataPark = [
                    ...this.sectionsDataPark,
                    ...item?.flowIn,
                    ...item?.flowOut,
                    ...item?.objects,
                ];
            }
            this.sections.forEach((section) => {
                const sec = section.find(
                    (sectionItem) => item.name.indexOf(sectionItem.title) !== -1
                );

                if (!!sec) {
                    sec.value = item.countFlowExceedingConfInterval;
                }
            });
        });
    }

    changeSetting(i: number): void {
        this.chosenSetting = i;
    }

    changeSection(i: number): void {
        this.chosenSection = i;
    }

    changeInstall(value: string): void {
        this.chosenInstall = value;
        this.chosenSection = 0;
        let a = {
            manufacture: 'Производство №1',
            name: 'АВТ-10',
        };
        if (value) {
            a = {
                manufacture: this.factories[this.selectedInstallation],
                name: value,
            };
        }
        this.setWsOptions(a);
    }

    stateController(): { save; load } {
        const key: string = 'sou-scheme-state';
        // tslint:disable-next-line:no-shadowed-variable
        const saveState = (state: { installation: number }): void => {
            const saveValue = JSON.stringify(state);
            localStorage.setItem(key, saveValue);
        };
        const loadState = (): { installation: number } => {
            const loadData = JSON.parse(localStorage.getItem(key));
            return loadData;
        };
        return {
            save: saveState,
            load: loadState,
        };
    }

    private loadState(): void {
        const res = this.stateController().load();
        if (!res) {
            return;
        }
        this.selectedInstallation = res.installation;
    }
}
