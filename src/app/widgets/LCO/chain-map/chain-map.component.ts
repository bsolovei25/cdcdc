import { Component, Inject, ElementRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
declare var d3: any;

@Component({
    selector: 'evj-chain-map',
    templateUrl: './chain-map.component.html',
    styleUrls: ['./chain-map.component.scss'],
})
export class ChainMapComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    @ViewChild('chain') chain: ElementRef;

    public dataStyle = {
        id_0: { status: 'pipeActive' },
        id_1: { status: 'pipeNotActive' },
        id_2: { status: 'aRow' },
        id_3: { status: 'nRow' },
        id_4: { status: 'aPoint' },
        id_5: { status: 'nPoint' },
        id_6: { status: 'aBigPoint' },
        id_7: { status: 'nBigPoint' },
        id_8: { status: 'aPic' },
        id_9: { status: 'nPic' },
        id_10: { status: 'cBigPoint' },
        id_11: { status: 'aText' },
        id_12: { status: 'nText' },
        id_13: { status: 'cText' },
    };
    public data = [
        {
            mapLine: [
                { idLine: '0', status: true },
                { idLine: '1', status: true },
                { idLine: '21', status: true },
                { idLine: '22', status: true },
                { idLine: '212', status: false },
                { idLine: '221', status: false },
                { idLine: '2219', status: false },
                { idLine: '2215', status: false },
                { idLine: '22111', status: false },
                { idLine: '22131', status: false },
                { idLine: '22132', status: false },
                { idLine: '2218', status: false },
                { idLine: '2216', status: false },
                { idLine: '22121', status: false },
                { idLine: '22122', status: false },
                { idLine: '22141', status: false },
                { idLine: '22142', status: false },
                { idLine: '2217', status: false },
                { idLine: '222', status: true },
                { idLine: '223', status: true },
                { idLine: '224', status: true },
                { idLine: '225', status: true },
                { idLine: '226', status: true },
                { idLine: '227', status: true },
                { idLine: '228', status: true },
                { idLine: '229', status: true },
                { idLine: '23', status: true },
                { idLine: '24', status: true },
                { idLine: '25', status: true },
                { idLine: '26', status: true },
                { idLine: '27', status: true },
                { idLine: '28', status: true },
                { idLine: '29', status: true },
                { idLine: '31', status: false },
                { idLine: '32', status: false },
                { idLine: '34', status: true },
                { idLine: '35', status: true },
                { idLine: '3511', status: false },
                { idLine: '3512', status: true },
                { idLine: '3513', status: true },
                { idLine: '3514', status: true },
                { idLine: '3521', status: false },
                { idLine: '3522', status: true },
                { idLine: '3523', status: true },
                { idLine: '3524', status: true },
                { idLine: '3525', status: true },
                { idLine: '312', status: false },
                { idLine: '41', status: true },
                { idLine: '4211', status: false },
                { idLine: '4212', status: false },
                { idLine: '4213', status: false },
                { idLine: '4221', status: false },
                { idLine: '4222', status: false },
                { idLine: '4231', status: true },
                { idLine: '4232', status: true },
                { idLine: '44', status: true },
                { idLine: '441', status: true },
                { idLine: '45', status: true },
                { idLine: '451', status: true },
                { idLine: '452', status: true },
                { idLine: '46', status: true },
                { idLine: '4611', status: true },
                { idLine: '4612', status: true },
                { idLine: '4613', status: true },
                { idLine: '4621', status: true },
                { idLine: '4622', status: false },
                { idLine: '4623', status: false },
                { idLine: '4624', status: false },
                { idLine: '47', status: true },
                { idLine: '48', status: true },
            ],

            mapCircle: [
                { idCircle: '0', status: 1 },
                { idCircle: '1', status: 1 },
                { idCircle: '2', status: 0 },
                { idCircle: '3', status: 1 },
                { idCircle: '4', status: 0 },
                { idCircle: '5', status: 0 },
                { idCircle: '6', status: 0 },
                { idCircle: '7', status: 0 },
                { idCircle: '8', status: 0 },
                { idCircle: '9', status: 1 },
                { idCircle: '10', status: 1 },
                { idCircle: '11', status: 0 },
                { idCircle: '12', status: 0 },
                { idCircle: '13', status: 0 },
                { idCircle: '14', status: 1 },
                { idCircle: '15', status: 1 },
                { idCircle: '16', status: 1 },
                { idCircle: '17', status: 1 },
                { idCircle: '18', status: 1 },
                { idCircle: '19', status: 1 },
                { idCircle: '20', status: 1 },
                { idCircle: '21', status: 1 },
                { idCircle: '22', status: 1 },
                { idCircle: '23', status: 1 },
                { idCircle: '24', status: 0 },
                { idCircle: '25', status: 2 },
                { idCircle: '26', status: 1 },
                { idCircle: '27', status: 1 },
                { idCircle: '28', status: 1 },
                { idCircle: '29', status: 1 },
            ],
        },
        {
            mapLine: [
                { idLine: '0', status: true },
                { idLine: '1', status: true },
                { idLine: '21', status: true },
                { idLine: '22', status: true },
                { idLine: '212', status: false },
                { idLine: '221', status: true },
                { idLine: '2219', status: false },
                { idLine: '2215', status: false },
                { idLine: '22111', status: true },
                { idLine: '22131', status: false },
                { idLine: '22132', status: false },
                { idLine: '2218', status: false },
                { idLine: '2216', status: false },
                { idLine: '22121', status: false },
                { idLine: '22122', status: false },
                { idLine: '22141', status: false },
                { idLine: '22142', status: false },
                { idLine: '2217', status: false },
                { idLine: '222', status: true },
                { idLine: '223', status: true },
                { idLine: '224', status: true },
                { idLine: '225', status: true },
                { idLine: '226', status: true },
                { idLine: '227', status: true },
                { idLine: '228', status: true },
                { idLine: '229', status: true },
                { idLine: '23', status: true },
                { idLine: '24', status: true },
                { idLine: '25', status: true },
                { idLine: '26', status: true },
                { idLine: '27', status: true },
                { idLine: '28', status: true },
                { idLine: '29', status: false },
                { idLine: '31', status: true },
                { idLine: '32', status: true },
                { idLine: '34', status: true },
                { idLine: '35', status: true },
                { idLine: '3511', status: false },
                { idLine: '3512', status: true },
                { idLine: '3513', status: true },
                { idLine: '3514', status: true },
                { idLine: '3521', status: false },
                { idLine: '3522', status: true },
                { idLine: '3523', status: true },
                { idLine: '3524', status: true },
                { idLine: '3525', status: true },
                { idLine: '312', status: false },
                { idLine: '41', status: true },
                { idLine: '4211', status: true },
                { idLine: '4212', status: false },
                { idLine: '4213', status: false },
                { idLine: '4221', status: false },
                { idLine: '4222', status: false },
                { idLine: '4231', status: true },
                { idLine: '4232', status: true },
                { idLine: '44', status: true },
                { idLine: '441', status: true },
                { idLine: '45', status: true },
                { idLine: '451', status: true },
                { idLine: '452', status: true },
                { idLine: '46', status: true },
                { idLine: '4611', status: true },
                { idLine: '4612', status: true },
                { idLine: '4613', status: true },
                { idLine: '4621', status: false },
                { idLine: '4622', status: false },
                { idLine: '4623', status: false },
                { idLine: '4624', status: false },
                { idLine: '47', status: true },
                { idLine: '48', status: true },
            ],

            mapCircle: [
                { idCircle: '0', status: 1 },
                { idCircle: '1', status: 1 },
                { idCircle: '2', status: 1 },
                { idCircle: '3', status: 1 },
                { idCircle: '4', status: 2 },
                { idCircle: '5', status: 2 },
                { idCircle: '6', status: 2 },
                { idCircle: '7', status: 0 },
                { idCircle: '8', status: 0 },
                { idCircle: '9', status: 1 },
                { idCircle: '10', status: 1 },
                { idCircle: '11', status: 0 },
                { idCircle: '12', status: 0 },
                { idCircle: '13', status: 0 },
                { idCircle: '14', status: 1 },
                { idCircle: '15', status: 1 },
                { idCircle: '16', status: 1 },
                { idCircle: '17', status: 1 },
                { idCircle: '18', status: 0 },
                { idCircle: '19', status: 1 },
                { idCircle: '20', status: 1 },
                { idCircle: '21', status: 1 },
                { idCircle: '22', status: 1 },
                { idCircle: '23', status: 1 },
                { idCircle: '24', status: 0 },
                { idCircle: '25', status: 1 },
                { idCircle: '26', status: 1 },
                { idCircle: '27', status: 0 },
                { idCircle: '28', status: 1 },
                { idCircle: '29', status: 1 },
            ],
        },
    ];

    public mass1;
    public mass2;
    public check: boolean = true;

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'map';
        this.isRealtimeData = false;
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.drawChain();
    }

    protected dataHandler(ref: any): void { }

    public drawChain(): void {
        this.mass1 = this.data[0];
        this.mass2 = this.data[1];
        this.changeLine(this.chain.nativeElement, this.mass1);
        this.changeCircle(this.chain.nativeElement, this.mass1);
        setInterval(() => {
            if (this.check === true) {
                this.changeLine(this.chain.nativeElement, this.mass1);
                this.changeCircle(this.chain.nativeElement, this.mass1);
                this.check = false;
            } else {
                this.changeLine(this.chain.nativeElement, this.mass2);
                this.changeCircle(this.chain.nativeElement, this.mass2);
                this.check = true;
            }
        }, 3000);
    }

    public changeLine(el, mass): void {
        const activeLine: any = el.querySelectorAll('.st3');

        const arrow: any = el.querySelectorAll('.st5');

        const activePoint: any = el.querySelectorAll('.st37');

        for (let dat of mass.mapLine) {
            let datLine = dat.idLine;
            let datStatus = dat.status;
            for (let item of activeLine) {
                let id = item.getAttribute('item-line-id');
                if (datLine === id && datStatus === true) {
                    let badstatus = this.dataStyle['id_1'].status;
                    let status = this.dataStyle['id_0'].status;
                    item.classList.remove(`-${badstatus}`);
                    item.classList.add(`-${status}`);
                } else if (datLine === id && datStatus === false) {
                    let badstatus = this.dataStyle['id_0'].status;
                    let status = this.dataStyle['id_1'].status;
                    item.classList.remove(`-${badstatus}`);
                    item.classList.add(`-${status}`);
                }
            }

            for (let item of arrow) {
                let id = item.getAttribute('item-line-id');
                if (datLine === id && datStatus === true) {
                    let badstatus = this.dataStyle['id_3'].status;
                    let status = this.dataStyle['id_2'].status;
                    item.classList.remove(`-${badstatus}`);
                    item.classList.add(`-${status}`);
                } else if (datLine === id && datStatus === false) {
                    let badstatus = this.dataStyle['id_2'].status;
                    let status = this.dataStyle['id_3'].status;
                    item.classList.remove(`-${badstatus}`);
                    item.classList.add(`-${status}`);
                }
            }

            for (let item of activePoint) {
                let id = item.getAttribute('item-line-id');
                if (datLine === id && datStatus === true) {
                    let badstatus = this.dataStyle['id_5'].status;
                    let status = this.dataStyle['id_4'].status;
                    item.classList.remove(`-${badstatus}`);
                    item.classList.add(`-${status}`);
                } else if (datLine === id && datStatus === false) {
                    let badstatus = this.dataStyle['id_4'].status;
                    let status = this.dataStyle['id_5'].status;
                    item.classList.remove(`-${badstatus}`);
                    item.classList.add(`-${status}`);
                }
            }
        }
    }

    public changeCircle(el, mass): void {
        const bigPoint: any = el.querySelectorAll('.st38');

        const activeLine: any = el.querySelectorAll('.st50');

        const picture: any = el.querySelectorAll('.st60');

        const text: any = el.querySelectorAll('.st0');

        for (let dat of mass.mapCircle) {
            let datLine = dat.idCircle;
            let datStatus = dat.status;
            for (let item of activeLine) {
                let useElement = item.getElementsByTagName('image');
                let id = item.getAttribute('item-circle-id');
                if (datLine === id && datStatus == 0) {
                    item.removeAttribute('href');
                    item.setAttributeNS(
                        'http://www.w3.org/1999/xlink',
                        'href',
                        'assets/pic/chain4.png'
                    );
                } else if (datLine === id && datStatus == 1) {
                    item.removeAttribute('href');
                    item.setAttributeNS(
                        'http://www.w3.org/1999/xlink',
                        'href',
                        'assets/pic/chain2.png'
                    );
                } else if (datLine === id && datStatus == 2) {
                    item.removeAttribute('href');
                    item.setAttributeNS(
                        'http://www.w3.org/1999/xlink',
                        'href',
                        'assets/pic/critical_chain.png'
                    );
                }
            }

            for (let item of bigPoint) {
                let id = item.getAttribute('item-circle-id');
                if (datLine === id && datStatus === 1) {
                    let badstatus1 = this.dataStyle['id_7'].status;
                    let badstatus2 = this.dataStyle['id_10'].status;
                    let status = this.dataStyle['id_6'].status;
                    item.classList.remove(`-${badstatus1}`);
                    item.classList.remove(`-${badstatus2}`);
                    item.classList.add(`-${status}`);
                } else if (datLine === id && datStatus === 0) {
                    let badstatus1 = this.dataStyle['id_6'].status;
                    let badstatus2 = this.dataStyle['id_10'].status;
                    let status = this.dataStyle['id_7'].status;
                    item.classList.remove(`-${badstatus1}`);
                    item.classList.remove(`-${badstatus2}`);
                    item.classList.add(`-${status}`);
                } else if (datLine === id && datStatus === 2) {
                    let badstatus1 = this.dataStyle['id_6'].status;
                    let badstatus2 = this.dataStyle['id_7'].status;
                    let status = this.dataStyle['id_10'].status;
                    item.classList.remove(`-${badstatus1}`);
                    item.classList.remove(`-${badstatus2}`);
                    item.classList.add(`-${status}`);
                }
            }

            for (let item of text) {
                let id = item.getAttribute('item-circle-id');
                if (datLine === id && datStatus === 1) {
                    let badstatus1 = this.dataStyle['id_12'].status;
                    let badstatus2 = this.dataStyle['id_13'].status;
                    let status = this.dataStyle['id_11'].status;
                    item.classList.remove(`-${badstatus1}`);
                    item.classList.remove(`-${badstatus2}`);
                    item.classList.add(`-${status}`);
                } else if (datLine === id && datStatus === 0) {
                    let badstatus1 = this.dataStyle['id_11'].status;
                    let badstatus2 = this.dataStyle['id_13'].status;
                    let status = this.dataStyle['id_12'].status;
                    item.classList.remove(`-${badstatus1}`);
                    item.classList.remove(`-${badstatus2}`);
                    item.classList.add(`-${status}`);
                } else if (datLine === id && datStatus === 2) {
                    let badstatus1 = this.dataStyle['id_11'].status;
                    let badstatus2 = this.dataStyle['id_12'].status;
                    let status = this.dataStyle['id_13'].status;
                    item.classList.remove(`-${badstatus1}`);
                    item.classList.remove(`-${badstatus2}`);
                    item.classList.add(`-${status}`);
                }
            }

            for (let item of picture) {
                let id = item.getAttribute('item-circle-id');
                if (datLine === id && datStatus === 1) {
                    let badstatus = this.dataStyle['id_9'].status;
                    let status = this.dataStyle['id_8'].status;
                    item.classList.remove(`-${badstatus}`);
                    item.classList.add(`-${status}`);
                } else if (datLine === id && datStatus === 0) {
                    let badstatus = this.dataStyle['id_8'].status;
                    let status = this.dataStyle['id_9'].status;
                    item.classList.remove(`-${badstatus}`);
                    item.classList.add(`-${status}`);
                } else if (datLine === id && datStatus === 2) {
                    let badstatus = this.dataStyle['id_9'].status;
                    let status = this.dataStyle['id_8'].status;
                    item.classList.remove(`-${badstatus}`);
                    item.classList.add(`-${status}`);
                }
            }
        }
    }
}
