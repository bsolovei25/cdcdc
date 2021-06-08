import { Component, ChangeDetectionStrategy, AfterViewInit, OnInit, OnDestroy, Inject } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IComplex } from "@widgets/SUUTP/suutp-complexes/complexes.interface";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";
import { WidgetService } from "@dashboard/services/widget.service";

@Component({
    selector: 'evj-suutp-equipment-complexes',
    templateUrl: './complexes.component.html',
    styleUrls: ['./complexes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexesComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy, AfterViewInit {
    public dataSubject$: Subject<IComplex[]> = new Subject();
    public data$: Observable<IComplex[]> = this.dataSubject$.asObservable();

    constructor(
        protected widgetService: WidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public trackByIndex(index: number): number {
        return index;
    }

    protected dataHandler(ref: any): void {}

    public ngAfterViewInit(): void {
        this.dataSubject$.next([
            {
                title: 'Первичные индикаторы',
                indicators: [
                    {
                        count: 100,
                        planLimit: 0
                    },
                    {
                        count: 100,
                    },
                    {
                        count: 0,
                        errorLimit: 1,
                        greyColor: true
                    }
                ],
                data: [
                    {
                        title: 'ЭЛОУ АВТ-6',
                        isWarning: false,
                        col: 4,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'Висбрейкинг',
                        isWarning: false,
                        col: 4,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'ГФУ-2 блок очистки СГ',
                        isWarning: true,
                        col: 4,
                        indicator: {
                            count: 5,
                            errorLimit: 4,
                            greyColor: true
                        }
                    },
                    {
                        title: 'ГФУ-2 блок разделения',
                        isWarning: false,
                        col: 3,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'ГФУ-2 блок оч. газа Висбр.',
                        isWarning: false,
                        col: 3,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'УПБ',
                        isWarning: false,
                        col: 3,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'УПМБ',
                        isWarning: false,
                        col: 3,
                        indicator: {
                            count: 10,
                            errorLimit: 20,
                            greyColor: true
                        }
                    },
                ],
                chartPage: {
                    name: '',
                    title: '',
                    value: 100,
                    deviation: 0.5,
                    debalancePercent: 5,
                    dailyStatus: [{day: 1, status: "bad"}],
                    colorBounds: ['Red', 'Yellow', "Blue"],
                    bounds: [10, 50, 100, 200],
                    zeroOn: 'Left',
                    isWarning: false,
                    fact: 20,
                    plan: 100,
                    unit: 'шт',
                    type: '',
                }
            },
            {
                title: 'Переработ. бензиновых и дизельных фр.',
                indicators: [
                    {
                        count: 97,
                        planLimit: 0
                    },
                    {
                        count: 100,
                    },
                    {
                        count: 3,
                        errorLimit: 1,
                        greyColor: true
                    }
                ],
                data: [
                    {
                        title: 'УИЛН блок гидроочистки',
                        isWarning: true,
                        col: 4,
                        indicator: {
                            count: 21,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'УИЛН блок Penex',
                        isWarning: false,
                        col: 4,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'ЛЧ-35/11-1000',
                        isWarning: true,
                        col: 4,
                        indicator: {
                            count: 5,
                            errorLimit: 4,
                            greyColor: true
                        }
                    },
                    {
                        title: 'Л-24/5 ПБ',
                        isWarning: false,
                        col: 3,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'Л-24/5 ЛБ',
                        isWarning: false,
                        col: 3,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'ЛЧ-24/2000',
                        isWarning: false,
                        col: 3,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'КЦА',
                        isWarning: false,
                        col: 3,
                        indicator: {
                            count: 10,
                            errorLimit: 20,
                            greyColor: true
                        }
                    },
                ],
                chartPage: {
                    name: '',
                    title: '',
                    value: 100,
                    deviation: 0.5,
                    debalancePercent: 5,
                    dailyStatus: [{day: 1, status: "bad"}],
                    colorBounds: ['Red', 'Yellow', "Blue"],
                    bounds: [10, 50, 100, 200],
                    zeroOn: 'Left',
                    isWarning: false,
                    fact: 20,
                    plan: 100,
                    unit: 'шт',
                    type: '',
                }
            },
            {
                title: 'Каталитический крекинг',
                indicators: [
                    {
                        count: 100,
                        planLimit: 0
                    },
                    {
                        count: 100,
                    },
                    {
                        count: 0,
                        errorLimit: 1,
                        greyColor: true
                    }
                ],
                data: [
                    {
                        title: 'Г-43-107 с.100',
                        isWarning: false,
                        col: 4,
                        indicator: {
                            count: 3,
                            errorLimit: 5,
                            greyColor: true
                        }
                    },
                    {
                        title: 'Г-43-107 с.200',
                        isWarning: false,
                        col: 4,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'ГОБКК',
                        isWarning: false,
                        col: 4,
                        indicator: {
                            count: 5,
                            errorLimit: 10,
                            greyColor: true
                        }
                    },
                    {
                        title: 'УПС',
                        isWarning: false,
                        col: 3,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'МТБЭ',
                        isWarning: false,
                        col: 3,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'УПВ',
                        isWarning: false,
                        col: 3,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'ТАМЭ',
                        isWarning: false,
                        col: 3,
                        indicator: {
                            count: 10,
                            errorLimit: 20,
                            greyColor: true
                        }
                    },
                ],
                chartPage: {
                    name: '',
                    title: '',
                    value: 100,
                    deviation: 0.5,
                    debalancePercent: 5,
                    dailyStatus: [{day: 1, status: "bad"}],
                    colorBounds: ['Red', 'Yellow', "Blue"],
                    bounds: [10, 50, 100, 200],
                    zeroOn: 'Left',
                    isWarning: false,
                    fact: 20,
                    plan: 100,
                    unit: 'шт',
                    type: '',
                }
            },
            {
                title: 'КУПН',
                indicators: [
                    {
                        count: 100,
                        planLimit: 0
                    },
                    {
                        count: 100,
                    },
                    {
                        count: 0,
                        errorLimit: 1,
                        greyColor: true
                    }
                ],
                data: [
                    {
                        title: 'с.100 КУПН',
                        isWarning: true,
                        col: 6,
                        indicator: {
                            count: 3,
                            errorLimit: 3,
                            greyColor: true
                        }
                    },
                    {
                        title: 'с.200 КУПН',
                        isWarning: false,
                        col: 6,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                    {
                        title: 'с.300 КУПН',
                        isWarning: false,
                        col: 6,
                        indicator: {
                            count: 0,
                            errorLimit: 10,
                            greyColor: true
                        }
                    },
                    {
                        title: 'с.400 КУПН',
                        isWarning: false,
                        col: 6,
                        indicator: {
                            count: 0,
                            errorLimit: 1,
                            greyColor: true
                        }
                    },
                ],
                chartPage: {
                    name: '',
                    title: '',
                    value: 100,
                    deviation: 0.5,
                    debalancePercent: 5,
                    dailyStatus: [{day: 1, status: "bad"}],
                    colorBounds: ['Red', 'Yellow', "Blue"],
                    bounds: [10, 50, 100, 200],
                    zeroOn: 'Left',
                    isWarning: false,
                    fact: 20,
                    plan: 100,
                    unit: 'шт',
                    type: '',
                }
            }
        ]);
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
