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
    // @Input() private scrollWidth: number = 0; // ширина окна скролла
    // @Input() private scrollMaxWidth: number = 0; // ширина ленты скролла
    // @Output() private scrollCoordinatesX: EventEmitter<number> = new EventEmitter<number>();

    @Input() private sbThumbWidth: number = 40; // ширина

    @Output() private sbThumbWidthChange: EventEmitter<number> = new EventEmitter<number>();

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

    private scrollWidth: number = 0;

    private beginCoordThumb: number = 0;
    private startPointFromLeft: number = 0;

    readonly defaultDisplacement: number = 20;

    constructor(private renderer: Renderer2) {}

    public ngOnChanges(): void {
        if (this.scroll?.nativeElement) {
            this.setThumbWidth(this.sbThumbWidth);
        }
        console.log(this.sbThumbWidth);
    }

    public ngAfterViewInit(): void {
        this.eventsListenFn();

        this.sbThumbCoords = this.sbThumb.nativeElement.getBoundingClientRect();
        this.sbTrackCoords = this.sbTrack.nativeElement.getBoundingClientRect();

        this.scrollWidth = this.scroll.nativeElement.clientWidth;
        this.setThumbWidth(this.sbThumbWidth);
    }

    private eventsListenFn(): void {
        let listeningMouseMove: () => void = null;
        let listeningMouseMoveResizer: () => void = null;

        this.sbThumb.nativeElement.ondragstart = () => false;

        this.renderer.listen(this.sbThumbBody.nativeElement, 'mousedown', (event: MouseEvent) => {
            this.beginCoordThumb = event.clientX;
            if (this.sbThumb.nativeElement.style.left) {
                this.startPointFromLeft = +this.sbThumb.nativeElement.style.left.slice(0, -2);
            }
            listeningMouseMove = this.renderer.listen(
                document,
                'mousemove',
                this.onMouseMove.bind(this)
            );
        });

        this.renderer.listen(this.resizerRight.nativeElement, 'mousedown', (event: MouseEvent) => {
            this.beginCoordThumb = event.clientX;
            listeningMouseMoveResizer = this.renderer.listen(
                document,
                'mousemove',
                this.onResizeThumb.bind(this)
            );
        });

        this.renderer.listen(document, 'mouseup', () => {
            if (listeningMouseMove) {
                listeningMouseMove();
                listeningMouseMove = null;
            }
            if (listeningMouseMoveResizer) {
                listeningMouseMoveResizer();
                listeningMouseMoveResizer = null;
                this.sbThumbWidthChange.emit(this.thumbWidth);
            }
        });

        this.renderer.listen(this.btnLeft.nativeElement, 'click', () => {
            this.startPointFromLeft = +this.sbThumb.nativeElement.style.left.slice(0, -2);
            this.onButtonClick(true);
        });

        this.renderer.listen(this.btnRight.nativeElement, 'click', () => {
            this.startPointFromLeft = +this.sbThumb.nativeElement.style.left.slice(0, -2);
            this.onButtonClick(false);
        });
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

    private moveScrollbar(displ: number): void {
        let newCoords: number = this.startPointFromLeft + displ;
        this.sbThumbCoords = this.sbThumb.nativeElement.getBoundingClientRect();
        this.sbTrackCoords = this.sbTrack.nativeElement.getBoundingClientRect();
        if (newCoords > this.sbTrackCoords.width - this.sbThumbCoords.width) {
            newCoords = this.sbTrackCoords.width - this.sbThumbCoords.width;
        } else if (newCoords < 0) {
            newCoords = 0;
        }
        this.sbThumb.nativeElement.style.left = `${newCoords}px`;
    }

    private onMouseMove(event: MouseEvent): void {
        const displacement = event.clientX - this.beginCoordThumb;
        this.moveScrollbar(displacement);
        // this.scrollCoordinatesX.emit(this.scaleScrollForHTML());
    }

    private onResizeThumb(event: MouseEvent): void {
        let delta: number;
        if (event.clientX < this.sbTrackCoords.right) {
            delta = event.clientX - this.beginCoordThumb;
        } else {
            delta = this.sbTrackCoords.right - this.beginCoordThumb;
        }

        const deltaPercent: number = (delta / this.scrollWidth) * 100;

        this.setThumbWidth(this.sbThumbWidth + deltaPercent);
        console.log(this.sbTrack);
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
