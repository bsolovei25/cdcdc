import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit
} from "@angular/core";

import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";
import { IEquipmentState, IEquipmentStateSelection } from "@dashboard/models/EVJ/equipment-state";
import { WidgetService } from "@dashboard/services/widget.service";

import { EquipmentStateApiService } from "./services/equipment-state-api.service";
import { EquipmentStateHelperService } from "./services/equipment-state-helper.service";

@Component({
    selector: 'evj-equipment-state',
    templateUrl: './evj-equipment-state.component.html',
    styleUrls: ['./evj-equipment-state.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentStateComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public originTableData: IEquipmentState[] = [];
    public tableData: IEquipmentState[] = [];
    public selectedCount: number = 0;
    public isAllSelect: boolean = false;
    public isEditMode: boolean = false;

    constructor(
        public cdRef: ChangeDetectorRef,
        protected widgetService: WidgetService,
        private equipmentStateApiService: EquipmentStateApiService,
        private equipmentStateHelperService: EquipmentStateHelperService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public getTableData(selection: IEquipmentStateSelection): void {
        this.equipmentStateApiService.getTableData(selection).subscribe(originTableData => {
            this.originTableData = [...originTableData];
            this.tableData = this.equipmentStateHelperService.applyFilter(originTableData);

            this.isAllSelect = false;
            this.deselectAllState();
        });
    }

    public changeSelectAllState(): void {
        this.tableData.forEach(row => row.isSelected = !this.isAllSelect);
        this.calculateSelectCount();
    }

    public deselectAllState(): void {
        this.tableData.forEach(row => row.isSelected = false);
    
        this.isAllSelect = false;
        this.calculateSelectCount();
    }

    public calculateSelectCount(): void {
        this.selectedCount = this.tableData.reduce((sum, current) => sum + Number(current.isSelected), 0);
    }

    public highlghtRow(row: IEquipmentState | null): void {
        if (row.isHighlighted) {
            row.isHighlighted = false;
        } else {
            this.tableData.forEach(row => row.isHighlighted = false);
            row.isHighlighted = true;
        }
    }

    public stateFilterChange(value: string) {
        this.equipmentStateHelperService.stateFilterValue = value;
        this.tableData = this.equipmentStateHelperService.applyFilter(this.originTableData);
    }

    public statusFilterChange(value: string) {
        this.equipmentStateHelperService.statusFilterValue = value;
        this.tableData = this.equipmentStateHelperService.applyFilter(this.originTableData);
    }

    public equipmentGroupSelect() {
        this.tableData = this.equipmentStateHelperService.applyFilter(this.originTableData);
    }

    public resetTableData() {
        this.tableData = [];
        this.originTableData = [];

        this.isAllSelect = false;
        this.deselectAllState();
    }

    public formDisposition(): void {
        this.equipmentStateHelperService.formDisposition(this.tableData);
    }

    public saveEquipment(): void {
        throw new Error('???? ??????????????????????');
    }

    public undoChanges(): void {
        throw new Error('???? ??????????????????????');
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.cdRef.detach();
    }

    protected async dataConnect(): Promise<void> {
        super.dataConnect();
        this.cdRef.detectChanges();
    }

    protected dataHandler() { }
}
