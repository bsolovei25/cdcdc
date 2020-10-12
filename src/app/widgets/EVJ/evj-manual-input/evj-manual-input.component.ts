import { WidgetPlatform } from 'src/app/dashboard/models/widget-platform';
import {
    Component,
    Output,
    Inject,
    ViewChild,
    ElementRef,
    OnDestroy,
    OnInit,
    AfterViewInit,
    OnChanges
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { trigger, style, state, transition, animate, group } from '@angular/animations';
import { ManualInputService } from './../../../dashboard/services/widgets/manual-input.service';
import { WidgetSettingsService } from './../../../dashboard/services/widget-settings.service';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { IHistory, IMachine_MI, IGroup_MI } from './../../../dashboard/models/manual-input.model';

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
export class EvjManualInputComponent extends WidgetPlatform<unknown>
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

    public timeWidth: number = 0;

    allSettings: boolean = true;
    openAllSettings: boolean = true;
    openAllMachine: boolean = true;

    chooseSetting: IMachine_MI;

    private restUrl: string;

    data: IMachine_MI[] = [];
    filteredData: IMachine_MI[] = [];
    historicalData: any;
    editMode: boolean = false;
    historicalDataValues: IHistory[] = [
        {
            day: '01.09.2020',
            hours: [{
              hour: '08:00',
              value: '100'
            },
            {
                hour: '12:00',
                value: '1200'
            },
            {
                hour: '23:00',
                value: '10'
            }]
        },
        {
            day: '02.09.2020',
            hours: [{
              hour: '08:00',
              value: '12300'
            },
            {
                hour: '10:00',
                value: '110'
            },
            {
                hour: '12:00',
                value: '1540'
            },
            {
                hour: '16:00',
                value: '640'
            },
            {
                hour: '23:00',
                value: '100000'
            }]
        },
        {
            day: '03.09.2020',
            hours: [{
              hour: '12:00',
              value: '12300'
            },
            {
                hour: '10:00',
                value: '10'
            },
            {
                hour: '12:43',
                value: '4430'
            },
            {
                hour: '16:00',
                value: '640'
            },
            {
                hour: '23:59',
                value: '870'
            }]
        }
    ];

    private isUserHasWriteClaims: boolean;

    constructor(
        public manualInputService: ManualInputService,
        public widgetService: WidgetService,
        public widgetSettingsService: WidgetSettingsService,
        private http: HttpClient,
        private configService: AppConfigService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.restUrl = this.configService.restUrl;
        this.widgetIcon = 'peoples';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngAfterViewInit(): void {
        if (!this.isMock) {
            setInterval(() => {
                this.scrollBlockWidth = this.scroll?.nativeElement.scrollWidth;
                this.scrollTruckWidth = this.truckScroll?.nativeElement.clientWidth;
                this.scrollBlockWidth - this.scrollTruckWidth === 0
                    ? (this.widthTruckScroll = 0)
                    : (this.widthTruckScroll = this.scrollBlockWidth);
            }, 1000);
        }
        this.timeWidth = this.time?.nativeElement.clientWidth;
    }

    ngOnChanges(): void {
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.setInitData();
    }

    protected dataHandler(ref: { machines: IMachine_MI[]; isUserHasWriteClaims: boolean}): void {
        this.loadSaveData(ref);
    }

    activateEditMode(): void {
        if (this.isUserHasWriteClaims && this.editMode === false) {
            this.editMode = true;
        }
    }

    onChooseGroup(machineIdx: number = 0, groupIdx: number = 0, paramsIdx: number = 0): void {
        this.historicalData = {
            ...this.filteredData[machineIdx],
            groups: {
                ...this.filteredData[machineIdx].groups[groupIdx],
                params: {
                    ...this.filteredData[machineIdx].groups[groupIdx].params[paramsIdx]
                }
            }
        };
    }

    showHistorical(): void {
        this.isHistorical = true;
        this.timeWidth = this.time?.nativeElement.clientWidth;
        console.log('CHA ' + this.time?.nativeElement);
    }

    @Output()
    refresh(): void {
        this.data = [];
    }

    async setInitData(): Promise<void> {
        try {
            const data: { machines: IMachine_MI[]; isUserHasWriteClaims: boolean} = await this.manualInputService.getManualInput(this.id);
            this.loadSaveData(data);
        } catch (error) {
            console.log(error);
        }
    }

    onButtonSave(): void {
        if (!this.isSaveButton()) {
            return;
        }
        this.manualInputService.BtnSaveValues(this.data, this.widgetId);
        this.editMode = false;
    }

    onChangeValue(id: string): void {
        this.manualInputService.ChangeField(id, this.data);
    }

    onUnfocusValue(id: string): void {
        this.manualInputService.CheckLastValue(id, this.data);
    }

    async loadSaveData( data: { machines: IMachine_MI[]; isUserHasWriteClaims: boolean}): Promise<void> {
        this.isUserHasWriteClaims = false; // data.isUserHasWriteClaims;
        const settings: IMachine_MI[] = await this.widgetSettingsService.getSettings(this.uniqId);
        for (const itemDate of data.machines) {
            itemDate.open = settings?.find((el) => el.name === itemDate.name)?.open ?? true;
            itemDate.active = settings?.find((el) => el.name === itemDate.name)?.active ?? false;
            for (const item of itemDate.groups) {
                const setGroups = settings?.find((el) => el.name === itemDate.name);
                item.open = setGroups?.groups?.find((el) => el.name === item.name)?.open ?? true;
            }
            if (itemDate.active) {
                this.chooseSetting = itemDate;
                this.allSettings = false;
            }
        }
        this.data = this.manualInputService.LoadData(this.data, data.machines);

        if (this.filteredData.length === 0) {
            debugger;
            this.filteredData = this.data;
        }

        if (!this.historicalData) {
            this.historicalData = {
                ...this.filteredData[0],
                groups: {
                    ...this.filteredData[0]?.groups[0],
                    params: {
                        ...this.filteredData[0]?.groups[0]?.params[0]
                    }
                }
            };
        }
    }

    getWidth(): void {
        this.timeWidth = this.time?.nativeElement.clientWidth;
    }

    onScroll(event): void {
        this.scroll.nativeElement.scrollLeft = event.currentTarget.scrollLeft;
    }

    onAllSettings(): void {
        this.allSettings = !this.allSettings;
        this.data?.forEach((el) => el.active = false);
        this.filteredData = this.data;
        this.OnManualInputSendSettings(this.saveDataObj());
    }

    onSettings(item: IMachine_MI): void {
        this.data?.forEach((el) => el.active = false);
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
            this.data?.forEach((item) => item.open = this.openAllSettings);
            this.OnManualInputSendSettings(this.saveDataObj());
        } else {
            this.openAllMachine = !this.openAllMachine;
            this.data.find((el) => el.name === this.chooseSetting.name)
                ?.groups.forEach((item) => item.open = this.openAllMachine);
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
