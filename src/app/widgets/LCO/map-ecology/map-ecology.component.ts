import { Component, ElementRef, ViewChild, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';

declare var d3: any;

@Component({
    selector: 'evj-map-ecology',
    templateUrl: './map-ecology.component.html',
    styleUrls: ['./map-ecology.component.scss'],
})
export class MapEcologyComponent extends WidgetPlatform implements OnInit, OnDestroy {

    public startY: number = 55.6611;
    public startX: number = 37.7726;

    public startImgY: number = 55.6611;
    public startImgX: number = 37.7395;

    public clat: number;
    public clon: number;

    public namePoint: string;
    public idPoint: number;

    public svgimg: any;

    public indexS: number;

    public isActive: boolean = false;

    public datas;

    @ViewChild('myCircle') myCircle: ElementRef;

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.drawMapSocket(ref);
    }

    public drawMapSocket(ref): void {
        if (this.datas == null) {
            this.datas = ref.points;
            this.regexText(this.datas);
            this.drawMap(this.myCircle.nativeElement, this.datas);
            this.namePoint = this.datas[0].name;
        } else {
            this.clearMap();
            this.datas = ref.points;
            this.regexText(this.datas);
            this.drawMap(this.myCircle.nativeElement, this.datas);
        }
    }

    public clearMap(): void {
        try {
            let getSvg = document.getElementById('svg1');
            getSvg.remove();
        } catch (error) { }
    }

    public drawMap(el, data): void {
        const svg = d3
            .select(el)
            .append('svg')
            .attr('min-width', '200px')
            .attr('height', '100%')
            .attr('width', '100%')
            .attr('id', 'svg1')
            .attr('viewBox', '37.7726 55.6611 0.0000001 0.0554');

        this.svgimg = svg
            .append('image')
            .attr('xlink:href', 'assets/img/mapEcology2.jpg')
            .attr('height', '0.0554')
            .attr('width', '0.07225')
            .attr('y', this.startImgY)
            .attr('x', this.startImgX);

        for (let item of data) {
            this.clat = 2.15 * (this.startImgY - item.latitude) + this.startY;
            this.clon = this.startImgX + (item.longitude - this.startX) * 1.2;
            if (this.namePoint === item.name) {
                svg.append('image')
                    .attr('xlink:href', 'assets/pic/point2.svg')
                    .attr('y', this.clat)
                    .attr('x', this.clon)
                    .attr('height', '0.0022px')
                    .attr('width', '0.0027px')
                    .attr('id', () => {
                        if (item.isCritical) {
                            return 'critical';
                        } else {
                            return 'notcritical';
                        }
                    })
                    .attr('class', item.name)
                    .on('click', () => {
                        if (item.isCritical) {
                            svg.selectAll('#notcritical').attr(
                                'xlink:href',
                                'assets/pic/point.svg'
                            );
                            svg.selectAll('#critical').attr('xlink:href', 'assets/pic/point3.svg');
                            svg.select('.' + item.name).attr(
                                'xlink:href',
                                'assets/pic/point2.svg'
                            );
                            return (this.namePoint = item.name);
                        } else {
                            svg.selectAll('#notcritical').attr(
                                'xlink:href',
                                'assets/pic/point.svg'
                            );
                            svg.selectAll('#critical').attr('xlink:href', 'assets/pic/point3.svg');
                            svg.select('.' + item.name).attr(
                                'xlink:href',
                                'assets/pic/point2.svg'
                            );
                            return (this.namePoint = item.name);
                        }

                    });
            } else {
                svg.append('image')
                    .attr('xlink:href', () => {
                        if (item.isCritical) {
                            return 'assets/pic/point.svg';
                        } else {
                            return 'assets/pic/point3.svg';
                        }
                    })
                    .attr('y', this.clat)
                    .attr('x', this.clon)
                    .attr('height', '0.0022')
                    .attr('width', '0.0027')
                    .attr('id', () => {
                        if (item.isCritical) {
                            return 'critical';
                        } else {
                            return 'notcritical';
                        }
                    })
                    .attr('class', item.name)
                    .on('click', () => {
                        if (item.isCritical) {
                            svg.selectAll('#notcritical').attr(
                                'xlink:href',
                                'assets/pic/point.svg'
                            );
                            svg.selectAll('#critical').attr('xlink:href', 'assets/pic/point3.svg');
                            svg.select('.' + item.name).attr(
                                'xlink:href',
                                'assets/pic/point2.svg'
                            );
                            return (this.namePoint = item.name);
                        } else {
                            svg.selectAll('#notcritical').attr(
                                'xlink:href',
                                'assets/pic/point.svg'
                            );
                            svg.selectAll('#critical').attr('xlink:href', 'assets/pic/point3.svg');
                            svg.select('.' + item.name).attr(
                                'xlink:href',
                                'assets/pic/point2.svg'
                            );
                            return (this.namePoint = item.name);
                        }
                    });
            }
        }
    }

    public regexText(data): void {
        for (let dat of data) {
            for (let item of dat.attributes) {
                let regex = /\d+/gi;
                let newText = item.name.replace(regex, '<sub>$&</sub>');
                item.name = newText;
            }
        }
    }

    public infoPoint(name): void {
        this.namePoint = name;
    }

    public nextPoint(name): void {
        try {
            for (let [index, item] of this.datas.entries()) {
                if (name === item.name) {
                    index++;
                    this.indexS = index;
                    this.namePoint = this.datas[this.indexS].name;
                    this.clearMap();
                    this.drawMap(this.myCircle.nativeElement, this.datas);
                }
            }
        } catch (error) { }
    }

    public backPoint(name): void {
        try {
            for (let [index, item] of this.datas.entries()) {
                if (name === item.name) {
                    index--;
                    this.indexS = index;
                    this.namePoint = this.datas[this.indexS].name;
                    this.clearMap();
                    this.drawMap(this.myCircle.nativeElement, this.datas);
                }
            }
        } catch (error) { }
    }
}
