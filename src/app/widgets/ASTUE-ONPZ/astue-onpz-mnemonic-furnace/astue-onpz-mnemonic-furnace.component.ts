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
    IAstueOnpzMnemonicFurnace,
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
        this.isRealtimeData = false;
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

    protected dataHandler(ref: unknown): void {}
}
