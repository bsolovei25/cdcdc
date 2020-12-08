import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    Inject,
    OnInit,
    ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
    AstueOnpzMnemonicFurnaceElementType,
    AstueOnpzMnemonicFurnaceRectType,
    IAstueOnpzMnemonicFurnace,
    IAstueOnpzMnemonicFurnaceBlock,
    IAstueOnpzMnemonicFurnaceResponse,
    IAstueOnpzMnemonicFurnaceStreamStats,
} from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-mnemonic-furnace.model';
import { SOURCE_DATA } from './astue-onpz-mnemonic-furnace.mock';
import { animate, style, transition, trigger } from '@angular/animations';
import { AsyncRender } from '@shared/functions/async-render.function';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

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
})
export class AstueOnpzMnemonicFurnaceComponent extends WidgetPlatform implements OnInit {
    @ViewChild('schema') public schemaContainer: ElementRef;
    private readonly defaultSchemaSize: { x: number; y: number } = {
        x: 1483,
        y: 655,
    };
    public schemeStyle: string = '';

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

    constructor(
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
        this.data.next(SOURCE_DATA);
        this.resize();
    }

    public topCircleClick(
        data: IAstueOnpzMnemonicFurnaceStreamStats,
        side: 'left' | 'right'
    ): void {
        if (this.popupData$.getValue()?.side === side) {
            this.popupData$.next(null);
            return;
        }
        this.popupData$.next({ ...data, side });
        console.log(this.popupData$.getValue());
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

    protected dataHandler(ref: { manufactures: IAstueOnpzMnemonicFurnaceResponse[] }): void {
        console.log(ref);
        // return;
        const response = ref.manufactures[0];
        const currentData = response.units[0].ovens[0];
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
        inputOilBlock.lines.push([
            {
                type: AstueOnpzMnemonicFurnaceElementType.Rect,
                data: {
                    count: 'Σ',
                    title: 'потоков',
                    value: currentData.inputOil.map((x) => x.value).reduce((a, b) => a + b),
                    unit: 'м/с',
                    type: AstueOnpzMnemonicFurnaceRectType.Full,
                },
            },
        ]);
        currentData.inputOil.forEach((x, i) => {
            inputOilBlock.lines.push([
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        count: (i + 1).toString(),
                        title: 'поток',
                        value: x.value,
                        unit: 'м/с',
                        type: AstueOnpzMnemonicFurnaceRectType.Full,
                    },
                },
            ]);
        });
        currentData.inputGaz.forEach((x, i) => {
            inputGasBlock.lines.push([
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        title: x.name,
                        value: x.value,
                        unit: 'м³/с',
                        type: AstueOnpzMnemonicFurnaceRectType.Value,
                    },
                },
            ]);
        });
        currentData.liquidFuel.forEach((x, i) => {
            inputLiquidBlock.lines.push([
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        title: x.name,
                        value: x.value,
                        unit: 'м³/с',
                        type: AstueOnpzMnemonicFurnaceRectType.Value,
                    },
                },
            ]);
        });
        currentData.outputRaw.forEach((x, i) => {
            outputBlock.lines.push([
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        count: (i + 1).toString(),
                        title: 'поток',
                        type: AstueOnpzMnemonicFurnaceRectType.Stream,
                    },
                },
            ]);
        });

        this.data.next({
            ...this.data.value,
            inputOilBlock,
            inputGasBlock,
            inputLiquidBlock,
            outputBlock,
        });
    }
}
