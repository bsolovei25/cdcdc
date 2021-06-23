import {
    Component,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    Renderer2,
    OnChanges,
    OnDestroy,
} from '@angular/core';
import { IChartMini } from '../../interfaces/smart-scroll.model';

@Component({
    selector: 'evj-vertical-smart-scroll',
    templateUrl: './vertical-smart-scroll.component.html',
    styleUrls: ['./vertical-smart-scroll.component.scss'],
})
export class VerticalSmartScrollComponent implements AfterViewInit, OnChanges, OnDestroy {
    @Input() private sbThumbHeight: number = 40; // высота бегунка в процентах
    @Input() private sbThumbTop: number = 40; // положение левой части скролла в процентах
    @Input() public data: IChartMini[] = [
        { value: 7, timeStamp: new Date(2020, 3, 1) },
        { value: 2, timeStamp: new Date(2020, 3, 2) },
        { value: -3, timeStamp: new Date(2020, 3, 3) },
        { value: 5, timeStamp: new Date(2020, 3, 4) },
        { value: 1, timeStamp: new Date(2020, 3, 5) },
        { value: 8, timeStamp: new Date(2020, 3, 6) },
        { value: 7, timeStamp: new Date(2020, 3, 7) },
    ];
    @Input() public limits: {fromValue: number; toValue: number} = null;

    @Output() private sbThumbHeightChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() private sbThumbTopChange: EventEmitter<number> = new EventEmitter<number>();

    @ViewChild('sbThumb') private sbThumb: ElementRef;
    @ViewChild('sbThumbBody') private sbThumbBody: ElementRef;
    @ViewChild('sbTrack') private sbTrack: ElementRef;
    @ViewChild('resizerTop') private resizerTop: ElementRef;
    @ViewChild('resizerBottom') private resizerBottom: ElementRef;
    @ViewChild('btnTop') private btnTop: ElementRef;
    @ViewChild('btnBottom') private btnBottom: ElementRef;

    private sbThumbCoords: DOMRect;
    private sbTrackCoords: DOMRect;

    private thumbHeight: number = 20;

    private beginCoordThumb: number = 0;
    private startPointFromTop: number = 0;

    private eventListener: () => void = null;

    readonly defaultDisplacement: number = 20;

    constructor(private renderer: Renderer2) {}

    public ngOnChanges(): void {
        if (this.sbTrack?.nativeElement) {
            this.setThumbHeight(this.sbThumbHeight);
            this.setScrollbarTopPosition(this.sbThumbTop);
        }
    }

    public ngAfterViewInit(): void {
        this.eventListener = this.eventsListenFn();

        this.updateCoords();

        this.setThumbHeight(this.sbThumbHeight);
        this.setScrollbarTopPosition(this.sbThumbTop);
    }

    public ngOnDestroy(): void {
        if (this.eventListener) {
            this.eventListener();
        }
    }

    // Функция, отлавливающая события
    private eventsListenFn(): () => void {
        const eventListeners: (() => void)[] = [];

        let listeningMouseMove: () => void = null;
        let listeningMouseMoveResizerBottom: () => void = null;
        let listeningMouseMoveResizerTop: () => void = null;

        this.sbThumb.nativeElement.ondragstart = () => false;

        eventListeners.push(
            // движение скролла
            this.renderer.listen(this.sbThumbBody.nativeElement, 'mousedown', (event: MouseEvent) => {
                this.beginCoordThumb = event.clientY;
                if (this.sbThumb.nativeElement.style.top) {
                    this.startPointFromTop = +this.sbThumb.nativeElement.style.top.slice(0, -1);
                }
                listeningMouseMove = this.renderer.listen(document, 'mousemove', this.onMouseMove.bind(this));
            }),

            // ресайз скролла сверху
            this.renderer.listen(this.resizerTop.nativeElement, 'mousedown', (event: MouseEvent) => {
                this.beginCoordThumb = event.clientY;
                this.changePositionSides(true);
                listeningMouseMoveResizerTop = this.renderer.listen(
                    document,
                    'mousemove',
                    (mouseEvent: MouseEvent) => {
                        this.onResizeThumb(mouseEvent, 'top');
                    }
                );
            }),

            // ресайз скролла снизу
            this.renderer.listen(this.resizerBottom.nativeElement, 'mousedown', (event: MouseEvent) => {
                this.beginCoordThumb = event.clientY;
                listeningMouseMoveResizerBottom = this.renderer.listen(
                    document,
                    'mousemove',
                    (mouseEvent: MouseEvent) => {
                        this.onResizeThumb(mouseEvent, 'bottom');
                    }
                );
            }),

            // поднятие клавиши и отписка от событий
            this.renderer.listen(document, 'mouseup', () => {
                if (listeningMouseMove) {
                    listeningMouseMove();
                    listeningMouseMove = null;

                    const top: number = +this.sbThumb.nativeElement.style.left.slice(0, -1);
                    this.sbThumbTopChange.emit(top);
                }
                if (listeningMouseMoveResizerTop) {
                    listeningMouseMoveResizerTop();
                    listeningMouseMoveResizerTop = null;

                    this.sbThumbHeightChange.emit(this.thumbHeight);

                    const bottom: number = +this.sbThumb.nativeElement.style.bottom.slice(0, -1);
                    const height: number = +this.sbThumb.nativeElement.style.height.slice(0, -1);
                    this.changePositionSides(false);

                    const top: number = 100 - height - bottom;
                    this.sbThumbTopChange.emit(top);
                }
                if (listeningMouseMoveResizerBottom) {
                    listeningMouseMoveResizerBottom();
                    listeningMouseMoveResizerBottom = null;

                    this.sbThumbHeightChange.emit(this.thumbHeight);
                }
            }),

            // нажатие кнопки слева
            this.renderer.listen(this.btnTop.nativeElement, 'click', () => {
                this.startPointFromTop = +this.sbThumb.nativeElement.style.top.slice(0, -1);
                this.onButtonClick(true);
            }),

            // нажатие кнопки справа
            this.renderer.listen(this.btnBottom.nativeElement, 'click', () => {
                this.startPointFromTop = +this.sbThumb.nativeElement.style.top.slice(0, -1);
                this.onButtonClick(false);
            })
        );

        // повторный вызов функции для завершения прослушивания событий
        return () => {
            eventListeners.forEach((func) => func());
        };
    }

