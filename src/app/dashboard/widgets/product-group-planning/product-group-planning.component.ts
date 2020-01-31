import {
    Component,
    OnInit,
    Inject,
    AfterViewInit,
    ElementRef,
    ViewChild,
    OnDestroy,
} from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';
import { IProductGroupPlanning } from '../../models/product-group-planning';

declare var d3: any;

@Component({
    selector: 'evj-product-group-planning',
    templateUrl: './product-group-planning.component.html',
    styleUrls: ['./product-group-planning.component.scss'],
})
export class ProductGroupPlanningComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('lines', { static: false }) lines: ElementRef;

    static itemCols = 12;
    static itemRows = 8;

    private subscriptions: Subscription[] = [];

    public title = 'График отгрузки';
    public code;
    public units;
    public name;
    public previewTitle: string;

    data: IProductGroupPlanning[] = [
        {
            product: {
                name: 'Бензин',
                value: 187863,
                criticalValue: -4500,
                productPercent: 20,
            },
            typeProduct: [
                {
                    name: 'АИ-92',
                    value: 71909,
                    percent: 0,
                    criticalValue: -4500,
                    criticalButton: { button1: true, button2: true, button3: false },
                },
                {
                    name: 'АИ-92 доп.т.',
                    value: 31000,
                    percent: 80,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'АИ-95',
                    value: 80526,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: true },
                },
                {
                    name: 'АИ-98',
                    value: 1022,
                    criticalValue: 0,
                    percent: 100,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'G-DRIVE 100',
                    value: 1703,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
            ],
            compleateProduct: {
                value: -4500,
                compleateProcent: 90,
            },
            imageType: 'benzin',
        },
        {
            product: {
                name: 'Бензин',
                value: 187863,
                criticalValue: -4500,
                productPercent: 20,
            },
            typeProduct: [
                {
                    name: 'АИ-92',
                    value: 71909,
                    percent: 0,
                    criticalValue: -4500,
                    criticalButton: { button1: true, button2: true, button3: false },
                },
                {
                    name: 'АИ-92 доп.т.',
                    value: 31000,
                    percent: 80,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'АИ-95',
                    value: 80526,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: true },
                },
                {
                    name: 'АИ-98',
                    value: 1022,
                    criticalValue: 0,
                    percent: 100,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
            ],
            compleateProduct: {
                value: -4500,
                compleateProcent: 90,
            },
            imageType: 'car',
        },
        {
            product: {
                name: 'Бензин',
                value: 187863,
                criticalValue: -4500,
                productPercent: 20,
            },
            typeProduct: [
                {
                    name: 'АИ-92',
                    value: 71909,
                    percent: 0,
                    criticalValue: -4500,
                    criticalButton: { button1: true, button2: true, button3: false },
                },
                {
                    name: 'АИ-92 доп.т.',
                    value: 31000,
                    percent: 80,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'АИ-95',
                    value: 80526,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: true },
                },
                {
                    name: 'АИ-98',
                    value: 1022,
                    criticalValue: 0,
                    percent: 100,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'G-DRIVE 100',
                    value: 1703,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
            ],
            compleateProduct: {
                value: -4500,
                compleateProcent: 40,
            },
            imageType: 'cube',
        },
        {
            product: {
                name: 'Бензин',
                value: 187863,
                criticalValue: 0,
                productPercent: 30,
            },
            typeProduct: [
                {
                    name: 'АИ-92',
                    value: 71909,
                    percent: 0,
                    criticalValue: -4500,
                    criticalButton: { button1: true, button2: true, button3: false },
                },
                {
                    name: 'АИ-92 доп.т.',
                    value: 31000,
                    percent: 80,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'АИ-95',
                    value: 80526,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: true },
                },
                {
                    name: 'АИ-98',
                    value: 1022,
                    criticalValue: 0,
                    percent: 100,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'G-DRIVE 100',
                    value: 1703,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
            ],
            compleateProduct: {
                value: 0,
                compleateProcent: 100,
            },
            imageType: 'fire',
        },
        {
            product: {
                name: 'Бензин',
                value: 187863,
                criticalValue: -4500,
                productPercent: 20,
            },
            typeProduct: [
                {
                    name: 'АИ-92',
                    value: 71909,
                    percent: 0,
                    criticalValue: -4500,
                    criticalButton: { button1: true, button2: true, button3: false },
                },
                {
                    name: 'АИ-92 доп.т.',
                    value: 31000,
                    percent: 80,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'АИ-95',
                    value: 80526,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: true },
                },
                {
                    name: 'АИ-98',
                    value: 1022,
                    criticalValue: 0,
                    percent: 100,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'G-DRIVE 100',
                    value: 1703,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
            ],
            compleateProduct: {
                value: -4500,
                compleateProcent: 90,
            },
            imageType: 'plane',
        },
        {
            product: {
                name: 'Бензин',
                value: 187863,
                criticalValue: 0,
                productPercent: 50,
            },
            typeProduct: [
                {
                    name: 'АИ-92',
                    value: 71909,
                    percent: 0,
                    criticalValue: -4500,
                    criticalButton: { button1: true, button2: true, button3: false },
                },
                {
                    name: 'АИ-92 доп.т.',
                    value: 31000,
                    percent: 80,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'АИ-95',
                    value: 80526,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: true },
                },
                {
                    name: 'АИ-98',
                    value: 1022,
                    criticalValue: 0,
                    percent: 100,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'G-DRIVE 100',
                    value: 1703,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
            ],
            compleateProduct: {
                value: 0,
                compleateProcent: 100,
            },
            imageType: 'water',
        },
        {
            product: {
                name: 'Бензин',
                value: 187863,
                criticalValue: -4500,
                productPercent: 20,
            },
            typeProduct: [
                {
                    name: 'АИ-92',
                    value: 71909,
                    percent: 0,
                    criticalValue: -4500,
                    criticalButton: { button1: true, button2: true, button3: false },
                },
                {
                    name: 'АИ-92 доп.т.',
                    value: 31000,
                    percent: 80,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'АИ-95',
                    value: 80526,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: true },
                },
                {
                    name: 'АИ-98',
                    value: 1022,
                    criticalValue: 0,
                    percent: 100,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'G-DRIVE 100',
                    value: 1703,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
            ],
            compleateProduct: {
                value: -4500,
                compleateProcent: 90,
            },
            imageType: 'ship',
        },
        {
            product: {
                name: 'Бензин',
                value: 187863,
                criticalValue: 0,
                productPercent: 100,
            },
            typeProduct: [
                {
                    name: 'АИ-92',
                    value: 71909,
                    percent: 0,
                    criticalValue: -4500,
                    criticalButton: { button1: true, button2: true, button3: false },
                },
                {
                    name: 'АИ-92 доп.т.',
                    value: 0,
                    percent: 0,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'АИ-95',
                    value: 80526,
                    percent: 100,
                    criticalValue: -700,
                    criticalButton: { button1: false, button2: false, button3: true },
                },
            ],
            compleateProduct: {
                value: -4500,
                compleateProcent: 90,
            },
            imageType: 'ship',
        },
        {
            product: {
                name: 'Бензин',
                value: 187863,
                criticalValue: -4500,
                productPercent: 30,
            },
            typeProduct: [
                {
                    name: 'АИ-92',
                    value: 71909,
                    percent: 0,
                    criticalValue: -4500,
                    criticalButton: { button1: true, button2: true, button3: false },
                },
                {
                    name: 'АИ-92 доп.т.',
                    value: 31000,
                    percent: 80,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'АИ-95',
                    value: 80526,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: true },
                },
                {
                    name: 'АИ-98',
                    value: 1022,
                    criticalValue: 0,
                    percent: 100,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
            ],
            compleateProduct: {
                value: -4500,
                compleateProcent: 90,
            },
            imageType: 'ship',
        },
        {
            product: {
                name: 'Бензин',
                value: 187863,
                criticalValue: -4500,
                productPercent: 20,
            },
            typeProduct: [
                {
                    name: 'АИ-92',
                    value: 71909,
                    percent: 0,
                    criticalValue: -4500,
                    criticalButton: { button1: true, button2: true, button3: false },
                },
            ],
            compleateProduct: {
                value: -4500,
                compleateProcent: 90,
            },
            imageType: 'ship',
        },
        {
            product: {
                name: 'Бензин',
                value: 187863,
                criticalValue: -4500,
                productPercent: 70,
            },
            typeProduct: [
                {
                    name: 'АИ-92',
                    value: 71909,
                    percent: 0,
                    criticalValue: -4500,
                    criticalButton: { button1: true, button2: true, button3: false },
                },
                {
                    name: 'АИ-92 доп.т.',
                    value: 31000,
                    percent: 80,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
            ],
            compleateProduct: {
                value: -4500,
                compleateProcent: 90,
            },
            imageType: 'ship',
        },
        {
            product: {
                name: 'Бензин',
                value: 187863,
                criticalValue: -4500,
                productPercent: 40,
            },
            typeProduct: [
                {
                    name: 'АИ-92',
                    value: 71909,
                    percent: 0,
                    criticalValue: -4500,
                    criticalButton: { button1: true, button2: true, button3: false },
                },
                {
                    name: 'АИ-92 доп.т.',
                    value: 31000,
                    percent: 80,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: false },
                },
                {
                    name: 'АИ-95',
                    value: 80526,
                    percent: 100,
                    criticalValue: 0,
                    criticalButton: { button1: false, button2: false, button3: true },
                },
            ],
            compleateProduct: {
                value: -4500,
                compleateProcent: 90,
            },
            imageType: 'ship',
        },
    ];

    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
                this.title = data.title;
                this.code = data.code;
                this.units = data.units;
                this.name = data.name;
                this.previewTitle = data.widgetType;
            })
        );
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {
        if (this.subscriptions) {
            for (const subscription of this.subscriptions) {
                subscription.unsubscribe();
            }
        }
    }
}
