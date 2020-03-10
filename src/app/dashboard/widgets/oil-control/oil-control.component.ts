import {
    Component,
    OnInit,
    Inject,
    ViewChild,
    AfterViewInit,
    ElementRef,
    HostListener,
} from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription, pipe, VirtualTimeScheduler } from 'rxjs';
import 'leader-line';
import { EventEmitter } from '@angular/core';
import { OilControls } from '../../models/oil-control';

declare var LeaderLine: any;

declare var d3: any;

@Component({
    selector: 'evj-oil-control',
    templateUrl: './oil-control.component.html',
    styleUrls: ['./oil-control.component.scss'],
})
export class OilControlComponent implements OnInit, AfterViewInit {
    @ViewChild('oilIcon') oilIcon: ElementRef;
    @ViewChild('oilBak') oilBak: ElementRef;
    @ViewChild('oilCircle') oilCircle: ElementRef;
    @ViewChild('borders') borders: ElementRef;
    @ViewChild('line') line: ElementRef;

    static itemCols = 32;
    static itemRows = 12;

    public isVertical = false;

    private subscriptions: Subscription[] = [];

    public previewTitle: string;

    //public data: OilControls;

    data: OilControls = {
        operations: 42,
        criticalOperations: 1,
        products: [
            {
                name: 'ДТ сорт F',
                value: 12132,
                criticalValue: 23,
                storages: [
                    {
                        id: 1,
                        nameStorage: 'E-1',
                        status: 'critical',
                        valueStorage: 10253,
                        tank: {
                            timeStart: '02:03:20',
                            timeEnd: '04:08:38',
                            tankLevel: 10,
                            tankValues: [
                                {
                                    name: 'Отгружено по резервуару',
                                    valueFirst: 1670,
                                    valueSecond: 98.73,
                                    status: 'normal',
                                },
                                {
                                    name: 'По данным отгрузки',
                                    valueFirst: 1700,
                                    valueSecond: 103.23,
                                    status: 'critical',
                                },
                                {
                                    name: 'Дебаланс',
                                    valueFirst: 30,
                                    valueSecond: 1.27,
                                    status: 'normal',
                                },
                                {
                                    name: 'Допустимый дебаланс',
                                    valueFirst: 15,
                                    valueSecond: 103.23,
                                    status: 'default',
                                },
                                {
                                    name: 'Отклонение',
                                    valueFirst: 15,
                                    valueSecond: 103.23,
                                    status: 'normal',
                                },
                            ],
                        },
                        tankers: [
                            {
                                nameTanker: 'Tug',
                                shipped: true,
                                value: 528,
                                title: 'Авто ( AУТН-2 )',
                            },
                            {
                                nameTanker: 'Tube',
                                shipped: true,
                                value: 528,
                                title: 'Ж/Д ( AУТН-2 )',
                            },
                            {
                                nameTanker: 'Cistern',
                                shipped: true,
                                value: 528,
                                title: 'Труба ( AУТН-2 )',
                            },
                        ],
                    },
                    {
                        id: 2,
                        nameStorage: 'E-2',
                        valueStorage: 10253,
                        status: 'normal',
                        tank: {
                            timeStart: '020320',
                            timeEnd: '040838',
                            tankLevel: 70,
                            tankValues: [
                                {
                                    name: 'Отгружено по резервуару',
                                    valueFirst: 1240,
                                    valueSecond: 98.73,
                                    status: 'normal',
                                },
                                {
                                    name: 'По данным отгрузки',
                                    valueFirst: 1700,
                                    valueSecond: 103.23,
                                    status: 'normal',
                                },
                                {
                                    name: 'Дебаланс',
                                    valueFirst: 30,
                                    valueSecond: 1.27,
                                    status: 'normal',
                                },
                                {
                                    name: 'Допустимый дебаланс',
                                    valueFirst: 15,
                                    valueSecond: 103.23,
                                    status: 'normal',
                                },
                                {
                                    name: 'Отклонение',
                                    valueFirst: 0,
                                    valueSecond: 0,
                                    status: 'normal',
                                },
                            ],
                        },
                        tankers: [
                            {
                                nameTanker: 'Tug',
                                shipped: true,
                                value: 528,
                                title: 'Авто ( AУТН-2 )',
                            },
                            {
                                nameTanker: 'Tube',
                                shipped: true,
                                value: 528,
                                title: 'Ж/Д ( AУТН-2 )',
                            },
                            {
                                nameTanker: 'Cistern',
                                shipped: false,
                                value: 528,
                                title: 'Труба ( AУТН-2 )',
                            },
                        ],
                    },
                    {
                        id: 3,
                        nameStorage: 'E-3',
                        valueStorage: 10253,
                        status: 'normal',
                        tank: {
                            timeStart: '020320',
                            timeEnd: '040838',
                            tankLevel: 100,
                            tankValues: [
                                {
                                    name: 'Отгружено по резервуару',
                                    valueFirst: 1670,
                                    valueSecond: 98.73,
                                    status: 'normal',
                                },
                                {
                                    name: 'По данным отгрузки',
                                    valueFirst: 1700,
                                    valueSecond: 103.23,
                                    status: 'normal',
                                },
                                {
                                    name: 'Дебаланс',
                                    valueFirst: 30,
                                    valueSecond: 1.27,
                                    status: 'default',
                                },
                                {
                                    name: 'Допустимый дебаланс',
                                    valueFirst: 15,
                                    valueSecond: 103.23,
                                    status: 'normal',
                                },
                                {
                                    name: 'Отклонение',
                                    valueFirst: 0,
                                    valueSecond: 0,
                                    status: 'normal',
                                },
                            ],
                        },
                        tankers: [
                            {
                                nameTanker: 'bus',
                                shipped: true,
                                value: 528,
                                title: 'Авто ( AУТН-2 )',
                            },
                            {
                                nameTanker: 'pipe',
                                shipped: false,
                                value: 528,
                                title: 'Авто ( AУТН-2 )',
                            },
                            {
                                nameTanker: 'train',
                                shipped: false,
                                value: 528,
                                title: 'Авто ( AУТН-2 )',
                            },
                        ],
                    },
                ],
            },
        ],
    };

