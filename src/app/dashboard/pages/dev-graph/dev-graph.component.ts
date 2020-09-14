import {
    Component, ElementRef, ViewChild
} from '@angular/core';


@Component({
    selector: 'evj-dev-graph',
    templateUrl: './dev-graph.component.html',
    styleUrls: ['./dev-graph.component.scss']
})
export class DevGraphComponent {
    @ViewChild('graphContainer') public graphContainer: ElementRef;

    private readonly staticWidth: number = 1220;
    private readonly staticHeight: number = 660;

    get areaScale(): string {
        const scaleY =
            (this.graphContainer?.nativeElement?.offsetHeight ?? this.staticHeight)
            / this.staticHeight;
        const scaleX =
            (this.graphContainer?.nativeElement?.offsetWidth ?? this.staticWidth)
            / this.staticWidth;
        const scale: number = scaleX < scaleY ? scaleX : scaleY;
        console.log(this.graphContainer?.nativeElement?.offsetHeight);
        return `transform: translate(-50%, -50%) scale(${scale})`;
    }
}

