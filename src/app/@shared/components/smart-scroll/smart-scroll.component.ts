import {
    Component,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    Renderer2,
} from '@angular/core';

@Component({
    selector: 'evj-smart-scroll',
    templateUrl: './smart-scroll.component.html',
    styleUrls: ['./smart-scroll.component.scss'],
})
export class SmartScrollComponent implements AfterViewInit {
    @Input() private scrollWidth: number = 0;
    @Input() private scrollMaxWidth: number = 0;

    @Output() private scrollCoordinatesX: EventEmitter<number> = new EventEmitter<number>();

    @ViewChild('sbThumb') private sbThumb: ElementRef;
    @ViewChild('sbTrack') private sbTrack: ElementRef;
    @ViewChild('btnLeft') private btnLeft: ElementRef;
    @ViewChild('btnRight') private btnRight: ElementRef;

    private sbThumbCoords: DOMRect;
    private sbTrackCoords: DOMRect;

    private beginCoordThumb: number = 0;
    private startPointFromLeft: number = 0;

    readonly defaultDisplacement: number = 20;

    private listeningMouseMove: () => void = null;

    constructor(private renderer: Renderer2) {}

    public ngAfterViewInit(): void {
        this.sbThumb.nativeElement.ondragstart = () => false;
        this.renderer.listen(this.sbThumb.nativeElement, 'mousedown', (event: MouseEvent) => {
            this.beginCoordThumb = event.clientX;
            if (this.sbThumb.nativeElement.style.left) {
                this.startPointFromLeft = +this.sbThumb.nativeElement.style.left.slice(0, -2);
            }
            this.listeningMouseMove = this.renderer.listen(
                document,
                'mousemove',
                this.onMouseMove.bind(this)
            );
        });
        this.renderer.listen(document, 'mouseup', () => {
            if (this.listeningMouseMove) {
                this.listeningMouseMove();
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

    public showScroll(): boolean {
        return this.scrollWidth < this.scrollMaxWidth;
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
        this.scrollCoordinatesX.emit(this.scaleScrollForHTML());
    }

    private onButtonClick(isButtonLeft: boolean): void {
        const displacement = isButtonLeft ? -this.defaultDisplacement : this.defaultDisplacement;
        this.moveScrollbar(displacement);
        this.scrollCoordinatesX.emit(this.scaleScrollForHTML());
    }

    private scaleScrollForHTML(): number {
        const realTimeSbCoordsThumb1: DOMRect = this.sbThumb.nativeElement.getBoundingClientRect();
        const scrollBarWidth: number = this.scrollMaxWidth - this.scrollWidth;
        const customScrollWidth: number = this.sbTrackCoords.width - this.sbThumbCoords.width;
        const diferenceOfLeftSides: number = realTimeSbCoordsThumb1.left - this.sbTrackCoords.left;
        const realScroll: number = (diferenceOfLeftSides / customScrollWidth) * scrollBarWidth;
        return realScroll;
    }
}
