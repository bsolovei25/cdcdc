import {
    Component,
    Output,
    Inject,
    ViewChild,
    ElementRef,
    OnDestroy,
    OnInit,
    AfterViewInit,
} from '@angular/core';
import { ManualInputService } from '../../services/manual-input.service';
import { HttpClient } from '@angular/common/http';
import { IMachine_MI, IGroup_MI } from '../../models/manual-input.model';
import { NewWidgetService } from '../../services/new-widget.service';
import { AppConfigService } from 'src/app/services/appConfigService';
import { WidgetSettingsService } from '../../services/widget-settings.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { ClaimService, IClaimAll } from '../../services/claim.service';
import { SelectionModel } from '@angular/cdk/collections';

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
export class ManualInputComponent extends WidgetPlatform
    implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('truckScroll') truckScroll: ElementRef;
    @ViewChild('scroll') scroll: ElementRef;

    scrollBlockWidth: number;
    scrollTruckWidth: number;

    widthTruckScroll: number;

    static itemCols: number = 30;
    static itemRows: number = 20;

    public title: string;
    public previewTitle: string;
    claim: IClaimAll;

    disabledMachine: SelectionModel<string> = new SelectionModel<string>(true);

    allSettings: boolean = true;
    openAllSettings: boolean = true;
    openAllMachine: boolean = true;

    chooseSetting: IMachine_MI;

    public isLoading: boolean;

    private restUrl: string;

    data: IMachine_MI[] = [];

    constructor(
        public manualInputService: ManualInputService,
        public widgetService: NewWidgetService,
        public widgetSettingsService: WidgetSettingsService,
        private http: HttpClient,
        private configService: AppConfigService,
        private claimService: ClaimService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'peoples';
    }

    ngOnInit(): void {
        super.widgetInit();
        this.restUrl = this.configService.restUrl;
        this.isLoading = true;
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

    protected dataHandler(ref: IMachine_MI[]): void {
        this.loadSaveData(ref);
    }

    @Output()
    refresh(): void {
        this.data = [];
    }

    async loadClaims(): Promise<void> {
        const units = await this.claimService.getUnits();
        this.claim = await this.claimService.getClaimAll();
        units.forEach((unit) => {
            this.claim.data.forEach((cl) => {
                // if (Number(cl.value) === unit.id && cl.claimCategoryName === "Запретить") {
                //     this.disabledMachine.select(unit.name);
                // }
            });
        });
    }

    async setInitData(): Promise<void> {
        try {
            const data: IMachine_MI[] = await this.manualInputService.getManualInput(this.id);
            this.loadSaveData(data);
            this.loadClaims();
        } catch (error) {
            console.log(error);
        }
    }

    onButtonSave(): void {
        this.manualInputService.BtnSaveValues(this.data);
    }

    onChangeValue(id: string): void {
        this.manualInputService.ChangeField(id, this.data);
    }

    onUnfocusValue(id: string): void {
        this.manualInputService.CheckLastValue(id, this.data);
    }

    async loadSaveData(data: IMachine_MI[]): Promise<void> {
        const settings: IMachine_MI[] = await this.widgetSettingsService.getSettings(this.uniqId);
        for (const itemDate of data) {
            itemDate.open = settings?.find((el) => el.name === itemDate.name)?.open ?? true;
            itemDate.active = settings?.find((el) => el.name === itemDate.name)?.active ?? false;
            for (const item of itemDate.groups) {
                const setGroups = settings?.find((el) => el.name === itemDate.name);
                item.open = setGroups?.groups?.find((el) => el.name === item.name)?.open ?? true;
            }
            if (itemDate.active) {
                this.chooseSetting === undefined
                    ? (this.chooseSetting = itemDate)
                    : (this.chooseSetting = this.chooseSetting);
                this.allSettings = false;
            }
        }

        this.data = this.manualInputService.LoadData(this.data, data);
    }

    onScroll(event): void {
        this.scroll.nativeElement.scrollLeft = event.currentTarget.scrollLeft;
    }

    onAllSettings(): void {
        this.allSettings = !this.allSettings;
        for (let i of this.data) {
            i.active = false;
        }
        this.OnManualInputSendSettings(this.saveDataObj());
    }

    onSettings(item: IMachine_MI): void {
        for (let i of this.data) {
            i.active = false;
        }
        item.active = !item.active;
        this.chooseSetting = item;
        this.allSettings = false;
        this.OnManualInputSendSettings(this.saveDataObj());
    }

    onShowAllSettings(): void {
        if (this.allSettings === true) {
            this.openAllSettings = !this.openAllSettings;
            for (let i of this.data) {
                i.open = this.openAllSettings;
            }
            this.OnManualInputSendSettings(this.saveDataObj());
        } else {
            this.openAllMachine = !this.openAllMachine;
            let machines = this.data.findIndex((el) => el.name === this.chooseSetting.name);
            for (let i of this.data[machines].groups) {
                i.open = this.openAllMachine;
            }
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
}