    storageXY = [
        {
            x: 400,
            y: 220,
        },
        {
            x: 450,
            y: 300,
        },
        {
            point: 3,
            x: 510,
            y: 420,
        },
        {
            x: 450,
            y: 620,
        },
        {
            x: 400,
            y: 690,
        },
    ];

    productXY = [
        {
            point: 1,
            x: 200,
            y: 220,
        },
        {
            point: 2,
            x: 260,
            y: 300,
        },
        {
            point: 3,
            x: 320,
            y: 420,
        },
        {
            point: 4,
            x: 260,
            y: 620,
        },
        {
            point: 5,
            x: 200,
            y: 700,
        },
    ];

    public title;
    public code;
    public units;
    public name;

    public clickPaginator: boolean = false;

    public indexProduct = 0;
    public indexStorage = 0;
    public indexPie = 0;

    public pieStart = 3;
    public pieEnd = 3;

    public pieStartStorage = 3;
    public pieEndStorage = 3;

    public rectYHeight = 370;

    public countClickChange = 0;
    public countClickChangeStorage = 0;

    public newArrayProduct = [];
    public newArrayStorage = [];

    public indexTestProduct = 0;
    public indexTestStorage = 0;

    public indexData = 0;

    public maxPage;
    public currentPage;

    public activeStorage;
    public activeProduct = [];

    public indexProductActive = 0;

    public htmlProduct;
    public htmlStorage;
    public htmlDataStorage = [];

    public newWidth;
    public checkWidth: boolean = false;

    public criticalPage: any = [];

    public isCriticalArrow: boolean = false;

    public svgMenu;
    public tankersPicture;
    public tankPicture;
    public svgLine;

    public checkRemove = false;
    public checkCriticalTank = false;

    public savePosition: boolean = false;
    public savePositionProduct: number;
    public savePositionStorage: number;
    public saveCurrentPage: number;

    public saveDataStorage: any = [];

