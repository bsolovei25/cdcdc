import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { EventEmitter } from '@angular/core';
import { OilControls, OilProducts } from '../../models/oil-control';
import { WidgetPlatform } from '../../models/widget-platform';

export interface IOilControlCoords {
    x: number;
    y: number;
    point?: number;
}

declare var d3: any;

@Component({
    selector: 'evj-oil-control',
    templateUrl: './oil-control.component.html',
    styleUrls: ['./oil-control.component.scss'],
})
export class OilControlComponent extends WidgetPlatform implements OnInit, OnDestroy {
    @ViewChild('oilIcon') oilIcon: ElementRef;
    @ViewChild('oilCircle') oilCircle: ElementRef;
    @ViewChild('borders') borders: ElementRef;
    @ViewChild('line') line: ElementRef;

    public static itemCols: number = 33;
    public static itemRows: number = 12;
    public static minItemCols: number = 33;
    public static minItemRows: number = 12;

    public isVertical: boolean = false;

    public previewTitle: string;

    public data: OilProducts[] = [];

    storageXY: IOilControlCoords[] = [
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

    productXY: IOilControlCoords[] = [
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

    public clickPaginator: boolean = false;

    public indexProduct: number = 0;
    public indexStorage: number = 0;
    public indexPie: number = 0;

    public pieStart: number = 3;
    public pieEnd: number = 3;

    public pieStartStorage: number = 3;
    public pieEndStorage: number = 3;

    public countClickChange: number = 0;
    public countClickChangeStorage: number = 0;

    public newArrayProduct: any = [];
    public newArrayStorage: any = [];

    public indexTestProduct: number = 0;
    public indexTestStorage: number = 0;

    public indexData: number = 0;

    public activeStorage: any;
    public activeProduct: any = [];

    public indexProductActive: number = 0;

    public isCriticalArrow: boolean = false;

    public htmlProduct: number;
    public htmlStorage: number;
    public htmlDataStorage: any = [];

    public newWidth: number;
    public checkWidth: boolean = false;

    public svgMenu: any;
    public tankersPicture: any;
    public svgLine: any;

    public checkRemove: boolean = false;

    public savePosition: boolean = false;
    public savePositionProduct: number;
    public savePositionStorage: number;
    public saveCurrentPage: number;

    public saveDataStorage: any = [];

    public checkSocket: boolean = false;

    public test: boolean = false;

    tankersName = {
        shipAvto: 'Авто',
        shipTrain: 'Поезд',
        shipTube: 'Труба',
    };

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        @Inject('resizeWidget') public resizeWidget: EventEmitter<MouseEvent>
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataConnect(): void {
        super.dataConnect();
    }

    protected dataHandler(ref: any): void {
        console.log(ref);

        this.drawOilControlSocket(ref);
    }

    public mapStorage(): void {
        this.activeProduct = this.data;
        if (this.activeProduct[0].storages.length < 3) {
            this.activeStorage = this.activeProduct[2].storages[1];
        } else if (this.activeProduct[0].storages.length < 2) {
            this.activeStorage = this.activeProduct[0].storages[0];
        } else {
            this.activeStorage = this.activeProduct[0].storages[2];
        }
    }

    drawOilControlSocket(ref): void {
        this.checkSocket = true;
        this.data = ref.products;
        if (this.svgMenu) {
            this.clearProduct();
            this.tankersPicture.remove();
        }
        if (this.svgLine) {
            this.svgLine.remove();
        }
        this.indexTestProduct = this.data.length - 1;
        this.mapStorage();
        this.drawOilControl(this.data);
        if (this.checkSocket === true && this.savePositionProduct !== undefined) {
            this.onButtonChangeProduct(this.savePositionProduct);
            if (this.saveDataStorage.length !== 0) {
                this.onButtonChangeStorage(this.savePositionStorage, this.saveDataStorage);
            }
        }

        this.savePosition = true;
        this.checkSocket = false;
    }

    public onResize(width): void {
        this.checkWidth = width < 600;
    }

    public drawOilControl(data): void {
        this.drawPicture(this.oilIcon?.nativeElement);
        this.FilterCircle(data, this.indexTestProduct);
    }

    public clearOilControl(): void {
        this.clearProduct();
    }

    public drawPicture(el): void {
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

        const tug = './assets/pic/Icons3D/Tug.png';
        const tube = './assets/pic/Icons3D/Tube.png';
        const cis = './assets/pic/Icons3D/Cistern.png';

        let countPicture = 0;

        for (const i of this.activeStorage?.tankers) {
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

        let isShipped: boolean = false;

        for (const item of this.activeStorage?.tankers) {
            if (item.shipped === true) {
                const value = Math.round(item.value);
                isShipped = true;
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
                        item.nameTanker === 'shipTrain'
                            ? tug
                            : item.nameTanker === 'shipTube'
                            ? tube
                            : cis
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
                    .text(this.tankersName[item.nameTanker]);

                let valueText1 = this.tankersPicture
                    .append('text')
                    .attr('font-family', 'Tahoma bold')
                    .attr('font-size', '14px')
                    .attr('x', x4 + y)
                    .attr('y', '60')
                    .attr('class', 'textProduct')
                    .attr('text-anchor', 'middle')
                    .attr('fill', '#a2e2ff')
                    .text(value);

                x1 += y;
                x2 += y;
                x3 += y;
                x4 += y;
            }
        }

        if (isShipped) {
            this.drawLine(this.line?.nativeElement, countPicture);
        }
    }

    public drawLine(el, count): void {
        let size = 0;
        if (this.newWidth) {
            size = this.newWidth / 100;
        }
        this.svgLine = d3
            .select(el)
            .append('svg')
            .attr('min-width', '300px')
            .attr('height', '45px')
            .attr('width', '100%')
            .attr('class', 'textProduct')
            .attr('viewBox', '-30 20 1200 200');

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

    public drawOnCircle(
        el,
        pieStart,
        pieEnd,
        pieStartStorage,
        pieEndStorage,
        data,
        dataStorage
    ): void {
        this.svgMenu = d3.select(el?.firstElementChild);

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
                .text(data[this.indexProduct].operations);

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
                .text(data[this.indexProduct].criticalOperations);

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
                .text(data[this.indexProduct].operations);

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
                        const valueProduct = Math.round(textProduct.value);
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
                                .text(valueProduct);

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
                            function nameSlicer(name: string, maxStrLen: number): string[] {
                                if (name.length <= maxStrLen) {
                                    return [name];
                                } else if (name.search(' ') > maxStrLen) {
                                    return [`${name.slice(0, maxStrLen - 3)}...`];
                                }
                                const str =
                                    name.length > maxStrLen * 2 - 3
                                        ? `${name.slice(0, maxStrLen * 2).trim()}`
                                        : name;
                                const splitSpaceIndex = str.split('').reduce((acc, item, index) => {
                                    return item === ' ' &&
                                        Math.abs(maxStrLen - index) < Math.abs(maxStrLen - acc)
                                        ? index
                                        : acc;
                                }, 0);
                                const firstStr = str.slice(0, splitSpaceIndex);
                                let secondStr = str.slice(splitSpaceIndex + 1);
                                if (secondStr.length > maxStrLen) {
                                    secondStr = `${secondStr.slice(0, maxStrLen - 3).trim()}...`;
                                }
                                return [firstStr, secondStr];
                            }

                            // НАЗВАНИЕ АКТИВНОГО ПРОДУКТА
                            const nameRows = nameSlicer(textProduct.name, 17);
                            const textPadding = nameRows.length > 1 ? -10 : 0;
                            svgMenu
                                .append('text')
                                .attr(
                                    'font-family',
                                    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
                                )
                                .attr('font-size', '25px')
                                .attr('x', pie.x)
                                .attr('y', pie.y + textPadding)
                                .attr('text-anchor', 'middle')
                                .attr('fill', 'white')
                                .attr('class', 'textProduct')
                                .text(nameRows[0]);

                            if (nameRows.length > 1) {
                                svgMenu
                                    .append('text')
                                    .attr(
                                        'font-family',
                                        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"
                                    )
                                    .attr('font-size', '25px')
                                    .attr('x', pie.x)
                                    .attr('y', pie.y + 30 + textPadding)
                                    .attr('text-anchor', 'middle')
                                    .attr('fill', 'white')
                                    .attr('class', 'textProduct')
                                    .text(nameRows[1]);
                            }

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
                                .text(valueProduct);
                            this.indexData = indexProducts;
                        }
                    } else {
                        function nameSlicer(name: string, maxStrLen: number): string {
                            return name.length > maxStrLen
                                ? `${name.slice(0, maxStrLen - 3).trim()}...`
                                : name;
                        }

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
                            .text(nameSlicer(textProduct.name, 17))
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
                let test = d3.select(
                    el?.firstElementChild.getElementById((indexStorage + 1).toString())
                );
                if (indexPies1 === indexStorage) {
                    if (pie.point === 3) {
                        const valueStorage = Math.round(textStorage.valueStorage);
                        let valueBadText = test
                            .append('text')
                            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                            .attr('font-size', '25px')
                            .attr('x', pie.x)
                            .attr('y', pie.y)
                            .attr('text-anchor', 'middle')
                            .attr('fill', 'white')
                            .attr('class', 'textValues')
                            .text(textStorage.nameStorage);

                        let middleText2 = test
                            .append('text')
                            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                            .attr('font-size', '25px')
                            .attr('x', pie.x)
                            .attr('y', pie.y + 80)
                            .attr('text-anchor', 'middle')
                            .attr('fill', '#a2e2ff')
                            .attr('class', 'textValues')
                            .text(valueStorage);
                    } else {
                        if (textStorage.status === 'critical') {
                            let valueGoodText = test
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
                            let valueGoodText = test
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

    public onButtonChangeProduct(index): void {
        this.clearProduct();
        let newProduct: number;
        if (this.countClickChange === 0 && !this.checkSocket) {
            this.changeMassiv(index, this.data);
            newProduct = this.findAndFilterProduct(
                this.newArrayProduct,
                index,
                this.indexTestStorage
            );
            this.countClickChange++;
        } else if (this.checkSocket && this.countClickChange === 0) {
            this.newArrayProduct = this.data;
            newProduct = this.findAndFilterProduct(
                this.newArrayProduct,
                index,
                this.indexTestStorage
            );
        } else if (this.checkSocket) {
            this.changeMassiv(index, this.data);
            newProduct = this.findAndFilterProduct(
                this.newArrayProduct,
                index,
                this.indexTestStorage
            );
        } else {
            this.changeMassiv(index, this.newArrayProduct);
            newProduct = this.findAndFilterProduct(
                this.newArrayProduct,
                index,
                this.indexTestStorage
            );
        }
        this.drawOnCircle(
            this.oilCircle?.nativeElement,
            this.pieStart,
            this.pieEnd,
            this.pieStartStorage,
            this.pieEndStorage,
            this.newArrayProduct,
            this.newArrayProduct[newProduct].storages
        );
        // this.drawBak(this.oilBak.nativeElement);
        this.drawPicture(this.oilIcon?.nativeElement);
    }

    findAndFilterProduct(arr, index, indexStorage): number {
        const indexProductStorage = arr.findIndex((e) => e.name === index);
        this.indexTestStorage = this.countStorage(arr[indexProductStorage]);
        this.FilterStorageCircle(arr[indexProductStorage], indexStorage);
        return indexProductStorage;
    }

    public onButtonChangeStorage(index, data): void {
        this.clearProduct();

        if (this.countClickChange === 0 && !this.checkSocket) {
            if (this.countClickChangeStorage === 0) {
                this.changeMassivStorage(index, data);
                this.countClickChangeStorage++;
            } else {
                this.changeMassivStorage(index, data);
            }
            this.drawOnCircle(
                this.oilCircle?.nativeElement,
                this.pieStart,
                this.pieEnd,
                this.pieStartStorage,
                this.pieEndStorage,
                this.data,
                this.newArrayStorage
            );
        } else {
            if (this.countClickChangeStorage === 0 && this.countClickChange !== 0) {
                this.newArrayStorage = data;
                this.countClickChangeStorage++;
            } else if (this.countClickChangeStorage !== 0 && this.checkSocket) {
                this.changeMassivStorage(index, data);
            } else {
                this.countClickChangeStorage++;
                this.changeMassivStorage(index, data);
            }
            this.drawOnCircle(
                this.oilCircle?.nativeElement,
                this.pieStart,
                this.pieEnd,
                this.pieStartStorage,
                this.pieEndStorage,
                this.newArrayProduct,
                this.newArrayStorage
            );
        }
        // this.drawBak(this.oilBak.nativeElement);
        this.drawPicture(this.oilIcon?.nativeElement);
    }

    ///Возможно зачищение всех нефтеконтролей

    public clearStorage(): void {
        const clears = this.oilCircle?.nativeElement.querySelectorAll('.textValues');
        clears.forEach((el) => el.remove());
        this.clearPicture();
        this.clearLine();
    }

    public clearProduct(): void {
        this.clearStorage();
        const clears = this.oilCircle?.nativeElement.querySelectorAll('.textProduct');
        clears.forEach((el) => el.remove());
    }

    public clearPicture(): void {
        const clears = this.oilIcon?.nativeElement.querySelectorAll('.textProduct');
        clears.forEach((el) => el.remove());
    }

    public clearLine(): void {
        const clears = this.line?.nativeElement.querySelectorAll('.textProduct');
        clears.forEach((el) => el.remove());
    }

    public changeMassiv(el, data): void {
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
                    if (indexProduct === 1) {
                        newIndexProduct = 2;
                        this.shiftMassiv(newIndexProduct, move);
                    } else {
                        newIndexProduct = 1;
                        this.shiftMassiv(newIndexProduct, move);
                    }
                }
            }
        }
    }

    public changeMassivStorage(el, data): void {
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

    public shiftMassiv(el, move): void {
        if (this.countClickChange === 0) {
            this.newArrayProduct = [...this.data];
        } else if (this.checkSocket) {
            this.newArrayProduct = [...this.data];
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

    public shiftMassivStorage(el, move, data): void {
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

    public FilterCircle(data, el): void {
        if (data[el + 1] === undefined && el === 0) {
            this.pieEnd = 2;
            this.pieStart = 2;
            this.indexProductActive = 0;
            this.indexTestStorage = this.countStorage(data[0]);
            this.FilterStorageCircle(data[el], this.indexTestStorage);
            return this.drawOnCircle(
                this.oilCircle?.nativeElement,
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
                this.oilCircle?.nativeElement,
                this.pieStart,
                this.pieEnd,
                this.pieStartStorage,
                this.pieEndStorage,
                data,
                data[2].storages
            );
        } else if (data[el + 1] === undefined && el < 2) {
            this.pieStart = 1;
            this.pieEnd = 2;
            this.indexProductActive = 2;
            this.indexTestStorage = this.countStorage(data[el]);
            this.FilterStorageCircle(data[el], this.indexTestStorage);
            return this.drawOnCircle(
                this.oilCircle?.nativeElement,
                this.pieStart,
                this.pieEnd,
                this.pieStartStorage,
                this.pieEndStorage,
                data,
                data[el].storages
            );
        } else {
            this.pieStart = 0;
            this.pieEnd = 4;
            this.indexProductActive = 2;
            this.indexTestStorage = this.countStorage(data[2]);
            this.FilterStorageCircle(data[2], this.indexTestStorage);
            return this.drawOnCircle(
                this.oilCircle?.nativeElement,
                this.pieStart,
                this.pieEnd,
                this.pieStartStorage,
                this.pieEndStorage,
                data,
                data[2].storages
            );
        }
    }

    public countStorage(data): number {
        let count = 0;
        for (let item of data.storages) {
            count++;
        }
        return count - 1;
    }

    public FilterStorageCircle(data, el): void {
        const count = data.storages.length;
        this.pieStartStorage = 2;
        if (count === 0) {
            this.pieEndStorage = 2;
            this.pieStartStorage = 2;
        } else if (count === 1) {
            this.pieStartStorage = 2;
            this.pieEndStorage = 2;
        } else if (count === 2) {
            this.pieStartStorage = 1;
            this.pieEndStorage = 2;
        } else if (count === 3) {
            this.pieStartStorage = 0;
            this.pieEndStorage = 2;
        } else if (count === 4) {
            this.pieStartStorage = 0;
            this.pieEndStorage = 3;
        } else {
            this.pieStartStorage = 0;
            this.pieEndStorage = 4;
        }
    }
}
