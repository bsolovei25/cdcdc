import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit
} from '@angular/core';

import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { CmidCloseReasonService } from '@dashboard/services/widgets/CMID/cmid-close-reason/services/cmid-close-reason.service';

import { colors } from './cmid-close-reason.const';
import { ICmidCloseReasonBar, ICmidCloseReasonCount } from './cmid-close-reason.interface';

@Component({
    selector: 'cmid-close-reason',
    templateUrl: './cmid-close-reason.component.html',
    styleUrls: ['./cmid-close-reason.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmidCloseReasonComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public vprValue: number = 0;
    public operativeValue: number = 0;
    public reasonGroups: ICmidCloseReasonBar[];
    public countStatistics: ICmidCloseReasonCount[];
    public showReasonStatistics: boolean;

    constructor(
        public cdRef: ChangeDetectorRef,
        public widgetService: WidgetService,
        private cmidCloseReasonService: CmidCloseReasonService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();

        this.getMockData(); // Mocks
        this.assignData();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.cdRef.detach();
    }

    public detectChangesOnMouseLeave() {
        setTimeout(() => {
            if (!super.isHover) {
                this.cdRef.markForCheck();
            }
        }, 200);
    }

    public toggleReasonStatistics(): void {
        this.showReasonStatistics = !this.showReasonStatistics;
    }

    protected async dataConnect(): Promise<void> {
        super.dataConnect();
        this.cdRef.detectChanges();
    }

    protected dataHandler(ref: { data }): void { }

    private getMockData(): void {
        this.vprValue = this.cmidCloseReasonService.vprValue;
        this.operativeValue = this.cmidCloseReasonService.operativeValue;
        this.reasonGroups = this.cmidCloseReasonService.reasonGroups;
        this.countStatistics = this.cmidCloseReasonService.countStatistics;
    }

    private assignData(): void {
        let sum = 0;

        this.reasonGroups.forEach((item: ICmidCloseReasonBar, index: number) => {
            sum += item.value;
            item.color = colors[index];
        });

        this.reasonGroups.forEach((item: ICmidCloseReasonBar) => {
            item.width = Math.round(item.value / sum * 100);
        });
    }
}
