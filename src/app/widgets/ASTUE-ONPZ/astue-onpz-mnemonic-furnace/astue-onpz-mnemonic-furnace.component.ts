import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
    AstueOnpzMnemonicFurnaceElementType,
    AstueOnpzMnemonicFurnaceRectType,
    AstueOnpzMnemonicFurnaceStreamStatsType,
    IAstueOnpzMnemonicFurnace,
    IAstueOnpzMnemonicFurnaceBlock,
    IAstueOnpzMnemonicFurnaceCircle,
    IAstueOnpzMnemonicFurnaceLine,
    IAstueOnpzMnemonicFurnaceResponse,
    IAstueOnpzMnemonicFurnaceResponseGroup,
    IAstueOnpzMnemonicFurnaceResponseGroupData,
    IAstueOnpzMnemonicFurnaceResponseOven,
    IAstueOnpzMnemonicFurnaceSelectReferences,
    IAstueOnpzMnemonicFurnaceStreamStats,
} from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-mnemonic-furnace.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { AsyncRender } from '@shared/functions/async-render.function';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { FormControl } from '@angular/forms';
import { filter, map, takeUntil } from 'rxjs/operators';
import { AstueOnpzMnemonicFurnaceService } from './astue-onpz-mnemonic-furnace.service';
import { SOURCE_DATA } from './astue-onpz-mnemonic-furnace.mock';
import { ScreenshotMaker } from '@core/classes/screenshot.class';
import { ReportsService } from '../../../dashboard/services/widgets/admin-panel/reports.service';

interface IAstueOnpzMnemonicFurnacePopup extends IAstueOnpzMnemonicFurnaceStreamStats {
    side: 'left' | 'right' | 'center';
}

