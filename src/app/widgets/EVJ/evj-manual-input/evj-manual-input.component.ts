import {
    Component,
    Output,
    Inject,
    ViewChild,
    ElementRef,
    OnDestroy,
    OnInit,
    AfterViewInit,
    OnChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { trigger, style, state, transition, animate, group } from '@angular/animations';
import { ManualInputService } from './../../../dashboard/services/widgets/EVJ/manual-input.service';
import { WidgetSettingsService } from './../../../dashboard/services/widget-settings.service';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { IMachine_MI, IGroup_MI, MI_ParamSend, IHistoryIdx } from './../../../dashboard/models/EVJ/manual-input.model';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';

@Component({
    selector: 'evj-evj-manual-input',
    templateUrl: './evj-manual-input.component.html',
    styleUrls: ['./evj-manual-input.component.scss'],
    animations: [
        trigger('Branch', [
            state(
                'collapsed',
                style({
                    height: 0,
                    transform: 'translateY(-8px)',
                    opacity: 0,
                    overflow: 'hidden',
                })
            ),
            state(
                'expanded',
                style({
                    height: '*',
                    opacity: 1,
                })
            ),
            transition('collapsed => expanded', animate('150ms ease-in')),
            transition('expanded => collapsed', animate('150ms ease-out')),
        ]),
    ],
})
export class EvjManualInputComponent
    extends WidgetPlatform<unknown>
    implements OnInit, OnDestroy, AfterViewInit, OnChanges {
    @ViewChild('truckScroll') truckScroll: ElementRef;
    @ViewChild('scroll') scroll: ElementRef;
    @ViewChild('time') time: ElementRef;

    scrollBlockWidth: number;
    scrollTruckWidth: number;

    widthTruckScroll: number;

    public static itemCols: number = 45;
    public static itemRows: number = 20;
    public static minItemCols: number = 35;
    public static minItemRows: number = 13;

    public title: string;
    public previewTitle: string;
    public isHistorical: boolean = false;

    allSettings: boolean = true;
    openAllSettings: boolean = true;
    openAllMachine: boolean = true;

    chooseSetting: IMachine_MI;
    sendHistoryData: MI_ParamSend[] = [];

    private restUrl: string;

    data: IMachine_MI[] = [];
    filteredData: IMachine_MI[] = [];
    historicalDataIndx: IHistoryIdx = {
        machineIdx: 0,
        groupIdx: 0,
        paramsIdx: 0,
    };
    editMode: boolean = true;
    editCurValueMode: boolean = false;

    isUserHasWriteClaims: boolean;

    constructor(
        public manualInputService: ManualInputService,
        public widgetService: WidgetService,
        public widgetSettingsService: WidgetSettingsService,
        private http: HttpClient,
        private configService: AppConfigService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
        this.restUrl = this.configService.restUrl;
        this.widgetIcon = 'peoples';
    }

    ngOnInit(): void {
        super.widgetInit();
        console.log(this.widgetId);
    }

    ngAfterViewInit(): void {
        setInterval(() => {
            this.scrollBlockWidth = this.scroll?.nativeElement.scrollWidth;
            this.scrollTruckWidth = this.truckScroll?.nativeElement.clientWidth;
            this.scrollBlockWidth - this.scrollTruckWidth === 0
                ? (this.widthTruckScroll = 0)
                : (this.widthTruckScroll = this.scrollBlockWidth);
        }, 1000);
    }

    ngOnChanges(): void {}

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.setInitData();
    }

    protected dataHandler(ref: { machines: IMachine_MI[]; isUserHasWriteClaims: boolean }): void {
        if (!this.editCurValueMode) {
            this.loadSaveData(ref);
        }
    }

    onChooseGroup(name: string, groupIdx: number, paramsIdx: number): void {
        let machineIdx: number;
        this.data.forEach((item, i) => {
            if (item.name === name) {
                machineIdx = i;
            }
        });
        this.historicalDataIndx = {
            machineIdx,
            groupIdx,
            paramsIdx,
        };
    }

    showHistorical(): void {
        if (this.data.length > 0) {
            this.isHistorical = true;
        }
    }

    getSendHistoryData(data: MI_ParamSend[]): void {
        this.sendHistoryData = data;
    }

    @Output()
    refresh(): void {
        this.data = [];
    }

    async setInitData(): Promise<void> {
        try {
            const data: {
                machines: IMachine_MI[];
                isUserHasWriteClaims: boolean;
            } = await this.manualInputService.getManualInput(this.id);
            this.loadSaveData(data);
        } catch (error) {
            console.log(error);
        }
    }

    async onButtonSave(): Promise<void> {
        if (!this.isSaveButton()) {
            return;
        }

        if (this.isHistorical) {
            const saveResult = await this.manualInputService.SendHistoryData(
                this.sendHistoryData,
                this.data,
                this.widgetId
            );
            this.editMode = false;
            this.data = { ...saveResult };
            this.sendHistoryData = [];
        } else {
            this.manualInputService.BtnSaveValues(this.data, this.widgetId);
            this.editCurValueMode = false;
        }
    }

    onChangeValue(e: any, id: string): void {
        this.editCurValueMode = true;
        const param = this.manualInputService.GetElementById(id, this.data);
        param.saveValue = e.target.value;
        this.manualInputService.ChangeField(id, this.data);
    }

    onChangeMessageValue(e: any, id: string): void {
        const param = this.manualInputService.GetElementById(id, this.data);
        param.comment = e.target.value;
        this.manualInputService.ChangeField(id, this.data);
    }

    onUnfocusValue(id: string): void {
        this.manualInputService.CheckLastValue(id, this.data);
    }

    async loadSaveData(data: { machines: IMachine_MI[]; isUserHasWriteClaims: boolean }): Promise<void> {
        this.isUserHasWriteClaims = data.isUserHasWriteClaims;
        const settings: IMachine_MI[] = await this.widgetSettingsService.getSettings(this.uniqId);
        for (const itemDate of data.machines) {
            itemDate.open = settings?.find((el) => el.name === itemDate.name)?.open ?? true;
            itemDate.active = settings?.find((el) => el.name === itemDate.name)?.active ?? false;
            for (const item of itemDate.groups) {
                const setGroups = settings?.find((el) => el.name === itemDate.name);
                item.open = setGroups?.groups?.find((el) => el.name === item.name)?.open ?? true;
            }
            if (itemDate.active) {
                if (!this.allSettings) {
                    this.chooseSetting = itemDate;
                    this.allSettings = false;
                } else {
                    this.chooseSetting = {
                        name: 'all',
                    };
                    itemDate.active = false;
                }
            } else {
                this.chooseSetting = {
                    name: 'all',
                };
            }
        }
        this.data = this.manualInputService.LoadData(this.data, data.machines);
        if (this.chooseSetting?.name === 'all') {
            this.filteredData = this.data;
        } else {
            this.filteredData = [];
            this.filteredData.push(this.chooseSetting);
            this.onSettings(this.chooseSetting);
        }
    }

    onScroll(event): void {
        this.scroll.nativeElement.scrollLeft = event.currentTarget.scrollLeft;
    }

    onAllSettings(): void {
        this.allSettings = true;
        this.data?.forEach((el) => (el.active = false));
        this.filteredData = this.data;
        this.OnManualInputSendSettings(this.saveDataObj());
    }

    onSettings(item: IMachine_MI): void {
        this.data?.forEach((el) => (el.active = false));
        item.active = !item.active;
        this.chooseSetting = item;
        this.filteredData = [];
        this.filteredData.push(item);
        this.allSettings = false;
        this.OnManualInputSendSettings(this.saveDataObj());
    }

    onShowAllSettings(): void {
        if (this.allSettings === true) {
            this.openAllSettings = !this.openAllSettings;
            this.filteredData?.forEach((item) => (item.open = this.openAllSettings));
            this.OnManualInputSendSettings(this.saveDataObj());
        } else {
            this.openAllMachine = !this.openAllMachine;
            this.filteredData
                ?.find((el) => el.name === this.chooseSetting.name)
                ?.groups.forEach((item) => (item.open = this.openAllMachine));
            this.OnManualInputSendSettings(this.saveDataObj());
        }
    }

    onShowMachine(machine): void {
        machine.open = !machine.open;
        this.OnManualInputSendSettings(this.saveDataObj());
    }

    onShowItemMachine(item): void {
        item.open = !item.open;
        this.OnManualInputSendSettings(this.saveDataObj());
    }

    onInputMessage(i): void {
        i.openInput = !i.openInput;
    }

    public async OnManualInputSendSettings(settings): Promise<void> {
        await this.widgetSettingsService.saveSettings(this.uniqId, settings);
    }

    saveDataObj(): IMachine_MI[] {
        const saveDataTemp: IMachine_MI[] = [];
        for (const machine of this.data) {
            const machineObj: IMachine_MI = {
                name: machine.name,
                active: machine.active,
                open: machine?.open ?? true,
                groups: [],
            };
            for (const item of machine.groups) {
                const itemObj: IGroup_MI = {
                    name: item.name,
                    open: item?.open ?? true,
                };
                machineObj.groups.push(itemObj);
            }
            saveDataTemp.push(machineObj);
        }
        return saveDataTemp;
    }

    public isSaveButton(): boolean {
        if (this.allSettings) {
            if (this.isUserHasWriteClaims) {
                return true;
            }
        } else {
            if (this.isUserHasWriteClaims) {
                return true;
            }
        }
        return false;
    }
}
