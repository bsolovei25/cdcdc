import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    AfterViewInit,
    Inject,
    OnDestroy,
} from '@angular/core';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';
import { Subscription } from 'rxjs';

declare var d3: any;

@Component({
    selector: 'evj-map-ecology',
    templateUrl: './map-ecology.component.html',
    styleUrls: ['./map-ecology.component.scss'],
})
export class MapEcologyComponent implements AfterViewInit, OnInit, OnDestroy {
    static itemCols = 32;
    static itemRows = 12;

    public startY = 55.6611;
    public startX = 37.7726;

    public startImgY = 55.6611;
    public startImgX = 37.7395;

    public clat;
    public clon;

    public namePoint;
    public idPoint;

    public title;
    public code;
    public units;
    public name;
    public previewTitle: string;

    public svgimg;

    public indexS;

    public isActive = false;

    private subscription: Subscription;

    @ViewChild('myCircle', { static: false }) myCircle: ElementRef;

    public datas;

    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.title = data.title;
            this.code = data.code;
            this.units = data.units;
            this.name = data.name;
            this.previewTitle = data.widgetType;
        });
    }

    ngOnInit() {}

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngAfterViewInit() {
        this.showMock(this.isMock);
    }

    private wsConnect() {
        this.widgetService.getWidgetLiveDataFromWS(this.id, 'map-ecology').subscribe((ref) => {
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

    public clearMap() {
        try {
            let getSvg = document.getElementById('svg1');
            getSvg.remove();
        } catch (error) {}
    }

    public drawMap(el, data) {
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
            .attr('xlink:href', '/assets/img/mapEcology2.jpg')
            .attr('height', '0.0554')
            .attr('width', '0.07225')
            .attr('y', this.startImgY)
            .attr('x', this.startImgX);

        for (let item of data) {
            this.clat = 2.15 * (this.startImgY - item.latitude) + this.startY;
            this.clon = this.startImgX + (item.longitude - this.startX) * 1.2;
            if (this.namePoint == item.name) {
                if (item.isCritical) {
                    svg.append('image')
                        .attr('xlink:href', '/assets/pic/point2.svg')
                        .attr('y', this.clat)
                        .attr('x', this.clon)
                        .attr('height', '0.0022')
                        .attr('width', '0.0027')
                        .attr('id', 'critical')
                        .attr('class', item.name)
                        .on('click', () => {
                            svg.selectAll('#notcritical').attr(
                                'xlink:href',
                                '/assets/pic/point.svg'
                            );
                            svg.selectAll('#critical').attr('xlink:href', '/assets/pic/point3.svg');
                            svg.select('.' + item.name).attr(
                                'xlink:href',
                                '/assets/pic/point2.svg'
                            );
                            return (this.namePoint = item.name);
                            //this.infoPoint(item.name);
                        });
                } else {
                    svg.append('image')
                        .attr('xlink:href', '/assets/pic/point2.svg')
                        .attr('y', this.clat)
                        .attr('x', this.clon)
                        .attr('height', '0.0022')
                        .attr('width', '0.0027')
                        .attr('id', 'notcritical')
                        .attr('class', item.name)
                        .on('click', () => {
                            svg.selectAll('#notcritical').attr(
                                'xlink:href',
                                '/assets/pic/point.svg'
                            );
                            svg.selectAll('#critical').attr('xlink:href', '/assets/pic/point3.svg');
                            svg.select('.' + item.name).attr(
                                'xlink:href',
                                '/assets/pic/point2.svg'
                            );
                            return (this.namePoint = item.name);
                            //this.infoPoint(item.name);
                        });
                }
            } else {
                if (item.isCritical) {
                    svg.append('image')
                        .attr('xlink:href', '/assets/pic/point3.svg')
                        .attr('y', this.clat)
                        .attr('x', this.clon)
                        .attr('height', '0.0022')
                        .attr('width', '0.0027')
                        .attr('id', 'critical')
                        .attr('class', item.name)
                        .on('click', () => {
                            svg.selectAll('#notcritical').attr(
                                'xlink:href',
                                '/assets/pic/point.svg'
                            );
                            svg.selectAll('#critical').attr('xlink:href', '/assets/pic/point3.svg');
                            svg.select('.' + item.name).attr(
                                'xlink:href',
                                '/assets/pic/point2.svg'
                            );
                            return (this.namePoint = item.name);
                            //this.infoPoint(item.name);
                        });
                } else {
                    svg.append('image')
                        .attr('xlink:href', '/assets/pic/point.svg')
                        .attr('y', this.clat)
                        .attr('x', this.clon)
                        .attr('height', '0.0022')
                        .attr('width', '0.0027')
                        .attr('id', 'notcritical')
                        .attr('class', item.name)
                        .on('click', () => {
                            svg.selectAll('#notcritical').attr(
                                'xlink:href',
                                '/assets/pic/point.svg'
                            );
                            svg.selectAll('#critical').attr('xlink:href', '/assets/pic/point3.svg');
                            svg.select('.' + item.name).attr(
                                'xlink:href',
                                '/assets/pic/point2.svg'
                            );
                            return (this.namePoint = item.name);
                            //infoPoint(item.name);
                        });
                }
            }
        }
    }

    public regexText(data) {
        for (let dat of data) {
            for (let item of dat.attributes) {
                let regex = /\d+/gi;
                let newText = item.name.replace(regex, '<sub>$&</sub>');
                item.name = newText;
            }
        }
    }

    public infoPoint(name) {
        this.namePoint = name;
    }

    public nextPoint(name) {
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
        } catch (error) {}
    }

    public backPoint(name) {
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
        } catch (error) {}
    }
}
