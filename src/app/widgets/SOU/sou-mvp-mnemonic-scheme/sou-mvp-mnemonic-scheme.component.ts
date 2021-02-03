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

interface ISouSectionUI {
    manufacture: string;
    title: string;
    value: number;
}

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

    twoSelection: string[] = [];

    set selectedManufacture(index: number) {
        if (index !== undefined) {
            this.stateController().save({ manufacture: index });
            this.mvpService.selectedManufactures$.next({ name: this.manufacture[index], index });
            if (this.unit.length) {
                this.changeUnit(this.unit[index][0]);
            }
        }
    }

    get selectedManufacture(): number {
        return this.mvpService.selectedManufactures$.getValue()?.index;
    }

    sections: ISouSectionUI[][] = [
        [
            {
                manufacture: 'Производство №1',
                title: 'АБ',
                value: 0,
            },
            {
                manufacture: 'Производство №1',
                title: 'ВБ',
                value: 0,
            },
        ],
        [
            {
                manufacture: 'Производство №4',
                title: '',
                value: 0,
            },
        ],
    ];

    manufacture: string[] = [];
    unit: string[][] = [];

    chosenSetting: number = 1;
    chosenSection: number = 0;
    chosenUnit: string = '';

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
            this.mvpService.selectedManufactures$.asObservable().subscribe((ref) => {
                this.mvpService.closePopup();
            })
        );
    }

    resetData(): void {
        this.mainData = null;
        this.flowInAb = null;
        this.flowInVb = null;
        this.sectionsData = [];
        this.sectionsDataIzo = [];
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.loadState();
    }

    protected dataHandler(ref: ISOUOperationalAccountingSystem): void {
        this.mainData = ref;
        if (this.manufacture.length === 0) {
            this.manufacture = ref.referenceBook.manufacture;
            this.unit = ref.referenceBook.unit;
            this.loadState();
            if (this.selectedManufacture === undefined) {
                this.selectedManufacture = 0;
            }
        }

        if (ref?.section?.[0]?.name === 'АВТ-10-АБ' || ref?.section?.[0]?.name === 'АВТ-10-ВБ') {
            this.flowInAb = ref?.section[0]?.flowIn;
            this.flowInVb = ref?.section[1]?.flowIn;
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

            if (this.manufacture[this.selectedManufacture] === 'Товарное производство') {
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

    changeUnit(value: string): void {
        this.resetData();
        this.chosenUnit = value;
        let a = {
            manufacture: 'Производство №1',
            name: 'АВТ-10',
        };
        if (value) {
            a = {
                manufacture: this.manufacture[this.selectedManufacture],
                name: value,
            };
        }
        this.setWsOptions(a);
        this.mvpService.selectedOptions$.next({
            manufacture: a.manufacture,
            unit: a.name,
        });
    }

    stateController(): { save; load } {
        const key: string = 'sou-scheme-state';
        // tslint:disable-next-line:no-shadowed-variable
        const saveState = (state: { manufacture: number }): void => {
            const saveValue = JSON.stringify(state);
            localStorage.setItem(key, saveValue);
        };
        const loadState = (): { manufacture: number } => {
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
        this.selectedManufacture = res.manufacture;
    }

    findSection(selected: number): ISouSectionUI[] {
        let array: ISouSectionUI[];

        this.sections.forEach((value) => {
            value.find((el) => {
                if (el.manufacture === this.manufacture[selected]) {
                    array = value;
                }
            });
        });
        return array;
    }
}
