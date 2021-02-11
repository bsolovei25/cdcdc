import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var d3: any;

@Component({
    selector: 'evj-tank-filling',
    templateUrl: './tank-filling.component.html',
    styleUrls: ['./tank-filling.component.scss'],
})
export class TankFillingComponent implements OnInit, AfterViewInit {
    @ViewChild('oilBak') oilBak: ElementRef;
    @Input() public data: number;

    public tankPicture: any; //d3

    public rectYHeight: number = 370;

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.drawBak(this.oilBak.nativeElement);
    }

    public drawBak(el: ElementRef): void {
        this.tankPicture = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('height', '100%')
            .attr('width', '100%')
            .attr('class', 'textProduct')
            .attr('viewBox', '0 40 350 380');

        const pictureContainer = this.tankPicture
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/oil-control-all/tank-information/Bak.png')
            .attr('height', '450px')
            .attr('width', '350px')
            .attr('x', '0')
            .attr('class', 'textProduct')
            .attr('y', '0');

        const backRect = this.tankPicture
            .append('rect')
            .attr('fill', '#3FA9F5')
            .attr('opacity', '0.1')
            .attr('height', 100 * 2.2)
            .attr('width', '260px')
            .attr('x', '63')
            .attr('class', 'textProduct')
            .attr('y', this.rectYHeight - 100 * 2.2 + 10);

        const rect = this.tankPicture
            .append('rect')
            .attr('fill', '#3FA9F5')
            .attr('opacity', '0.8')
            .attr('height', this.data * 2.2)
            .attr('width', '260px')
            .attr('x', '63')
            .attr('class', 'textProduct')
            .attr('y', this.rectYHeight - this.data * 2.2 + 10);
    }
}
