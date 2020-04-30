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

    items = [
        'Carrots',
        'Tomatoes',
        'Onions',
        'Apples',
        'Avocados'
    ];

    basket = [
        'Oranges',
        'Bananas',
        'Cucumbers'
    ];

    @ViewChild('splitBar') splitBar: ElementRef<HTMLElement>;
    @ViewChild('splitTop') splitTop: ElementRef<HTMLElement>;

    @ViewChild('dragger') dragger: ElementRef<HTMLElement>;
    @ViewChild('dropped') dropped: ElementRef<HTMLElement>;

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

        this.doneEl.nativeElement.addEventListener('dragstart', (e) => {
            console.log(e);
        });
        this.doneEl.nativeElement.addEventListener('dragstart', (e) => {
            console.log(e);
        });

        this.splitTop.nativeElement.addEventListener('drop', (e) => {
            console.log(e);
        });

        this.dragger.nativeElement.addEventListener('dragstart', (ev) => {
            console.log('dragstart');
          
        });
        this.dropped.nativeElement.addEventListener('dragleave', (e) => {
            // console.log(e);

            // console.log('drop');
        });

        document.addEventListener('drop', this.dragend);


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

        this.dragGs();
    }
    dragend() {
        console.log('dropit');

    };

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        if (ref) {
            // this.data = ref;
        }
    }

    chooseSystem(item): void { }

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

    onDragOver(event) {
        event.preventDefault();
    }

    onDrop(event) {
        console.log('drop');
        const svg = this.renderer.createElement('svg-icon');
        this.renderer.setAttribute(svg, 'svgStyle', 'width: 32px');
        this.renderer.setAttribute(svg, 'src', './assets/icons/widgets/workflow/expired.svg');
        this.splitTop.nativeElement.appendChild(svg);
        console.log();

    }

    onDragStart(event) {
        console.log('srart');

        event
            .dataTransfer
            .setData('text/plain', event.target.id);

        event
            .currentTarget
            .style
            .backgroundColor = 'green';
    }



    dragGs() {


    }

}
