import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AsyncRender } from '@shared/functions/async-render.function';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import * as d3 from 'd3';
import { BehaviorSubject } from 'rxjs';
import { ISouMainIndicators } from '@dashboard/models/SOU/sou-main-indicators.model';
import { SouMvpMnemonicSchemeService } from 'src/app/dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';
import { MatDialog } from '@angular/material/dialog';
import { SouDetailTableComponent } from '../sou-operational-accounting-system/components/sou-detail-table/sou-detail-table.component';
import { ISouIdent } from '@dashboard/models/SOU/sou-operational-accounting-system.model';

@Component({
    selector: 'evj-sou-main-indicators',
    templateUrl: './sou-main-indicators.component.html',
    styleUrls: ['./sou-main-indicators.component.scss'],
})
export class SouMainIndicatorsComponent extends WidgetPlatform<unknown> implements OnInit {
    public data$: BehaviorSubject<ISouMainIndicators> = new BehaviorSubject<ISouMainIndicators>(null);

    private set data(value: ISouMainIndicators) {
        this.data$.next(value);
    }

    menu: string[] = ['Месяц', 'Вклад'];
    choosenItem: number = 0;
    active: number = 0;
    identifiedList: ISouIdent[] = [];

    @ViewChild('chart') chart: ElementRef;

    public svg: any;

    constructor(
        protected widgetService: WidgetService,
        private mnemonicSchemeService: SouMvpMnemonicSchemeService,
        public dialog: MatDialog,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    @AsyncRender
    drawSvg(plan: number, fact: number): void {
        const value = (fact / plan) * 2;
        const dev: number = value === 2 || value === 0 ? 0 : (4 * Math.PI) / 180;

        const innerR = 50;
        const outerR = 42;

        if (this.svg) {
            this.svg.remove();
        }

        this.svg = d3
            .select(this.chart.nativeElement)
            .append('svg')
            .attr('width', '100px')
            .attr('height', '100px');

        const arcBg = d3
            .arc()
            .innerRadius(innerR)
            .outerRadius(outerR)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        const arc = d3
            .arc()
            .innerRadius(innerR - 2)
            .outerRadius(outerR + 2)
            .startAngle(2 * Math.PI)
            .endAngle(value * Math.PI + dev);

        const mainPie = d3
            .arc()
            .innerRadius(innerR - 2)
            .outerRadius(outerR + 2)
            .startAngle(dev)
            .endAngle(value * Math.PI);

        const g = this.svg
            .append('g')
            .attr('width', '100px')
            .attr('height', '100px')
            .style('transform', 'translate(50px, 50px)');

        g.append('path').attr('d', arcBg).style('fill', 'var(--sou-mvp-color-bg-title)');

        g.append('path').attr('d', mainPie).style('fill', 'var(--sou-mvp-color-white)');

        g.append('path').attr('d', arc).style('fill', 'var(--sou-mvp-color-warning)');
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public changeMenuItem(i: number): void {
        this.choosenItem = i;
    }

    public getFormattedData(date: Date): string {
        const options = { month: 'long', year: 'numeric' };
        const str = new Date(date).toLocaleDateString('ru-RU', options);
        return str[0].toUpperCase() + str.slice(1);
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.mnemonicSchemeService.selectedOptions$
                .asObservable()
                .subscribe((ref) => {
                    this.data = null;
                    if (!ref?.manufacture || !ref?.unit) {
                        return;
                    }
                    this.setWsOptions(ref);
                })
        );
    }

    protected dataHandler(ref: ISouMainIndicators): void {
        this.data = ref;
        if (ref?.losses?.identifiedList.length) {
            this.identifiedList = ref.losses.identifiedList;
            this.identifiedList.sort(( a, b) =>
                a.order - b.order
            )
        }
        this.drawSvg(this.data$.value.losses.sum.value, this.data$.value.losses.identified.value);
    }

    openTable(value: number): void {
        this.active = value;
        const dialogRef = this.dialog.open(SouDetailTableComponent, {
            data: [...this.identifiedList] as ISouIdent[],
        });

        dialogRef.afterClosed().subscribe(() => {
            this.active = 0;
        });
    }
}