@Component({
    selector: 'evj-astue-onpz-mnemonic-furnace',
    templateUrl: './astue-onpz-mnemonic-furnace.component.html',
    styleUrls: ['./astue-onpz-mnemonic-furnace.component.scss'],
    animations: [
        trigger('inOutAnimation', [
            transition(':enter', [style({ opacity: 0 }), animate('.2s ease-out', style({ opacity: 1 }))]),
            transition(':leave', [style({ opacity: 1 }), animate('.2s ease-in', style({ opacity: 0 }))]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AstueOnpzMnemonicFurnaceComponent extends WidgetPlatform implements OnInit, OnDestroy {
    @ViewChild('schema') public schemaContainer: ElementRef;
    private readonly defaultSchemaSize: { x: number; y: number } = {
        x: 1483,
        y: 655,
    };
    public schemeStyle: string = '';

    public selectReferences: BehaviorSubject<IAstueOnpzMnemonicFurnaceSelectReferences> = new BehaviorSubject<IAstueOnpzMnemonicFurnaceSelectReferences>(
        null
    );

    public selectManufacture: FormControl = new FormControl({ value: '', disabled: false });
    public selectUnit: FormControl = new FormControl({ value: '', disabled: false });
    public selectOven: FormControl = new FormControl({ value: '', disabled: false });

    private onDestroy: Subject<void> = new Subject<void>();

    @HostListener('document:resize', ['$event'])
    public onResize(): void {
        this.resize();
    }

    public popupData$: BehaviorSubject<IAstueOnpzMnemonicFurnacePopup> = new BehaviorSubject<IAstueOnpzMnemonicFurnacePopup>(
        null
    );
    public data: BehaviorSubject<IAstueOnpzMnemonicFurnace> = new BehaviorSubject<IAstueOnpzMnemonicFurnace>(null);

    constructor(
        private reportService: ReportsService,
        private mnemonicFurnaceService: AstueOnpzMnemonicFurnaceService,
        private changeDetector: ChangeDetectorRef,
        public widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
        mnemonicFurnaceService.furnaceOptionsReferences = this.selectReferences;
        this.mnemonicFurnaceService.furnaceOptions$ = combineLatest([
            this.selectManufacture.valueChanges,
            this.selectUnit.valueChanges,
            this.selectOven.valueChanges,
        ]).pipe(map((x) => ({ manufactureId: x[0], unitId: x[1], ovenId: x[2] })));
    }

    ngOnInit(): void {
        super.widgetInit();

        // TODO: for next develop
        // this.data.next(SOURCE_DATA);
        // this.resize();

        this.selectManufacture.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value) => {
            this.selectUnit.setValue('');
        });
        this.selectUnit.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value) => {
            this.selectOven.setValue('');
        });
        this.selectOven.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value) => {
            this.setOptions(value);
        });

        this.mnemonicFurnaceService.selectedItem$.pipe(takeUntil(this.onDestroy)).subscribe((ref) => {
            const data = this.data.getValue();
            if (!data) {
                return;
            }
            switch (ref) {
                case data.dischargeStats?.main?.id ?? -1:
                    this.popupData$.next({ ...data.dischargeStats, side: 'right' });
                    break;
                case data.gasStats?.main?.id ?? -1:
                    this.popupData$.next({ ...data.gasStats, side: 'left' });
                    break;
                default:
                    this.popupData$.next(null);
                    break;
            }
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.mnemonicFurnaceService.selectedItem$.next(null);
    }

    @AsyncRender
    private resize(): void {
        const scaleY =
            (this.schemaContainer?.nativeElement?.offsetHeight ?? this.defaultSchemaSize.y) / this.defaultSchemaSize.y;
        const scaleX =
            (this.schemaContainer?.nativeElement?.offsetWidth ?? this.defaultSchemaSize.x) / this.defaultSchemaSize.x;
        const scale: number = scaleX < scaleY ? scaleX : scaleY;
        this.schemeStyle = `transform: translate(-50%, -50%) scale(${scale})`;
        this.changeDetector.detectChanges();
    }

    public manufacturesSelects$: Observable<{ id: string; title: string }[]> = this.selectReferences.pipe(
        filter((x) => x != null),
        map((x) => x.manufactures?.map((m) => ({ id: m.id, title: m.title })) ?? [])
    );

    public unitsSelects$: Observable<{ id: string; title: string }[]> = combineLatest([
        this.selectReferences.asObservable(),
        this.selectManufacture.valueChanges,
    ]).pipe(
        filter((x) => x[0] !== null),
        map((x) => {
            if (x[1] === '') {
                return [];
            }
            return (
                x[0]?.manufactures.find((m) => m?.id === x[1])?.units?.map((u) => ({ id: u.id, title: u.title })) ?? []
            );
        })
    );

    public ovensSelects$: Observable<{ id: string; title: string }[]> = combineLatest([
        this.selectReferences.asObservable(),
        this.selectManufacture.valueChanges,
        this.selectUnit.valueChanges,
    ]).pipe(
        filter((x) => x[0] !== null),
        map((x) => {
            if (x[2] === '' || x[1] === '') {
                return [];
            }
            return (
                x[0].manufactures
                    .find((m) => m.id === x[1])
                    .units.find((u) => u.id === x[2])
                    ?.ovens?.map((o) => ({ id: o.id, title: o.title })) ?? []
            );
        })
    );

    protected dataHandler(ref: unknown): void {
        if (!ref.hasOwnProperty('id')) {
            this.selectReferences.next(
                this.referenceMapping(ref as { manufactures: IAstueOnpzMnemonicFurnaceResponse[] })
            );
            this.setData();
        } else {
            this.setData(ref as IAstueOnpzMnemonicFurnaceResponseOven);
        }
    }

    private setOptions(ovenId: string): void {
        this.setWsOptions({ ovenId });
    }

    private setData(ref: IAstueOnpzMnemonicFurnaceResponseOven = null): void {
        this.data.next(this.ovenMapping(ref));
        this.resize();
    }

    // private setData(responseData: { manufactures: IAstueOnpzMnemonicFurnaceResponse[] }): void {
    //     // return;
    //     if (!this.selectOven.value) {
    //         this.data.next(null);
    //         return;
    //     }
    //     const currentData = responseData.manufactures
    //         .find((x) => x.id === this.selectManufacture.value)
    //         .units.find((x) => x.id === this.selectUnit.value)
    //         .ovens.find((x) => x.id === this.selectOven.value);
    //     this.data.next(this.ovenMapping(currentData));
    //     this.resize();
    // }

    private referenceMapping = (ref: {
        manufactures: IAstueOnpzMnemonicFurnaceResponse[];
    }): IAstueOnpzMnemonicFurnaceSelectReferences => {
        return {
            manufactures: ref.manufactures
                .filter((m) => !!m.id)
                .map((m) => {
                    return {
                        id: m.id,
                        title: m.description,
                        units: m.units
                            .filter((u) => !!u.id)
                            .map((u) => {
                                return {
                                    id: u.id,
                                    title: u.description,
                                    ovens: u.ovens
                                        .filter((o) => !!o.id)
                                        .map((o) => {
                                            return {
                                                id: o.id,
                                                title: o.name,
                                            };
                                        }),
                                };
                            }),
                    };
                }),
        };
    };

    private ovenMapping(currentData: IAstueOnpzMnemonicFurnaceResponseOven): IAstueOnpzMnemonicFurnace {
        const lineConstructor = (
            x: IAstueOnpzMnemonicFurnaceResponseGroupData,
            type: 'inputOilBlock' | 'inputGasBlock' | 'inputLiquidBlock' | 'outputBlock',
            i: number
        ): IAstueOnpzMnemonicFurnaceLine[] => {
            const line: IAstueOnpzMnemonicFurnaceLine[] = [];
            switch (type) {
                case 'inputOilBlock':
                    line.push({
                        type: AstueOnpzMnemonicFurnaceElementType.Rect,
                        data: {
                            count: (i + 1).toString(),
                            title: '??????????',
                            value: x.value,
                            unit: x.units,
                            type: AstueOnpzMnemonicFurnaceRectType.Full,
                            streamType: x.isDeviation
                                ? AstueOnpzMnemonicFurnaceStreamStatsType.Deviation
                                : AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
                        },
                    });
                    break;
                case 'inputGasBlock':
                case 'inputLiquidBlock':
                    line.push({
                        type: AstueOnpzMnemonicFurnaceElementType.Rect,
                        data: {
                            title: x.name,
                            value: x.value,
                            unit: x.units,
                            type: AstueOnpzMnemonicFurnaceRectType.Value,
                            streamType: x.isDeviation
                                ? AstueOnpzMnemonicFurnaceStreamStatsType.Deviation
                                : AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
                        },
                    });
                    break;
                case 'outputBlock':
                    line.push(
                        {
                            type: AstueOnpzMnemonicFurnaceElementType.Rect,
                            data: {
                                count: (i + 1).toString(),
                                title: '??????????',
                                type: AstueOnpzMnemonicFurnaceRectType.Stream,
                                streamType: x.isDeviation
                                    ? AstueOnpzMnemonicFurnaceStreamStatsType.Deviation
                                    : AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
                            },
                        },
                        {
                            type: AstueOnpzMnemonicFurnaceElementType.Circle,
                            data: {
                                id: x.id,
                                value: x.value,
                                unit: x.units,
                                streamType: x?.isDeviation
                                    ? AstueOnpzMnemonicFurnaceStreamStatsType.Deviation
                                    : AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
                            },
                        }
                    );
                    break;
            }
            if (x.temp && type !== 'outputBlock') {
                line.push({
                    type: AstueOnpzMnemonicFurnaceElementType.Circle,
                    data: {
                        id: x.temp.id,
                        value: x.temp.value,
                        unit: x.temp.units,
                        streamType: x.temp?.isDeviation
                            ? AstueOnpzMnemonicFurnaceStreamStatsType.Deviation
                            : AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
                    } as IAstueOnpzMnemonicFurnaceCircle,
                });
            }
            if (x.pressure) {
                line.push({
                    type: AstueOnpzMnemonicFurnaceElementType.Quad,
                    data: {
                        value: x.pressure.value,
                        unit: x.pressure.units,
                        streamType: x.pressure?.isDeviation
                            ? AstueOnpzMnemonicFurnaceStreamStatsType.Deviation
                            : AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
                    },
                });
            }
            return line;
        };

        if (!currentData) {
            return null;
        }

        const sortedProperty: (keyof IAstueOnpzMnemonicFurnaceResponseOven)[] = [
            'inputOil',
            'inputGaz',
            'liquidFuel',
            'outputGaz',
            'outputRaw',
        ];
        sortedProperty.forEach((x) => {
            (currentData[x] as IAstueOnpzMnemonicFurnaceResponseGroup).item.sort((a, b) => +a.code - +b.code);
        });

        const inputOilBlock: IAstueOnpzMnemonicFurnaceBlock = {
            title: '???????????????? ?????????????????????????? ??????????',
            lines: [],
        };
        const inputGasBlock: IAstueOnpzMnemonicFurnaceBlock = {
            title: '???????????????? ???????????????? ??????',
            lines: [],
        };
        const inputLiquidBlock: IAstueOnpzMnemonicFurnaceBlock = {
            title: '???????????? ??????????????',
            lines: [],
        };
        const outputBlock: IAstueOnpzMnemonicFurnaceBlock = {
            title: '?????????????????? ??????????',
            lines: [],
        };
        const unitTitle: string = currentData.name;
        inputOilBlock.lines.push([
            {
                type: AstueOnpzMnemonicFurnaceElementType.Rect,
                data: {
                    count: '??',
                    title: '??????????????',
                    value: currentData.inputOil?.value,
                    unit: currentData.inputOil?.unit,
                    type: AstueOnpzMnemonicFurnaceRectType.Full,
                },
            },
            {
                type: AstueOnpzMnemonicFurnaceElementType.Circle,
                data: {
                    id: currentData.inputOil?.temp?.id,
                    value: currentData.inputOil?.temp?.value,
                    unit: currentData.inputOil?.temp?.units,
                    streamType: currentData.inputOil?.temp?.isDeviation
                        ? AstueOnpzMnemonicFurnaceStreamStatsType.Deviation
                        : AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
                },
            },
        ]);
        currentData.inputOil.item.forEach((x, i) => {
            inputOilBlock.lines.push(lineConstructor(x, 'inputOilBlock', i));
        });
        currentData.inputGaz.item.forEach((x, i) => {
            inputGasBlock.lines.push(lineConstructor(x, 'inputGasBlock', i));
        });
        currentData.liquidFuel.item.forEach((x, i) => {
            inputLiquidBlock.lines.push(lineConstructor(x, 'inputLiquidBlock', i));
        });
        currentData.outputRaw.item.forEach((x, i) => {
            outputBlock.lines.push(lineConstructor(x, 'outputBlock', i));
        });

        const dischargeStats = {
            title: '????????????????????',
            main: {
                id: currentData.rarefaction.id ?? null,
                value: currentData.rarefaction.value,
                unit: currentData.rarefaction.unit,
                streamType: !!currentData.rarefaction.item.find((x) => x.isDeviation)
                    ? AstueOnpzMnemonicFurnaceStreamStatsType.Deviation
                    : AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
            },
            streams: currentData.rarefaction.item.map((x) => {
                return {
                    value: x.value,
                    streamType: x.isDeviation
                        ? AstueOnpzMnemonicFurnaceStreamStatsType.Deviation
                        : AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
                };
            }),
        };
        const gasStats = {
            title: '???????????????? ????????',
            main: {
                id: currentData.outputGaz.id ?? null,
                value: currentData.outputGaz.value,
                unit: currentData.outputGaz.unit,
                streamType: !!currentData.outputGaz.item.find((x) => x.isDeviation)
                    ? AstueOnpzMnemonicFurnaceStreamStatsType.Deviation
                    : AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
            },
            streams: currentData.outputGaz.item.map((x) => {
                return {
                    value: x.value,
                    streamType: x.isDeviation
                        ? AstueOnpzMnemonicFurnaceStreamStatsType.Deviation
                        : AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
                };
            }),
        };

        const oxygenStats = {
            title: '???????????????? ????????',
            main: {
                id: currentData.outputOxygen?.id ?? null,
                value: currentData.outputOxygen?.value,
                unit: currentData.outputOxygen?.unit,
                streamType: !!currentData.outputOxygen?.item?.find((x) => x.isDeviation)
                    ? AstueOnpzMnemonicFurnaceStreamStatsType.Deviation
                    : AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
            },
            streams: currentData.outputOxygen?.item?.map((x) => {
                return {
                    value: x.value,
                    streamType: x.isDeviation
                        ? AstueOnpzMnemonicFurnaceStreamStatsType.Deviation
                        : AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
                };
            }),
        };

        return {
            inputOilBlock,
            inputGasBlock,
            inputLiquidBlock,
            outputBlock,
            unitTitle,
            gasStats,
            dischargeStats,
            oxygenStats,
        };
    }

    public async takeScreenshot(): Promise<void> {
        if (!this.schemaContainer?.nativeElement) {
            return;
        }
        const screenshotHelper = new ScreenshotMaker();
        const screenshot = await screenshotHelper.takeScreenshot(this.schemaContainer.nativeElement, false);
        await this.reportService.sendScreenshot(screenshot);
    }
}
