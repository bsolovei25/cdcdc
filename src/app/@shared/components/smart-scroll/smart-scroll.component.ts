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
import { IChartMini } from '../../models/smart-scroll.model';
import { IDatesInterval } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-smart-scroll',
    templateUrl: './smart-scroll.component.html',
    styleUrls: ['./smart-scroll.component.scss'],
})
export class SmartScrollComponent implements AfterViewInit, OnChanges, OnDestroy {

    @Input() private sbThumbWidth: number = 40; // ширина бегунка в процентах
    @Input() private sbThumbLeft: number = 40; // положение левой части скролла в процентах
    @Input() public data: IChartMini[] = [
        { value: 7, timeStamp: new Date(2020, 3, 1) },
        { value: 2, timeStamp: new Date(2020, 3, 2) },
        { value: -3, timeStamp: new Date(2020, 3, 3) },
        { value: 5, timeStamp: new Date(2020, 3, 4) },
        { value: 1, timeStamp: new Date(2020, 3, 5) },
        { value: 8, timeStamp: new Date(2020, 3, 6) },
        { value: 7, timeStamp: new Date(2020, 3, 7) },
        { value: 7, timeStamp: new Date(2020, 3, 9) },
        { value: 2, timeStamp: new Date(2020, 3, 10) },
        { value: -3, timeStamp: new Date(2020, 3, 11) },
        { value: 5, timeStamp: new Date(2020, 3, 12) },
        { value: 1, timeStamp: new Date(2020, 3, 13) },
        { value: 8, timeStamp: new Date(2020, 3, 14) },
        { value: 7, timeStamp: new Date(2020, 3, 15) },
        { value: 7, timeStamp: new Date(2020, 3, 16) },
        { value: 2, timeStamp: new Date(2020, 3, 17) },
        { value: -3, timeStamp: new Date(2020, 3, 18) },
        { value: 5, timeStamp: new Date(2020, 3, 19) },
        { value: 1, timeStamp: new Date(2020, 3, 20) },
        { value: 8, timeStamp: new Date(2020, 3, 21) },
        { value: 7, timeStamp: new Date(2020, 3, 22) },
        { value: 7, timeStamp: new Date(2020, 3, 23) },
        { value: 2, timeStamp: new Date(2020, 3, 24) },
        { value: -3, timeStamp: new Date(2020, 3, 25) },
        { value: 5, timeStamp: new Date(2020, 3, 26) },
        { value: 1, timeStamp: new Date(2020, 3, 27) },
        { value: 8, timeStamp: new Date(2020, 3, 28) },
        { value: 7, timeStamp: new Date(2020, 3, 29) },
    ];
    @Input() public limits: IDatesInterval = null;

    @Output() private sbThumbWidthChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() private sbThumbLeftChange: EventEmitter<number> = new EventEmitter<number>();

    @ViewChild('sbThumb') private sbThumb: ElementRef;
    @ViewChild('sbThumbBody') private sbThumbBody: ElementRef;
    @ViewChild('sbTrack') private sbTrack: ElementRef;
    @ViewChild('resizerLeft') private resizerLeft: ElementRef;
    @ViewChild('resizerRight') private resizerRight: ElementRef;
    @ViewChild('btnLeft') private btnLeft: ElementRef;
    @ViewChild('btnRight') private btnRight: ElementRef;

    private sbThumbCoords: DOMRect;
    private sbTrackCoords: DOMRect;

    private thumbWidth: number = 20;

    private beginCoordThumb: number = 0;
    private startPointFromLeft: number = 0;

    private eventListener: () => void = null;

    readonly defaultDisplacement: number = 20;

    constructor(private renderer: Renderer2) {}

    public ngOnChanges(): void {
        if (this.sbTrack?.nativeElement) {
            this.setThumbWidth(this.sbThumbWidth);
            this.setScrollbarLeftPosition(this.sbThumbLeft);
        }
    }

