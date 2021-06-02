import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { CmidFilterService } from '@dashboard/services/widgets/CMID/cmid-filter.service/cmid-filter.service';
import { FACTORIES, MANUFACTORIES, POSITIONS } from './cmid-filter.mocks';

export interface IList {
    id: number;
    value: string;
}

export interface ISelected {
    name: string;
    list: IList[];
}

@Component({
    selector: 'cmid-filter',
    templateUrl: './cmid-filter.component.html',
    styleUrls: ['./cmid-filter.component.scss'],
})
export class CmidFilterComponent extends WidgetPlatform<unknown> implements OnInit {
    public widgetForm: FormGroup;
    public factories: string[] = FACTORIES;
    public manufactories: string[] = MANUFACTORIES;
    public positions: string[] = POSITIONS;

    constructor(
        protected widgetService: WidgetService,
        private fb: FormBuilder,
        private cmidFilter: CmidFilterService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        this.fromInit();
        this.getSelectList();
    }

    public fromInit(): void {
        this.widgetForm = this.fb.group({
            factoriesSelect: [null],
            manufactoriesSelect: [null],
            positionsSelect: [null],
        });
        const defaultFactoriesValue = this.factories[0];
        const defaultManufactoriesValue = this.manufactories[0];
        const defaultPositionsValue = this.positions[0];

        this.widgetForm.get('factoriesSelect').setValue(defaultFactoriesValue);
        this.widgetForm.get('manufactoriesSelect').setValue(defaultManufactoriesValue);
        this.widgetForm.get('positionsSelect').setValue(defaultPositionsValue);
    }

    public getSelectList(): ISelected {
        return null;
    }

    protected dataHandler(ref: unknown): void {}

    public onDataFilter(): ISelected[] {
        return null;
    }
}
