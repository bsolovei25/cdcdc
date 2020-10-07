import {
    Component,
    OnInit,
    Input,
    OnChanges,
    ViewChild,
    ElementRef,
    ChangeDetectionStrategy,
    AfterViewInit
} from '@angular/core';
import { OilStorages } from 'src/app/dashboard/models/oil-control';
import * as d3 from 'd3';

@Component({
    selector: 'evj-oil-control-tower',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './oil-control-tower.component.html',
    styleUrls: ['./oil-control-tower.component.scss']
})
export class OilControlTowerComponent implements OnInit, AfterViewInit, OnChanges {
    @ViewChild('oilBak') oilBak: ElementRef;
    @Input() data: OilStorages;
    @Input() checkWidth: boolean;

    public isCriticalArrow: boolean = false;
    public checkCriticalTank: boolean = false;

    public towerPic: any;

    public rectYHeight: number = 370;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        //  this.drawBak(this.oilBak.nativeElement);
    }

    ngOnChanges(): void {
        if (this.data && this.oilBak) {
            if (this.towerPic) {
                this.towerPic.remove();
            }
            this.drawBak(this.oilBak.nativeElement);
        }
    }

    public drawBak(el): void {
        let tankLevelPercent;
        const value = Math.round(this.data?.valueStorage);
        tankLevelPercent =
            (this.data.tankLevel < 0) ? 0 : (this.data.tankLevel > 100) ? 100 : this.data.tankLevel;
        this.isCriticalArrow = false;
        this.towerPic = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('height', '100%')
            .attr('width', '100%')
            .attr('class', 'textProduct')
            .attr('viewBox', '0 40 350 380');

        const pictureContainer = this.towerPic
            .append('image')
            .attr('xlink:href', 'assets/pic/OilControl/Bak.png')
            .attr('height', '450px')
            .attr('width', '350px')
            .attr('x', '0')
            .attr('class', 'textProduct')
            .attr('y', '0');
        const rect = this.towerPic
            .append('rect')
            .attr('fill', '#a2e2ff')
            .attr('opacity', '0.15')
            .attr('height', tankLevelPercent * 2.2)
            .attr('width', '260px')
            .attr('x', '63')
            .attr('class', 'textProduct')
            .attr('y', this.rectYHeight - tankLevelPercent * 2.2 + 10);

        const bakValue = this.towerPic
            .append('text')
            .attr('font-family', '\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;')
            .attr('font-size', '38px')
            .attr('x', '190')
            .attr('y', '100')
            .attr('text-anchor', 'middle')
            .attr('class', 'textProduct')
            .attr('fill', () => {
                if (this.data.status === 'critical') {
                    this.isCriticalArrow = true;
                    return 'var(--color-warning)';
                } else {
                    return 'var(--color-text-main)';
                }
            })
            .text(value);
    }

}