    public ngAfterViewInit(): void {
        this.eventListener = this.eventsListenFn();

        this.updateCoords();

        this.setThumbWidth(this.sbThumbWidth);
        this.setScrollbarLeftPosition(this.sbThumbLeft);
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
        let listeningMouseMoveResizerRight: () => void = null;
        let listeningMouseMoveResizerLeft: () => void = null;

        this.sbThumb.nativeElement.ondragstart = () => false;

        eventListeners.push(
            // движение скролла
            this.renderer.listen(
                this.sbThumbBody.nativeElement,
                'mousedown',
                (event: MouseEvent) => {
                    this.beginCoordThumb = event.clientX;
                    if (this.sbThumb.nativeElement.style.left) {
                        this.startPointFromLeft = +this.sbThumb.nativeElement.style.left.slice(
                            0,
                            -1
                        );
                    }
                    listeningMouseMove = this.renderer.listen(
                        document,
                        'mousemove',
                        this.onMouseMove.bind(this)
                    );
                }
            ),

            // ресайз скролла слева
            this.renderer.listen(
                this.resizerLeft.nativeElement,
                'mousedown',
                (event: MouseEvent) => {
                    this.beginCoordThumb = event.clientX;
                    this.changePositionSides(true);
                    listeningMouseMoveResizerLeft = this.renderer.listen(
                        document,
                        'mousemove',
                        (mouseEvent: MouseEvent) => {
                            this.onResizeThumb(mouseEvent, 'left');
                        }
                    );
                }
            ),

            // ресайз скролла справа
            this.renderer.listen(
                this.resizerRight.nativeElement,
                'mousedown',
                (event: MouseEvent) => {
                    this.beginCoordThumb = event.clientX;
                    listeningMouseMoveResizerRight = this.renderer.listen(
                        document,
                        'mousemove',
                        (mouseEvent: MouseEvent) => {
                            this.onResizeThumb(mouseEvent, 'right');
                        }
                    );
                }
            ),

            // поднятие клавиши и отписка от событий
            this.renderer.listen(document, 'mouseup', () => {
                if (listeningMouseMove) {
                    listeningMouseMove();
                    listeningMouseMove = null;

                    const left: number = +this.sbThumb.nativeElement.style.left.slice(0, -1);
                    this.sbThumbLeftChange.emit(left);
                }
                if (listeningMouseMoveResizerLeft) {
                    listeningMouseMoveResizerLeft();
                    listeningMouseMoveResizerLeft = null;

                    this.sbThumbWidthChange.emit(this.thumbWidth);

                    const right: number = +this.sbThumb.nativeElement.style.right.slice(0, -1);
                    const width: number = +this.sbThumb.nativeElement.style.width.slice(0, -1);
                    this.changePositionSides(false);

                    const left: number = 100 - width - right;
                    this.sbThumbLeftChange.emit(left);
                }
                if (listeningMouseMoveResizerRight) {
                    listeningMouseMoveResizerRight();
                    listeningMouseMoveResizerRight = null;

                    this.sbThumbWidthChange.emit(this.thumbWidth);
                }
            }),

            // нажатие кнопки слева
            this.renderer.listen(this.btnLeft.nativeElement, 'click', () => {
                this.startPointFromLeft = +this.sbThumb.nativeElement.style.left.slice(0, -1);
                this.onButtonClick(true);
            }),

            // нажатие кнопки справа
            this.renderer.listen(this.btnRight.nativeElement, 'click', () => {
                this.startPointFromLeft = +this.sbThumb.nativeElement.style.left.slice(0, -1);
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
    private changePositionSides(leftToRight: boolean): void {
        this.updateCoords();

        let px: number;
        let firstSide: 'left' | 'right';
        let secondSide: 'left' | 'right';

        if (leftToRight) {
            const leftPercent: number = +this.sbThumb.nativeElement.style.left.slice(0, -1);
            px = 100 - leftPercent - this.sbThumbWidth;
            firstSide = 'left';
            secondSide = 'right';
        } else if (!leftToRight) {
            const rightPercent: number = +this.sbThumb.nativeElement.style.right.slice(0, -1);
            px = 100 - rightPercent - this.sbThumbWidth;
            firstSide = 'right';
            secondSide = 'left';
        }

        this.renderer.setStyle(this.sbThumb.nativeElement, firstSide, 'auto');
        this.renderer.setStyle(this.sbThumb.nativeElement, secondSide, `${px}%`);
    }

    // выставление скролла по левой стороне
    private setScrollbarLeftPosition(percent: number): void {
        this.renderer.setStyle(this.sbThumb.nativeElement, 'left', `${percent}%`);
    }
    //#endregion SUPPORT

    //#region MOVE_SB
    // движение скролла
    private moveScrollbar(displ: number): void {
        let newCoords: number = (this.startPointFromLeft / 100) * this.sbTrackCoords.width + displ;
        this.updateCoords();
        if (newCoords > this.sbTrackCoords.width - this.sbThumbCoords.width) {
            newCoords = this.sbTrackCoords.width - this.sbThumbCoords.width;
        } else if (newCoords < 0) {
            newCoords = 0;
        }
        const percent: number = (newCoords / this.sbTrackCoords.width) * 100;

        this.setScrollbarLeftPosition(percent);
    }

    // движение мыши
    private onMouseMove(event: MouseEvent): void {
        const displacement = event.clientX - this.beginCoordThumb;
        this.moveScrollbar(displacement);
    }

    // клик на кнопку
    private onButtonClick(isButtonLeft: boolean): void {
        const displacement = isButtonLeft ? -this.defaultDisplacement : this.defaultDisplacement;
        this.moveScrollbar(displacement);
    }
    //#endregion MOVE_SB

    //#region RESIZE_SB
    // задание ширины скролла
    private setThumbWidth(percent: number): void {
        if (percent > 100) {
            this.thumbWidth = 100;
        } else if (percent < 5) {
            this.thumbWidth = 5;
        } else {
            this.thumbWidth = percent;
        }
        this.renderer.setStyle(this.sbThumb.nativeElement, 'width', `${this.thumbWidth}%`);
    }

    // изменение размеров скролла
    private onResizeThumb(event: MouseEvent, side: 'left' | 'right'): void {
        this.updateCoords();

        let delta: number;
        if (
            (side === 'right' && event.clientX < this.sbTrackCoords[side]) ||
            (side === 'left' && event.clientX > this.sbTrackCoords[side])
        ) {
            delta = event.clientX - this.beginCoordThumb;
        } else {
            delta = this.sbTrackCoords[side] - this.beginCoordThumb;
        }

        const deltaPercent: number = (delta / this.sbTrackCoords.width) * 100;

        let percent = this.sbThumbWidth;
        percent += side === 'left' ? -deltaPercent : deltaPercent;

        this.setThumbWidth(percent);
    }
    //#endregion RESIZE_SB
}
