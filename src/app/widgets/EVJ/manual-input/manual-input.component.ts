import { Component, Output, Inject, ViewChild, ElementRef, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, style, state, transition, animate, group } from '@angular/animations';
import { ManualInputService } from '../../../dashboard/services/widgets/EVJ/manual-input.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { IGroup_MI, IMachine_MI } from '../../../dashboard/models/EVJ/manual-input.model';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetSettingsService } from '../../../dashboard/services/widget-settings.service';
import { AppConfigService } from '@core/service/app-config.service';

@Component({
    selector: 'evj-manual-input',
    templateUrl: './manual-input.component.html',
    styleUrls: ['./manual-input.component.scss'],
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
export class ManualInputComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('truckScroll') truckScroll: ElementRef;
    @ViewChild('scroll') scroll: ElementRef;

    scrollBlockWidth: number;
    scrollTruckWidth: number;

    widthTruckScroll: number;

    public title: string;
    public previewTitle: string;

    allSettings: boolean = true;
    openAllSettings: boolean = true;
    openAllMachine: boolean = true;

    chooseSetting: IMachine_MI;

    private restUrl: string;

    data: IMachine_MI[] = [];
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
                this.scrollBlockWidth = this.scroll.nativeElement.scrollWidth;
                this.scrollTruckWidth = this.truckScroll.nativeElement.clientWidth;
                this.scrollBlockWidth - this.scrollTruckWidth === 0
                    ? (this.widthTruckScroll = 0)
                    : (this.widthTruckScroll = this.scrollBlockWidth);
            }, 1000);
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.setInitData();
    }

    protected dataHandler(ref: { machines: IMachine_MI[]; isUserHasWriteClaims: boolean }): void {
        this.loadSaveData(ref);
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

    onButtonSave(): void {
        if (!this.isSaveButton()) {
            return;
        }
        this.manualInputService.BtnSaveValues(this.data, this.widgetId);
    }

    onChangeValue(id: string): void {
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
                this.chooseSetting = itemDate;
                this.allSettings = false;
            }
        }
        this.data = this.manualInputService.LoadData(this.data, data.machines);
    }

    onScroll(event): void {
        this.scroll.nativeElement.scrollLeft = event.currentTarget.scrollLeft;
    }

    onAllSettings(): void {
        this.allSettings = !this.allSettings;
        this.data?.forEach((el) => (el.active = false));
        this.OnManualInputSendSettings(this.saveDataObj());
    }

    onSettings(item: IMachine_MI): void {
        this.data?.forEach((el) => (el.active = false));
        item.active = !item.active;
        this.chooseSetting = item;
        this.allSettings = false;
        this.OnManualInputSendSettings(this.saveDataObj());
    }

    onShowAllSettings(): void {
        if (this.allSettings === true) {
            this.openAllSettings = !this.openAllSettings;
            this.data?.forEach((item) => (item.open = this.openAllSettings));
            this.OnManualInputSendSettings(this.saveDataObj());
        } else {
            this.openAllMachine = !this.openAllMachine;
            this.data
                .find((el) => el.name === this.chooseSetting.name)
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
            if (this.chooseSetting.isUserHasWriteClaims) {
                return true;
            }
        }
        return false;
    }
}