    public checkSocket: boolean = false;

    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        @Inject('resizeWidget') public resizeWidget: EventEmitter<MouseEvent>
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
        this.currentPage = 3;
        this.maxPage = this.data.products[0].storages.length;
        this.activeProduct = this.data.products;
        if (this.activeProduct[0].storages.length < 3) {
            this.activeStorage = this.activeProduct[2].storages[1];
        } else if (this.activeProduct[0].storages.length < 2) {
            this.activeStorage = this.activeProduct[0].storages[0];
        } else {
            this.activeStorage = this.activeProduct[0].storages[2];
        }
    }

    public test = false;

    ngOnInit() {}

    ngAfterViewInit() {
        if (!this.isMock) {
            //this.drawOilControl(this.data);
            this.showMock(this.isMock);

            this.subscriptions.push(
                this.resizeWidget.subscribe((data) => {
                    if (data.item.uniqid === this.uniqId) {
                        this.newWidth = data.event.clientX;
                        this.onResize(data.event.clientX);
                    }
                })
            );
        }
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            for (const subscribe of this.subscriptions) {
                subscribe.unsubscribe();
            }
        }
    }

    private wsConnect() {
        this.widgetService.getWidgetLiveDataFromWS(this.id, 'oil-control').subscribe((ref) => {
            this.checkSocket = true;
            this.data = ref;
            if (this.svgMenu) {
                this.clearProduct();
                this.tankersPicture.remove();
                this.tankPicture.remove();
                this.svgLine.remove();
            }
            let count = 0;
            for (let i of this.data.products) {
                count++;
            }
            this.indexTestProduct = count - 1;
            this.drawOilControl(this.data);
            if (this.checkSocket === true && this.savePositionProduct !== undefined) {
                this.onButtonChangeProduct(this.savePositionProduct);
                if (this.saveDataStorage.length !== 0) {
                    this.onButtonChangeStorage(this.savePositionStorage, this.saveDataStorage);
                    this.currentPage = this.saveCurrentPage;
                }
            }

            this.savePosition = true;
            this.checkSocket = false;
        });
    }

    private wsDisconnect() {}

    showMock(show) {
        if (show) {
            this.wsDisconnect();
        } else {
            this.wsConnect();
        }
    }

    public onResize(width) {
        this.checkWidth = width < 600;
    }

    public drawOilControl(data) {
        this.drawPicture(this.oilIcon.nativeElement);
        this.drawBak(this.oilBak.nativeElement);
        /* if (this.newArrayProduct.length === 0) {
            this.FilterCircle(data.products, this.indexTestProduct);
        } else {
            this.FilterCircle(this.newArrayProduct, this.indexTestProduct);
        } */
        this.FilterCircle(data.products, this.indexTestProduct);
    }

    public clearOilControl() {
        this.clearProduct();
    }

    componentDidMount() {
        new LeaderLine(document.getElementById('start'), document.getElementById('end'));
    }

    public drawPicture(el) {
        this.tankersPicture = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('height', '100%')
            .attr('width', '100%')
            .attr('class', 'textProduct')
            .attr('viewBox', '0 0 350 140');

        let x1 = -100;
        let x2 = -80;
        let x3 = -48;
        let x4 = -48;
        let y = 110;

        let tug = './assets/pic/Icons3D/Tug.png';
        let tube = './assets/pic/Icons3D/Tube.png';
        let cis = './assets/pic/Icons3D/Cistern.png';

        let countPicture = 0;

        for (let i of this.activeStorage.tankers) {
            if (i.shipped === true) {
                countPicture++;
            }
        }

        if (countPicture === 1) {
            x1 = -45;
            x2 = -25;
            x3 = 7;
            x4 = 7;
        } else if (countPicture === 2) {
            x1 = -180;
            x2 = -160;
            x3 = -128;
            x4 = -128;
            y = 180;
        } else {
            x1 = -100;
            x2 = -80;
            x3 = -48;
            x4 = -48;
        }

        for (let item of this.activeStorage.tankers) {
            if (item.shipped === true) {
                let pictureContainer = this.tankersPicture
                    .append('image')
                    .attr('xlink:href', './assets/pic/OilControl/oil_icon.svg')
                    .attr('height', '130px')
                    .attr('width', '105px')
                    .attr('class', 'textProduct')
                    .attr('x', x1 + y)
                    .attr('y', '10');

                let pictureIcon = this.tankersPicture
                    .append('image')
                    .attr(
                        'xlink:href',
                        item.nameTanker === 'Tug' ? tug : item.nameTanker === 'Tube' ? tube : cis
                    )
                    .attr('height', '50px')
                    .attr('width', '60px')
                    .attr('class', 'textProduct')
                    .attr('x', x2 + y)
                    .attr('y', '65');

                let planText1 = this.tankersPicture
                    .append('text')
                    .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                    .attr('font-size', '10px')
                    .attr('x', x3 + y)
                    .attr('class', 'textProduct')
                    .attr('y', '40')
                    .attr('text-anchor', 'middle')
                    .attr('fill', '#8c99b2')
                    .text(item.title);

                let valueText1 = this.tankersPicture
                    .append('text')
                    .attr('font-family', 'Tahoma bold')
                    .attr('font-size', '14px')
                    .attr('x', x4 + y)
                    .attr('y', '60')
                    .attr('class', 'textProduct')
                    .attr('text-anchor', 'middle')
                    .attr('fill', '#a2e2ff')
                    .text(item.value);

                x1 += y;
                x2 += y;
                x3 += y;
                x4 += y;
            }
        }

        this.drawLine(this.line.nativeElement, countPicture);
    }

    public drawLine(el, count) {
        console.log('Картинки', count);
        let size = 0;
        if (this.newWidth) {
            size = this.newWidth / 100;
        }
        this.svgLine = d3
            .select(el)
            .append('svg')
            .attr('min-width', '300px')
            .attr('height', '55px')
            .attr('width', '100%')
            .attr('class', 'textProduct')
            .attr('viewBox', '0 0 1200 200');

        if (count === 1) {
            let lineOne = this.svgLine
                .append('image')
                .attr('xlink:href', './assets/pic/OilControl/LineOne.svg')
                .attr('height', '100%')
                .attr('width', '100%')
                .attr('class', 'textProduct')
                .attr('x', 200 + size)
                .attr('y', '0');
        } else if (count === 2) {
            let lineTwo = this.svgLine
                .append('image')
                .attr('xlink:href', './assets/pic/OilControl/LineTwo.svg')
                .attr('height', '100%')
                .attr('width', '100%')
                .attr('class', 'textProduct')
                .attr('x', 300)
                .attr('y', '0');
        } else {
            let lineThree = this.svgLine
                .append('image')
                .attr('xlink:href', './assets/pic/OilControl/LineThree.svg')
                .attr('height', '100%')
                .attr('width', '100%')
                .attr('class', 'textProduct')
                .attr('x', 450)
                .attr('y', '0');
        }
    }

    public drawOnCircle(el, pieStart, pieEnd, pieStartStorage, pieEndStorage, data, dataStorage) {
        this.criticalPage = [];

        this.svgMenu = d3.select(el.firstElementChild);
        let svgMenu = this.svgMenu;
        this.activeProduct = data;

        if (dataStorage.length < 2) {
            this.activeStorage = dataStorage[0];
        } else if (dataStorage.length < 3) {
            this.activeStorage = dataStorage[1];
        } else {
            this.activeStorage = dataStorage[2];
        }

        if (
            (this.saveDataStorage.length === 0 && this.checkSocket === true) ||
            (this.countClickChange !== 0 && this.checkSocket === false)
        ) {
            this.saveDataStorage = [];
            for (let item of dataStorage) {
                this.saveDataStorage.push(item);
            }
            this.savePositionStorage = this.activeStorage.id;
        } else if (this.countClickChange === 0 && this.clickPaginator === true) {
            this.savePositionStorage = this.saveCurrentPage;
        } else if (this.countClickChange === 0) {
            // this.savePositionStorage = this.activeStorage.id;
            this.savePositionStorage = this.saveCurrentPage;
        } else if (
            this.countClickChange !== 0 &&
            this.checkSocket &&
            this.countClickChangeStorage === 0
        ) {
            this.savePositionStorage = this.activeStorage.id;
        } else if (
            this.countClickChange !== 0 &&
            this.checkSocket &&
            this.countClickChangeStorage !== 0
        ) {
            this.savePositionStorage = this.saveCurrentPage;
        }

        const leftBorder: any = el.querySelectorAll('.st5');
        const Circle: any = el.querySelectorAll('.st6');
        const rightBorder: any = el.querySelectorAll('.st7');

        const leftBorderC: any = el.querySelectorAll('.st5-critical');
        const CircleC: any = el.querySelectorAll('.st6-critical');
        const rightBorderC: any = el.querySelectorAll('.st7-critical');

        if (this.activeStorage.status === 'critical') {
            let backgroundCircle = svgMenu
                .append('image')
                .attr('xlink:href', './assets/pic/OilControl/backCircle.svg')
                .attr('height', '250px')
                .attr('width', '250px')
                .attr('x', '195')
                .attr('class', 'textProduct')
                .attr('y', '320');

            let operations = svgMenu
                .append('text')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('font-size', '25px')
                .attr('x', '100')
                .attr('y', '390')
                .attr('text-anchor', 'middle')
                .attr('fill', '#a2e2ff')
                .attr('class', 'textProduct')
                .text('Операций');

            let operationsValues = svgMenu
                .append('text')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('font-size', '25px')
                .attr('x', '100')
                .attr('y', '430')
                .attr('text-anchor', 'middle')
                .attr('class', 'textProduct')
                .attr('fill', '#a2e2ff')
                .text(this.data.operations);

            let critical = svgMenu
                .append('text')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('font-size', '25px')
                .attr('x', '100')
                .attr('y', '480')
                .attr('text-anchor', 'middle')
                .attr('fill', 'orange')
                .attr('class', 'textProduct')
                .text('Отклонений');

            let ctiticalValuues = svgMenu
                .append('text')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('font-size', '25px')
                .attr('x', '100')
                .attr('y', '520')
                .attr('text-anchor', 'middle')
                .attr('class', 'textProduct')
                .attr('fill', 'orange')
                .text(this.data.criticalOperations);

            for (let item of leftBorder) {
                item.classList.remove('st5');
                item.classList.add('st5-critical');
            }
            for (let item of Circle) {
                item.classList.remove('st6');
                item.classList.add('st6-critical');
            }
            for (let item of rightBorder) {
                item.classList.remove('st7');
                item.classList.add('st7-critical');
            }
        } else {
            let middleText3 = svgMenu
                .append('text')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('font-size', '25px')
                .attr('x', '100')
                .attr('y', '420')
                .attr('text-anchor', 'middle')
                .attr('fill', '#a2e2ff')
                .attr('class', 'textProduct')
                .text('Операций');

            let middleText4 = svgMenu
                .append('text')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('font-size', '25px')
                .attr('x', '100')
                .attr('y', '500')
                .attr('text-anchor', 'middle')
                .attr('class', 'textProduct')
                .attr('fill', '#a2e2ff')
                .text(this.data.operations);

            for (let item of leftBorderC) {
                item.classList.remove('st5-critical');
                item.classList.add('st5');
            }
            for (let item of CircleC) {
                item.classList.remove('st6-critical');
                item.classList.add('st6');
            }
            for (let item of rightBorderC) {
                item.classList.remove('st7-critical');
                item.classList.add('st7');
            }
        }

        //  this.maxPage = dataStorage.length;

        let indexPies = this.indexPie;
        let indexPies1 = this.indexPie;

        let newProductXY = [];
        let newStorageXY = [];

        for (let i = pieStartStorage; i <= pieEndStorage; i++) {
            newStorageXY.push(this.storageXY[i]);
        }

        for (let i = pieStart; i <= pieEnd; i++) {
            newProductXY.push(this.productXY[i]);
        }

        for (let pie of newProductXY) {
            let indexProducts = this.indexProduct;

            for (let textProduct of data) {
                if (indexPies === indexProducts) {
                    if (pie.point === 3) {
                        if (!this.checkSocket) {
                            this.savePositionProduct = textProduct.name;
                        }
                        if (textProduct.criticalValue) {
                            let valueBadText = svgMenu
                                .append('text')
                                .attr(
                                    'font-family',
                                    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
                                )
                                .attr('font-size', '25px')
                                .attr('x', pie.x)
                                .attr('y', pie.y - 20)
                                .attr('text-anchor', 'middle')
                                .attr('fill', 'white')
                                .attr('class', 'textProduct')
                                .text(textProduct.name);

                            let middleText2 = svgMenu
                                .append('text')
                                .attr(
                                    'font-family',
                                    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
                                )
                                .attr('font-size', '32px')
                                .attr('x', pie.x)
                                .attr('y', pie.y + 40)
                                .attr('text-anchor', 'middle')
                                .attr('fill', 'white')
                                .attr('class', 'textProduct')
                                .text(textProduct.value);

                            let middleText3 = svgMenu
                                .append('text')
                                .attr(
                                    'font-family',
                                    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
                                )
                                .attr('font-size', '25px')
                                .attr('x', pie.x)
                                .attr('y', pie.y + 100)
                                .attr('text-anchor', 'middle')
                                .attr('fill', 'orange')
                                .attr('class', 'textProduct')
                                .text(textProduct.criticalValue);

                            this.indexData = indexProducts;
                        } else {
                            let valueBadText = svgMenu
                                .append('text')
                                .attr(
                                    'font-family',
                                    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
                                )
                                .attr('font-size', '25px')
                                .attr('x', pie.x)
                                .attr('y', pie.y)
                                .attr('text-anchor', 'middle')
                                .attr('fill', 'white')
                                .attr('class', 'textProduct')
                                .text(textProduct.name);

                            let middleText2 = svgMenu
                                .append('text')
                                .attr(
                                    'font-family',
                                    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
                                )
                                .attr('font-size', '40px')
                                .attr('x', pie.x)
                                .attr('y', pie.y + 80)
                                .attr('text-anchor', 'middle')
                                .attr('fill', '#a2e2ff')
                                .attr('class', 'textProduct')
                                .text(textProduct.value);
                            this.indexData = indexProducts;
                        }
                    } else {
                        let valueGoodText = svgMenu
                            .append('text')
                            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                            .attr('font-size', '25px')
                            .attr('x', pie.x)
                            .attr('y', pie.y)
                            .attr('text-anchor', 'middle')
                            .attr('fill', '#a2e2ff')
                            .attr('cursor', 'pointer')
                            .attr('class', 'textProduct')
                            .text(textProduct.name)
                            .on('click', () => {
                                this.onButtonChangeProduct(textProduct.name);
                                this.countClickChangeStorage = 0;
                                this.savePositionProduct = textProduct.name;
                            });
                        this.htmlProduct = textProduct.name;
                    }
                }
                indexProducts++;
            }
            indexPies++;
        }

        for (let pie of newStorageXY) {
            let indexStorage = this.indexStorage;
            for (let textStorage of dataStorage) {
                if (indexPies1 === indexStorage) {
                    if (pie.point === 3) {
                        if (textStorage.status === 'critical') {
                            this.criticalPage.push(textStorage.id);
                        }
                        let valueBadText = svgMenu
                            .append('text')
                            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                            .attr('font-size', '25px')
                            .attr('x', pie.x)
                            .attr('y', pie.y)
                            .attr('text-anchor', 'middle')
                            .attr('fill', 'white')
                            .attr('class', 'textValues')
                            .text(textStorage.nameStorage);

                        let middleText2 = svgMenu
                            .append('text')
                            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                            .attr('font-size', '25px')
                            .attr('x', pie.x)
                            .attr('y', pie.y + 80)
                            .attr('text-anchor', 'middle')
                            .attr('fill', '#a2e2ff')
                            .attr('class', 'textValues')
                            .text(textStorage.valueStorage);
                    } else {
                        if (textStorage.status === 'critical') {
                            this.criticalPage.push(textStorage.id);
                            let valueGoodText = svgMenu
                                .append('text')
                                .attr(
                                    'font-family',
                                    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
                                )
                                .attr('font-size', '25px')
                                .attr('x', pie.x)
                                .attr('y', pie.y)
                                .attr('text-anchor', 'middle')
                                .attr('fill', 'orange')
                                .attr('cursor', 'pointer')
                                .attr('class', 'textValues')
                                .attr('id', indexStorage)
                                .text(textStorage.nameStorage)
                                .on('click', () => {
                                    this.countClickChangeStorage++;
                                    this.onButtonChangeStorage(textStorage.id, dataStorage);
                                    this.savePositionStorage = textStorage.id;
                                    this.saveDataStorage = [];
                                    for (let item of dataStorage) {
                                        this.saveDataStorage.push(item);
                                    }
                                });
                        } else {
                            let valueGoodText = svgMenu
                                .append('text')
                                .attr(
                                    'font-family',
                                    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
                                )
                                .attr('font-size', '25px')
                                .attr('x', pie.x)
                                .attr('y', pie.y)
                                .attr('text-anchor', 'middle')
                                .attr('fill', '#a2e2ff')
                                .attr('cursor', 'pointer')
                                .attr('class', 'textValues')
                                .attr('id', indexStorage)
                                .text(textStorage.nameStorage)
                                .on('click', () => {
                                    this.countClickChangeStorage++;
                                    this.onButtonChangeStorage(textStorage.id, dataStorage);
                                    this.savePositionStorage = textStorage.id;
                                    this.saveDataStorage = [];
                                    for (let item of dataStorage) {
                                        this.saveDataStorage.push(item);
                                    }
                                });
                        }
                        this.htmlDataStorage = dataStorage;
                        this.htmlStorage = textStorage.nameStorage;
                    }
                }
                indexStorage++;
            }
            indexPies1++;
        }
    }

    public drawBak(el) {
        this.isCriticalArrow = false;
        this.tankPicture = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('height', '100%')
            .attr('width', '100%')
            .attr('class', 'textProduct')
            .attr('viewBox', '0 0 350 450');

        let pictureContainer = this.tankPicture
            .append('image')
            .attr('xlink:href', './assets/pic/OilControl/Bak.png')
            .attr('height', '450px')
            .attr('width', '350px')
            .attr('x', '0')
            .attr('class', 'textProduct')
            .attr('y', '0');
        let rect = this.tankPicture
            .append('rect')
            .attr('fill', '#a2e2ff')
            .attr('opacity', '0.9')
            .attr('height', this.activeStorage.tank.tankLevel * 2.2)
            .attr('width', '260px')
            .attr('x', '63')
            .attr('class', 'textProduct')
            .attr('y', this.rectYHeight - this.activeStorage.tank.tankLevel * 2.2 + 10);

        for (let item of this.activeStorage.tank.tankValues) {
            if (item.status === 'critical') {
                this.isCriticalArrow = true;
                this.checkCriticalTank = true;
                let bakValue = this.tankPicture
                    .append('text')
                    .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                    .attr('font-size', '38px')
                    .attr('x', '190')
                    .attr('y', '100')
                    .attr('text-anchor', 'middle')
                    .attr('class', 'textProduct')
                    .attr('fill', 'orange')
                    .text(item.valueFirst);
                break;
            }
        }
        if (this.checkCriticalTank === false) {
            let bakValue = this.tankPicture
                .append('text')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('font-size', '38px')
                .attr('x', '190')
                .attr('y', '100')
                .attr('text-anchor', 'middle')
                .attr('class', 'textProduct')
                .attr('fill', 'white')
                .text(this.activeStorage.tank.tankValues[0].valueFirst);
        }
        this.checkCriticalTank = false;
    }

    public onButtonChangeProduct(index) {
        this.clearProduct();
        let dataStorages;
        if (this.countClickChange === 0 && !this.checkSocket) {
            this.changeMassiv(index, this.data.products);
            this.indexTestStorage = this.countStorage(this.newArrayProduct[2]);
            this.FilterStorageCircle(this.newArrayProduct[2], this.indexTestStorage);
            this.countClickChange++;
        } else if (this.checkSocket && this.countClickChange === 0) {
            //  this.changeMassiv(index, this.data.products);
            this.newArrayProduct = this.data.products;
            this.indexTestStorage = this.countStorage(this.newArrayProduct[2]);
            this.FilterStorageCircle(this.newArrayProduct[2], this.indexTestStorage);
            // this.indexTestStorage = this.countStorage(this.data.products[index]);
            // this.FilterStorageCircle(this.data.products[index], this.indexTestStorage);
        } else if (this.checkSocket) {
            this.changeMassiv(index, this.data.products);
            this.indexTestStorage = this.countStorage(this.newArrayProduct[2]);
            this.FilterStorageCircle(this.newArrayProduct[2], this.indexTestStorage);
        } else {
            this.changeMassiv(index, this.newArrayProduct);
            this.indexTestStorage = this.countStorage(this.newArrayProduct[2]);
            this.FilterStorageCircle(this.newArrayProduct[2], this.indexTestStorage);
        }
        /*
        for (let item of this.newArrayProduct[2].storages) {
            if (this.newArrayProduct[2].storages.length < 4) {
                this.currentPage = 2;
            } else {
                this.currentPage = 3;
            }
        }
        */
        this.drawOnCircle(
            this.oilCircle.nativeElement,
            this.pieStart,
            this.pieEnd,
            this.pieStartStorage,
            this.pieEndStorage,
            this.newArrayProduct,
            this.newArrayProduct[2].storages
        );
        this.drawBak(this.oilBak.nativeElement);
        this.drawPicture(this.oilIcon.nativeElement);
    }

    public onNextStorage(event) {
        this.clickPaginator = true;
        if (this.countClickChange === 0) {
            for (let item of this.data.products[2].storages) {
                if (item.id === event) {
                    if (this.countClickChangeStorage === 0) {
                        this.onButtonChangeStorage(item.id, this.data.products[2].storages);
                    } else {
                        this.onButtonChangeStorage(item.id, this.htmlDataStorage);
                    }
                }
            }
        } else {
            for (let item of this.htmlDataStorage) {
                if (item.id === event) {
                    this.onButtonChangeStorage(item.id, this.htmlDataStorage);
                }
            }
        }
    }

    public onButtonChangeStorage(index, data) {
        this.currentPage = index;
        this.saveCurrentPage = this.currentPage;
        this.clearProduct();

        if (this.countClickChange === 0 && !this.checkSocket) {
            if (this.countClickChangeStorage === 0) {
                this.changeMassivStorage(index, data);
                this.countClickChangeStorage++;
            } else {
                this.changeMassivStorage(index, data);
            }
            this.drawOnCircle(
                this.oilCircle.nativeElement,
                this.pieStart,
                this.pieEnd,
                this.pieStartStorage,
                this.pieEndStorage,
                this.data.products,
                this.newArrayStorage
            );
        } else {
            if (this.countClickChangeStorage === 0 && this.countClickChange !== 0) {
                this.newArrayStorage = data;
                // this.changeMassivStorage(index, data);
                this.countClickChangeStorage++;
            } else if (this.countClickChangeStorage !== 0 && this.checkSocket) {
                this.changeMassivStorage(index, data);
            } else {
                this.countClickChangeStorage++;
                this.changeMassivStorage(index, data);
                //this.changeMassivStorage(index, this.newArrayStorage);
            }
            this.drawOnCircle(
                this.oilCircle.nativeElement,
                this.pieStart,
                this.pieEnd,
                this.pieStartStorage,
                this.pieEndStorage,
                this.newArrayProduct,
                this.newArrayStorage
            );
        }
        this.drawBak(this.oilBak.nativeElement);
        this.drawPicture(this.oilIcon.nativeElement);
    }

    public clearStorage() {
        let clears = document.querySelectorAll('.textValues');
        clears.forEach((el) => el.remove());
    }

    public clearProduct() {
        this.clearStorage();
        let clears = document.querySelectorAll('.textProduct');
        clears.forEach((el) => el.remove());
    }

    public changeMassiv(el, data) {
        let lengthData = data.length;
        let move;
        let indexProduct = 0;
        let newIndexProduct = 0;
        for (let item of data) {
            indexProduct++;
            if (item.name === el) {
                if (indexProduct > 2) {
                    move = 'next';
                    if (indexProduct === 4) {
                        newIndexProduct = 1;
                        this.shiftMassiv(newIndexProduct, move);
                    } else if (indexProduct > 5) {
                        newIndexProduct = indexProduct - 3;
                        this.shiftMassiv(newIndexProduct, move);
                    } else {
                        newIndexProduct = 2;
                        this.shiftMassiv(newIndexProduct, move);
                    }
                } else {
                    move = 'prev';
                    if (indexProduct === 2) {
                        newIndexProduct = 1;
                        this.shiftMassiv(newIndexProduct, move);
                    } else {
                        newIndexProduct = 2;
                        this.shiftMassiv(newIndexProduct, move);
                    }
                }
            }
        }
    }

    public changeMassivStorage(el, data) {
        let move;
        let lengthData = data.length;
        let indexProduct = 0;
        let newIndexProduct = 0;
        for (let item of data) {
            indexProduct++;
            if (item.id === el) {
                if (indexProduct > 2) {
                    move = 'next';
                    if (data.length === 5) {
                        lengthData = lengthData - 1;
                    }
                    newIndexProduct = lengthData - indexProduct;
                    if (indexProduct === 4) {
                        newIndexProduct = 1;
                        this.shiftMassivStorage(newIndexProduct, move, data);
                    } else {
                        newIndexProduct = 2;
                        this.shiftMassivStorage(newIndexProduct, move, data);
                    }
                } else {
                    move = 'prev';
                    if (data.length === 1) {
                        lengthData = lengthData - 1;
                    }
                    newIndexProduct = lengthData - indexProduct;
                    if (indexProduct === 2) {
                        newIndexProduct = 1;
                        this.shiftMassivStorage(newIndexProduct, move, data);
                    } else if (indexProduct === 1 && data.length === 2) {
                        newIndexProduct = 1;
                        this.shiftMassivStorage(newIndexProduct, move, data);
                    } else {
                        newIndexProduct = 2;
                        this.shiftMassivStorage(newIndexProduct, move, data);
                    }
                }
            }
        }
    }

    public shiftMassiv(el, move) {
        if (this.countClickChange === 0) {
            this.newArrayProduct = [...this.data.products];
        } else if (this.checkSocket) {
            this.newArrayProduct = [...this.data.products];
        } else {
            this.newArrayProduct = [...this.newArrayProduct];
        }
        if (move === 'prev') {
            for (let i = 0; i < el; i++) {
                this.newArrayProduct.unshift(this.newArrayProduct.pop());
            }
        } else {
            for (let i = 0; i < el; i++) {
                this.newArrayProduct.push(this.newArrayProduct.shift());
            }
        }
    }

    public shiftMassivStorage(el, move, data) {
        if (this.countClickChangeStorage === 0) {
            this.newArrayStorage = [...data];
        } else if (this.checkSocket) {
            this.newArrayStorage = [...data];
        } else {
            //   this.newArrayStorage = [...this.newArrayStorage];
            this.newArrayStorage = [...data];
        }

        if (move === 'prev') {
            for (let i = 0; i < el; i++) {
                this.newArrayStorage.unshift(this.newArrayStorage.pop());
            }
        } else {
            for (let i = 0; i < el; i++) {
                this.newArrayStorage.push(this.newArrayStorage.shift());
            }
        }
    }

    public FilterCircle(data, el) {
        if (data[el + 1] === undefined && el === 0) {
            this.pieEnd = 2;
            this.pieStart = 2;
            this.indexProductActive = 0;
            this.indexTestStorage = this.countStorage(data[0]);
            this.FilterStorageCircle(data[el], this.indexTestStorage);
            return this.drawOnCircle(
                this.oilCircle.nativeElement,
                this.pieStart,
                this.pieEnd,
                this.pieStartStorage,
                this.pieEndStorage,
                data,
                data[0].storages
            );
        } else if (data[el + 1] !== undefined && el < 3) {
            this.pieStart = this.pieStart - 1;
            this.indexTestProduct++;
            this.indexProductActive = 2;
            return this.FilterCircle(data, this.indexTestProduct);
        } else if (data[el + 1] === undefined && el === 3) {
            this.pieStart = 0;
            this.pieEnd = 3;
            this.indexProductActive = 2;
            this.FilterStorageCircle(data[el - 1], this.indexTestStorage);
            return this.drawOnCircle(
                this.oilCircle.nativeElement,
                this.pieStart,
                this.pieEnd,
                this.pieStartStorage,
                this.pieEndStorage,
                data,
                data[2].storages
            );
        } else if (data[el + 1] === undefined) {
            this.pieStart = 0;
            this.pieEnd = 4;
            this.indexProductActive = 2;
            this.indexTestStorage = this.countStorage(data[2]);
            this.FilterStorageCircle(data[2], this.indexTestStorage);
            return this.drawOnCircle(
                this.oilCircle.nativeElement,
                this.pieStart,
                this.pieEnd,
                this.pieStartStorage,
                this.pieEndStorage,
                data,
                data[2].storages
            );
        } else {
            this.pieStart = 0;
            this.pieEnd = 4;
            this.indexProductActive = 2;
            this.indexTestStorage = this.countStorage(data[2]);
            this.FilterStorageCircle(data[2], this.indexTestStorage);
            return this.drawOnCircle(
                this.oilCircle.nativeElement,
                this.pieStart,
                this.pieEnd,
                this.pieStartStorage,
                this.pieEndStorage,
                data,
                data[2].storages
            );
        }
    }

    public countStorage(data) {
        let count = 0;
        for (let item of data.storages) {
            count++;
        }
        return count - 1;
    }

    public FilterStorageCircle(data, el) {
        this.maxPage = el + 1;
        this.pieStartStorage = 2;
        if (data.storages[el + 1] === undefined && el === 0) {
            this.pieEndStorage = 2;
            this.pieStartStorage = 2;
            this.currentPage = 1;
        } else if (data.storages[el + 1] !== undefined && el < 3) {
            this.pieStartStorage = this.pieStartStorage - 1;
            this.indexTestStorage++;
            this.currentPage = 2;
            return this.FilterStorageCircle(data, this.indexTestStorage);
        } else if (data.storages[el + 1] === undefined && el === 1) {
            this.pieStartStorage = 1;
            this.pieEndStorage = 2;
            this.currentPage = 3;
        } else if (data.storages[el + 1] === undefined && el === 3) {
            this.pieStartStorage = 0;
            this.pieEndStorage = 3;
            this.currentPage = 3;
        } else if (data.storages[el + 1] === undefined && el === 4) {
            this.pieStartStorage = 0;
            this.pieEndStorage = 3;
            this.currentPage = 3;
        } else {
            this.pieStartStorage = 0;
            this.pieEndStorage = 4;
            this.currentPage = 3;
        }
    }
}
