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
} from '@angular/core';

@Component({
    selector: 'evj-smart-scroll',
    templateUrl: './smart-scroll.component.html',
    styleUrls: ['./smart-scroll.component.scss'],
})
export class SmartScrollComponent implements AfterViewInit, OnChanges {
    @Input() private sbThumbWidth: number = 40; // ширина бегунка в процентах
    @Input() private sbThumbLeft: number = 40; // положение левой части скролла в процентах

    @Output() private sbThumbWidthChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() private sbThumbLeftChange: EventEmitter<number> = new EventEmitter<number>();

    @ViewChild('scroll') private scroll: ElementRef;

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

    readonly defaultDisplacement: number = 20;

    constructor(private renderer: Renderer2) {}

    public ngOnChanges(): void {
        if (this.scroll?.nativeElement) {
            this.setThumbWidth(this.sbThumbWidth);
            this.setScrollbarLeftPosition(this.sbThumbLeft);
        }
    }

    public ngAfterViewInit(): void {
        this.eventsListenFn();

        this.updateCoords();

        this.setThumbWidth(this.sbThumbWidth);
        this.setScrollbarLeftPosition(this.sbThumbLeft);
    }

    private eventsListenFn(): void {
        let listeningMouseMove: () => void = null;
        let listeningMouseMoveResizerRight: () => void = null;
        let listeningMouseMoveResizerLeft: () => void = null;

        this.sbThumb.nativeElement.ondragstart = () => false;

        this.renderer.listen(this.sbThumbBody.nativeElement, 'mousedown', (event: MouseEvent) => {
            this.beginCoordThumb = event.clientX;
            if (this.sbThumb.nativeElement.style.left) {
                this.startPointFromLeft = +this.sbThumb.nativeElement.style.left.slice(0, -1);
            }
            listeningMouseMove = this.renderer.listen(
                document,
                'mousemove',
                this.onMouseMove.bind(this)
            );
        });

        this.renderer.listen(this.resizerLeft.nativeElement, 'mousedown', (event: MouseEvent) => {
            this.beginCoordThumb = event.clientX;
            this.changePositionSides(true);
            listeningMouseMoveResizerLeft = this.renderer.listen(
                document,
                'mousemove',
                (mouseEvent: MouseEvent) => {
                    this.onResizeThumb(mouseEvent, 'left');
                }
            );
        });

        this.renderer.listen(this.resizerRight.nativeElement, 'mousedown', (event: MouseEvent) => {
            this.beginCoordThumb = event.clientX;
            listeningMouseMoveResizerRight = this.renderer.listen(
                document,
                'mousemove',
                (mouseEvent: MouseEvent) => {
                    this.onResizeThumb(mouseEvent, 'right');
                }
            );
        });

        this.renderer.listen(document, 'mouseup', () => {
            if (listeningMouseMove) {
                listeningMouseMove();
                listeningMouseMove = null;
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
        });

        this.renderer.listen(this.btnLeft.nativeElement, 'click', () => {
            this.startPointFromLeft = +this.sbThumb.nativeElement.style.left.slice(0, -1);
            this.onButtonClick(true);
        });

        this.renderer.listen(this.btnRight.nativeElement, 'click', () => {
            this.startPointFromLeft = +this.sbThumb.nativeElement.style.left.slice(0, -1);
            this.onButtonClick(false);
        });
    }

    private updateCoords(): void {
        this.sbThumbCoords = this.sbThumb.nativeElement.getBoundingClientRect();
        this.sbTrackCoords = this.sbTrack.nativeElement.getBoundingClientRect();
    }

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

    private setScrollbarLeftPosition(percent: number): void {
        this.renderer.setStyle(this.sbThumb.nativeElement, 'left', `${percent}%`);
    }

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

        this.sbThumbLeftChange.emit(percent);
    }

    private onMouseMove(event: MouseEvent): void {
        const displacement = event.clientX - this.beginCoordThumb;
        this.moveScrollbar(displacement);
        // this.scrollCoordinatesX.emit(this.scaleScrollForHTML());
    }

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

    private onButtonClick(isButtonLeft: boolean): void {
        const displacement = isButtonLeft ? -this.defaultDisplacement : this.defaultDisplacement;
        this.moveScrollbar(displacement);
        // this.scrollCoordinatesX.emit(this.scaleScrollForHTML());
    }

    private scaleScrollForHTML(): number {
        // const realTimeSbCoordsThumb1: DOMRect = this.sbThumb.nativeElement.getBoundingClientRect();
        // const scrollBarWidth: number = this.scrollMaxWidth - this.scrollWidth;
        // const customScrollWidth: number = this.sbTrackCoords.width - this.sbThumbCoords.width;
        // const diferenceOfLeftSides: number = realTimeSbCoordsThumb1.left - this.sbTrackCoords.left;
        // const realScroll: number = (diferenceOfLeftSides / customScrollWidth) * scrollBarWidth;
        // return realScroll;
        return;
    }
}
