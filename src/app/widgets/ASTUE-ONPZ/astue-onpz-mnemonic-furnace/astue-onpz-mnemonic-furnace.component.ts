import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Inject,
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
import { SOURCE_DATA } from './astue-onpz-mnemonic-furnace.mock';
import { AstueOnpzMnemonicFurnaceService } from './astue-onpz-mnemonic-furnace.service';

interface IAstueOnpzMnemonicFurnacePopup extends IAstueOnpzMnemonicFurnaceStreamStats {
    side: 'left' | 'right';
}

@Component({
    selector: 'evj-astue-onpz-mnemonic-furnace',
    templateUrl: './astue-onpz-mnemonic-furnace.component.html',
    styleUrls: ['./astue-onpz-mnemonic-furnace.component.scss'],
    animations: [
        trigger('inOutAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('.2s ease-out', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                style({ opacity: 1 }),
                animate('.2s ease-in', style({ opacity: 0 })),
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AstueOnpzMnemonicFurnaceComponent extends WidgetPlatform implements OnInit {
    @ViewChild('schema') public schemaContainer: ElementRef;
    private readonly defaultSchemaSize: { x: number; y: number } = {
        x: 1483,
        y: 655,
    };
    public schemeStyle: string = '';

    public selectReferences: BehaviorSubject<
        IAstueOnpzMnemonicFurnaceSelectReferences
    > = new BehaviorSubject<IAstueOnpzMnemonicFurnaceSelectReferences>(null);

    public selectManufacture: FormControl = new FormControl({ value: '', disabled: false });
    public selectUnit: FormControl = new FormControl({ value: '', disabled: false });
    public selectOven: FormControl = new FormControl({ value: '', disabled: false });

    private onDestroy: Subject<void> = new Subject<void>();

    @HostListener('document:resize', ['$event'])
    public onResize(): void {
        this.resize();
    }

    public popupData$: BehaviorSubject<IAstueOnpzMnemonicFurnacePopup> = new BehaviorSubject<
        IAstueOnpzMnemonicFurnacePopup
    >(null);
    public data: BehaviorSubject<IAstueOnpzMnemonicFurnace> = new BehaviorSubject<
        IAstueOnpzMnemonicFurnace
    >(null);
    private responseData: { manufactures: IAstueOnpzMnemonicFurnaceResponse[] } = null;

    constructor(
        private mnemonicFurnaceService: AstueOnpzMnemonicFurnaceService,
        private changeDetector: ChangeDetectorRef,
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
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
            this.setData();
        });

        this.mnemonicFurnaceService.selectedItem$
            .pipe(takeUntil(this.onDestroy))
            .subscribe((ref) => {
                const data = this.data.getValue();
                if (!data) {
                    return;
                }
                switch (ref) {
                    case data.dischargeStats?.main.id:
                        this.popupData$.next({ ...data.dischargeStats, side: 'right' });
                        break;
                    case data.gasStats?.main.id:
                        this.popupData$.next({ ...data.gasStats, side: 'left' });
                        break;
                    default:
                        this.popupData$.next(null);
                        break;
                }
            });
    }

    @AsyncRender
    private resize(): void {
        const scaleY =
            (this.schemaContainer?.nativeElement?.offsetHeight ?? this.defaultSchemaSize.y) /
            this.defaultSchemaSize.y;
        const scaleX =
            (this.schemaContainer?.nativeElement?.offsetWidth ?? this.defaultSchemaSize.x) /
            this.defaultSchemaSize.x;
        const scale: number = scaleX < scaleY ? scaleX : scaleY;
        this.schemeStyle = `transform: translate(-50%, -50%) scale(${scale})`;
        this.changeDetector.detectChanges();
    }

    public manufacturesSelects$: Observable<string[]> = this.selectReferences.pipe(
        filter((x) => x != null),
        map((x) => x.manufactures?.map((m) => m.title) ?? [])
    );

    public unitsSelects$: Observable<string[]> = combineLatest([
        this.selectReferences.asObservable(),
        this.selectManufacture.valueChanges,
    ]).pipe(
        filter((x) => x[0] !== null),
        map((x) => {
            if (x[1] === '') {
                return [];
            }
            return (
                x[0]?.manufactures.find((m) => m?.title === x[1])?.units?.map((u) => u?.title) ?? []
            );
        })
    );

    public ovensSelects$: Observable<string[]> = combineLatest([
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
                    .find((m) => m.title === x[1])
                    .units.find((u) => u.title === x[2])
                    ?.ovens?.map((o) => o?.title) ?? []
            );
        })
    );

    protected dataHandler(ref: { manufactures: IAstueOnpzMnemonicFurnaceResponse[] }): void {
        this.selectReferences.next(this.referenceMapping(ref));
        this.responseData = ref;
        this.setData();
    }

    private setData(): void {
        // return;
        if (!this.selectOven.value) {
            this.data.next(null);
            return;
        }
        const currentData = this.responseData.manufactures
            .find((x) => x.description === this.selectManufacture.value)
            .units.find((x) => x.description === this.selectUnit.value)
            .ovens.find((x) => x.name === this.selectOven.value);
        this.data.next(this.ovenMapping(currentData));
        this.resize();
    }

    private referenceMapping = (ref: {
        manufactures: IAstueOnpzMnemonicFurnaceResponse[];
    }): IAstueOnpzMnemonicFurnaceSelectReferences => {
        return {
            manufactures: ref.manufactures.map((m) => {
                return {
                    title: m.description,
                    units: m.units.map((u) => {
                        return {
                            title: u.description,
                            ovens: u.ovens.map((o) => {
                                return {
                                    title: o.name,
                                };
                            }),
                        };
                    }),
                };
            }),
        };
    };

    private ovenMapping(
        currentData: IAstueOnpzMnemonicFurnaceResponseOven
    ): IAstueOnpzMnemonicFurnace {
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
                            title: 'поток',
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
                                title: 'поток',
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
                                streamType: x.temp?.isDeviation
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
                        id: x.id,
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
                        value: x.temp.value,
                        unit: x.temp.units,
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

        const inputOilBlock: IAstueOnpzMnemonicFurnaceBlock = {
            title: 'Входящая отбензиненная нефть',
            lines: [],
        };
        const inputGasBlock: IAstueOnpzMnemonicFurnaceBlock = {
            title: 'Входящий толивный газ',
            lines: [],
        };
        const inputLiquidBlock: IAstueOnpzMnemonicFurnaceBlock = {
            title: 'Жидкое топливо',
            lines: [],
        };
        const outputBlock: IAstueOnpzMnemonicFurnaceBlock = {
            title: 'Выходящее сырье',
            lines: [],
        };
        const unitTitle: string = currentData.name;
        inputOilBlock.lines.push([
            {
                type: AstueOnpzMnemonicFurnaceElementType.Rect,
                data: {
                    count: 'Σ',
                    title: 'потоков',
                    value: currentData.inputOil?.value,
                    unit: currentData.inputOil?.unit,
                    type: AstueOnpzMnemonicFurnaceRectType.Full,
                },
            },
        ]);
        outputBlock.lines.push([
            {
                type: AstueOnpzMnemonicFurnaceElementType.Rect,
                data: {
                    count: 'Σ',
                    title: 'потоков',
                    type: AstueOnpzMnemonicFurnaceRectType.Stream,
                },
            },
            {
                type: AstueOnpzMnemonicFurnaceElementType.Circle,
                data: {
                    value: currentData.outputRaw?.value,
                    unit: currentData.outputRaw?.unit,
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
            title: 'Разряжение',
            main: {
                id: currentData.rarefaction.item[0]?.id ?? null, // TODO: add normal id
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
            title: 'Уходящие газы',
            main: {
                id: currentData.outputGaz.item[0]?.id ?? null, // TODO: add normal id
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

        return {
            inputOilBlock,
            inputGasBlock,
            inputLiquidBlock,
            outputBlock,
            unitTitle,
            gasStats,
            dischargeStats,
        };
    }
}