    //#region SUPPORT
    // обновить координаты скролла и дорожки
    private updateCoords(): void {
        this.sbThumbCoords = this.sbThumb.nativeElement.getBoundingClientRect();
        this.sbTrackCoords = this.sbTrack.nativeElement.getBoundingClientRect();
    }

    // изменение сторон абсолютного позиционирования
    private changePositionSides(topToBottom: boolean): void {
        this.updateCoords();

        let px: number;
        let firstSide: 'top' | 'bottom';
        let secondSide: 'top' | 'bottom';

        if (topToBottom) {
            const topPercent: number = +this.sbThumb.nativeElement.style.top.slice(0, -1);
            px = 100 - topPercent - this.sbThumbHeight;
            firstSide = 'top';
            secondSide = 'bottom';
        } else if (!topToBottom) {
            const bottomPercent: number = +this.sbThumb.nativeElement.style.bottom.slice(0, -1);
            px = 100 - bottomPercent - this.sbThumbHeight;
            firstSide = 'bottom';
            secondSide = 'top';
        }

        this.renderer.setStyle(this.sbThumb.nativeElement, firstSide, 'auto');
        this.renderer.setStyle(this.sbThumb.nativeElement, secondSide, `${px}%`);
    }

    // выставление скролла по левой стороне
    private setScrollbarTopPosition(percent: number): void {
        this.renderer.setStyle(this.sbThumb.nativeElement, 'top', `${percent}%`);
        this.sbThumbTopChange.emit(percent);
    }
    //#endregion SUPPORT

    //#region MOVE_SB
    // движение скролла
    private moveScrollbar(displ: number): void {
        let newCoords: number = (this.startPointFromTop / 100) * this.sbTrackCoords.height + displ;
        this.updateCoords();
        if (newCoords > this.sbTrackCoords.height - this.sbThumbCoords.height) {
            newCoords = this.sbTrackCoords.height - this.sbThumbCoords.height;
        } else if (newCoords < 0) {
            newCoords = 0;
        }
        const percent: number = (newCoords / this.sbTrackCoords.height) * 100;

        this.setScrollbarTopPosition(percent);
    }

    // движение мыши
    private onMouseMove(event: MouseEvent): void {
        const displacement = event.clientY - this.beginCoordThumb;
        this.moveScrollbar(displacement);
    }

    // клик на кнопку
    private onButtonClick(isButtonTop: boolean): void {
        const displacement = isButtonTop ? -this.defaultDisplacement : this.defaultDisplacement;
        this.moveScrollbar(displacement);
    }
    //#endregion MOVE_SB

    //#region RESIZE_SB
    // задание высоты скролла
    private setThumbHeight(percent: number): void {
        if (percent > 100) {
            this.thumbHeight = 100;
        } else if (percent < 5) {
            this.thumbHeight = 5;
        } else {
            this.thumbHeight = percent;
        }
        this.renderer.setStyle(this.sbThumb.nativeElement, 'height', `${this.thumbHeight}%`);
    }

    // изменение размеров скролла
    private onResizeThumb(event: MouseEvent, side: 'top' | 'bottom'): void {
        this.updateCoords();

        let delta: number;
        if (
            (side === 'top' && event.clientY < this.sbTrackCoords[side]) ||
            (side === 'bottom' && event.clientY > this.sbTrackCoords[side])
        ) {
            delta = event.clientY - this.beginCoordThumb;
        } else {
            delta = this.sbTrackCoords[side] - this.beginCoordThumb;
        }

        const deltaPercent: number = (delta / this.sbTrackCoords.height) * 100;

        let percent = this.sbThumbHeight;
        percent += side === 'top' ? -deltaPercent : deltaPercent;

        this.setThumbHeight(percent);
    }
    //#endregion RESIZE_SB
}
