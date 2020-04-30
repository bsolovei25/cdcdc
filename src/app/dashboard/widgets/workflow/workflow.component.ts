import { Component, OnInit, Inject, OnDestroy, Renderer2, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'evj-workflow',
    templateUrl: './workflow.component.html',
    styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent extends WidgetPlatform implements
    OnInit, OnDestroy, AfterViewInit {

    item = 'Таблицы';

    todo = [
        'Get to work',
        'Pick up groceries',
        'Go home',
        'Fall asleep'
    ];

    done = [
        'Get up',
        'Brush teeth',
        'Take a shower',
        'Check e-mail',
        'Walk dog'
    ];

    @ViewChild('splitBar') splitBar: ElementRef<HTMLElement>;
    @ViewChild('splitTop') splitTop: ElementRef<HTMLElement>;

    @ViewChild('done') doneEl: ElementRef<HTMLElement>;

    @ViewChild('containerWorkflow') containerWorkflow: ElementRef<HTMLElement>;

    constructor(
        public widgetService: WidgetService,
        private renderer: Renderer2,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngAfterViewInit(): void {

        this.doneEl.nativeElement.addEventListener('start', (e) => {
            console.log(e);
        });

        this.splitTop.nativeElement.addEventListener('dragover', (e) => {
            console.log(e);
        });


        let mouseIsDown = false;
        this.splitBar.nativeElement.addEventListener('mousedown', (e) => {
            mouseIsDown = true;
        });

        document.addEventListener('mousemove', (e) => {
            if (!mouseIsDown) {
                return;
            }
            const y = this.containerWorkflow.nativeElement.getBoundingClientRect().y;
            const a = e.screenY - y - 140;
            if (a < 50) {
                this.renderer.setStyle(this.splitTop.nativeElement, 'height', `${50}px`);
            } else {
                if (a > this.containerWorkflow.nativeElement
                    .getBoundingClientRect().height - 65) {
                    const height = this.containerWorkflow.nativeElement
                        .getBoundingClientRect().height;
                    const sum = height - 65;
                    this.renderer.setStyle(this.splitTop.nativeElement, 'height', `${sum}px`);
                } else {
                    this.renderer.setStyle(this.splitTop.nativeElement, 'height', `${a}px`);
                }
            }
        });

        document.addEventListener('mouseup', () => {
            mouseIsDown = false;
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        if (ref) {
            // this.data = ref;
        }
    }

    chooseSystem(item): void {

    }

    drop(event: CdkDragDrop<string[]>): void {
        console.log(event);
        // if (event?.previousContainer === event.container) {
        //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        // } else {
        //     transferArrayItem(event.previousContainer.data,
        //         event.container.data,
        //         event.previousIndex,
        //         event.currentIndex);
        // }
    }

}
