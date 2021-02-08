import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RingFactoryWidget } from 'src/app/dashboard/models/widget.model';
declare var d3: any;

@Component({
    selector: 'evj-ring-factory-diagram',
    templateUrl: './ring-factory-diagram.component.html',
    styleUrls: ['./ring-factory-diagram.component.scss'],
})
export class RingFactoryDiagramComponent implements OnInit, AfterViewInit {
    @ViewChild('ringFactory') ringFactory: ElementRef;

    @ViewChild('test1') test1: ElementRef;
    @ViewChild('test2') test2: ElementRef;

    @Input() public data: RingFactoryWidget;

    public stateRing: number;

    public dataStyle: any = {
        id_0: { status: 'critical' },
        id_1: { status: 'notCritical' },
    };

    constructor() {}

    ngOnInit(): void {
        this.stateRing = this.data.buttons.length;
    }
    ngAfterViewInit(): void {
        this.draw(this.ringFactory.nativeElement);
    }

    public draw(el): void {
        const svg = d3.select(el);
        svg.append('image')
            .attr('xlink:href', 'assets/pic/Icons3D/' + this.data.typeFabric + '.png')
            .attr('height', '250px')
            .attr('pointer-events', 'none')
            .attr('width', '250px')
            .attr('x', '170')
            .attr('y', '270');

        if (this.data.buttons.length) {
            const pie: any = el.querySelectorAll('.st0');
            const iconpie: any = el.querySelectorAll('.st1');
            for (const dat of this.data.buttons) {
                const datButton = dat.typeButton.toString();
                for (const item of pie) {
                    const id = item.getAttribute('data-item-id');
                    if (datButton === id) {
                        if (id === '0' && dat.critical !== 0) {
                            const status = this.dataStyle['id_0'].status;
                            item.classList.add(`-${status}`);
                            svg.append('image')
                                .attr('xlink:href', 'assets/pic/RingFactory/leftBorder.svg')
                                .attr('height', '250px')
                                .attr('width', '250px')
                                .attr('x', '-21')
                                .attr('y', '308');

                            svg.append('text')
                                .attr('font-family', " font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                                .attr('font-size', '36px')
                                .attr('x', '40')
                                .attr('y', '370')
                                .attr('fill', 'orange')
                                .attr('text-anchor', 'middle')
                                .text('-' + dat.critical);

                            svg.append('text')
                                .attr('font-family', " font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                                .attr('font-size', '30px')
                                .attr('x', '40')
                                .attr('y', '440')
                                .attr('text-anchor', 'middle')
                                .attr('fill', 'gray')
                                .text('%');

                            svg.append('text')
                                .attr('font-size', '36px')
                                .attr('x', '40')
                                .attr('y', '520')
                                .attr('fill', 'white')
                                .attr('text-anchor', 'middle')
                                .text('+' + dat.notCritical);
                        } else if (id === '1' && dat.critical !== 0) {
                            const status = this.dataStyle['id_0'].status;
                            item.classList.add(`-${status}`);
                            svg.append('image')
                                .attr('xlink:href', 'assets/pic/RingFactory/borderimg.png')
                                .attr('height', '250px')
                                .attr('width', '250px')
                                .attr('x', '40')
                                .attr('y', '190');

                            svg.append('text')
                                .attr('font-family', " font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                                .attr('font-size', '36px')
                                .attr('x', '70')
                                .attr('y', '280')
                                .attr('fill', 'orange')
                                .text('-' + dat.critical);

                            svg.append('text')
                                .attr('font-family', " font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                                .attr('font-size', '30px')
                                .attr('x', '140')
                                .attr('y', '280')
                                .attr('fill', 'gray')
                                .text('%');

                            svg.append('text')
                                .attr('font-size', '36px')
                                .attr('x', '200')
                                .attr('y', '280')
                                .attr('fill', 'white')
                                .text('+' + dat.notCritical);
                        } else if (id === '2' && dat.critical !== 0) {
                            const status = this.dataStyle['id_0'].status;
                            item.classList.add(`-${status}`);
                            svg.append('image')
                                .attr('xlink:href', 'assets/pic/RingFactory/borderimg.png')
                                .attr('height', '250px')
                                .attr('width', '250px')
                                .attr('x', '-550')
                                .attr('y', '190')
                                .attr('transform', 'scale(-1,1)');

                            svg.append('text')
                                .attr('font-family', " font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                                .attr('font-size', '36px')
                                .attr('x', '330')
                                .attr('y', '280')
                                .attr('fill', 'orange')
                                .text('-' + dat.critical);

                            svg.append('text')
                                .attr('font-family', " font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                                .attr('font-size', '30px')
                                .attr('x', '400')
                                .attr('y', '280')
                                .attr('fill', 'gray')
                                .text('%');

                            svg.append('text')
                                .attr('font-size', '36px')
                                .attr('x', '470')
                                .attr('y', '280')
                                .attr('fill', 'white')
                                .text('+' + dat.notCritical);
                        } else if (id === '3' && dat.critical !== 0) {
                            const status = this.dataStyle['id_0'].status;
                            item.classList.add(`-${status}`);
                            svg.append('image')
                                .attr('xlink:href', 'assets/pic/RingFactory/leftBorder.svg')
                                .attr('height', '250px')
                                .attr('width', '250px')
                                .attr('x', '-617')
                                .attr('transform', 'scale(-1,1)')
                                .attr('y', '308');

                            svg.append('text')
                                .attr('font-family', " font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                                .attr('font-size', '36px')
                                .attr('x', '548')
                                .attr('y', '370')
                                .attr('fill', 'orange')
                                .attr('text-anchor', 'middle')
                                .text('-' + dat.critical);

                            svg.append('text')
                                .attr('font-family', " font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                                .attr('font-size', '30px')
                                .attr('x', '548')
                                .attr('y', '440')
                                .attr('text-anchor', 'middle')
                                .attr('fill', 'gray')
                                .text('%');

                            svg.append('text')
                                .attr('font-size', '36px')
                                .attr('x', '548')
                                .attr('y', '520')
                                .attr('fill', 'white')
                                .attr('text-anchor', 'middle')
                                .text('+' + dat.notCritical);
                        } else if (id === '4' && dat.critical !== 0) {
                            const status = this.dataStyle['id_0'].status;
                            item.classList.add(`-${status}`);
                            svg.append('image')
                                .attr('xlink:href', 'assets/pic/RingFactory/borderimg.png')
                                .attr('height', '250px')
                                .attr('width', '250px')
                                .attr('x', '-550')
                                .attr('y', '-680')
                                .attr('transform', 'scale(-1)');

                            svg.append('text')
                                .attr('font-family', " font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                                .attr('font-size', '36px')
                                .attr('x', '330')
                                .attr('y', '620')
                                .attr('fill', 'orange')
                                .text('-' + dat.critical);

                            svg.append('text')
                                .attr('font-family', " font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                                .attr('font-size', '30px')
                                .attr('x', '400')
                                .attr('y', '620')
                                .attr('fill', 'gray')
                                .text('%');

                            svg.append('text')
                                .attr('font-size', '36px')
                                .attr('x', '470')
                                .attr('y', '620')
                                .attr('fill', 'white')
                                .text('+' + dat.notCritical);
                        } else if (id === '5' && dat.critical !== 0) {
                            const status = this.dataStyle['id_0'].status;
                            item.classList.add(`-${status}`);
                            svg.append('image')
                                .attr('xlink:href', 'assets/pic/RingFactory/borderimg.png')
                                .attr('height', '250px')
                                .attr('width', '250px')
                                .attr('x', '45')
                                .attr('y', '-680')
                                .attr('transform', 'scale(1,-1)');

                            svg.append('text')
                                .attr('font-family', " font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                                .attr('font-size', '36px')
                                .attr('x', '70')
                                .attr('y', '620')
                                .attr('fill', 'orange')
                                .text('-' + dat.critical);

                            svg.append('text')
                                .attr('font-family', " font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                                .attr('font-size', '30px')
                                .attr('x', '140')
                                .attr('y', '620')
                                .attr('fill', 'gray')
                                .text('%');

                            svg.append('text')
                                .attr('font-size', '36px')
                                .attr('x', '200')
                                .attr('y', '620')
                                .attr('fill', 'white')
                                .text('+' + dat.notCritical);
                        }
                    } else {
                        const status = this.dataStyle['id_1'].status;
                        item.classList.add(`-${status}`);
                    }
                }
                for (const item of iconpie) {
                    const id = item.getAttribute('data-item-id');
                    if (datButton === id && dat.critical !== 0) {
                        const status = this.dataStyle['id_0'].status;
                        item.classList.add(`-${status}`);
                    } else {
                        const status = this.dataStyle['id_1'].status;
                        item.classList.add(`-${status}`);
                    }
                }
            }
        } else {
        }
    }
}
