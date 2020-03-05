import {
    Component,
    OnDestroy,
    OnInit,
    Input,
    Output,
    Inject,
    Injector,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from '@angular/core';
import { ManualInputService } from '../../services/manual-input.service';
import { HttpClient } from '@angular/common/http';
import { IMachine_MI, ManualInputData, IGroup_MI } from '../../models/manual-input.model';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { AppConfigService } from 'src/app/services/appConfigService';
import { ThrowStmt } from '@angular/compiler';
import { ItemSizeAverager } from '@angular/cdk-experimental/scrolling';
import { WidgetSettingsService } from '../../services/widget-settings.service';
import { FORMERR } from 'dns';

@Component({
    selector: 'evj-manual-input',
    templateUrl: './manual-input.component.html',
    styleUrls: ['./manual-input.component.scss'],
})
export class ManualInputComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('scroll') scroll: ElementRef;

    scrollWidth: number;

    static itemCols = 30;
    static itemRows = 20;

    private subscriptions: Subscription[] = [];

    public title: string;
    public previewTitle: string;

    allSettings: boolean = true;
    openAllSettings: boolean = true;
    openMachine: boolean = true;
    openItemMachine: boolean = true;

    chooseSetting: IMachine_MI;

    constructor(
        public manualInputService: ManualInputService,
        public widgetService: NewWidgetService,
        public widgetSettingsService: WidgetSettingsService,
        private http: HttpClient,
        configService: AppConfigService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.restUrl = configService.restUrl;
        this.isLoading = true;
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(id).subscribe((data) => {
                this.title = data.title;
                this.previewTitle = data.widgetType;
            })
        );
    }

    public isLoading: boolean;

    private restUrl: string;

    Data: IMachine_MI[] = [];
    Datas: IMachine_MI[] = [];

    saveStateDate: IMachine_MI[] = [];

    private flag: boolean = true;

    saveData: IMachine_MI[] = [];

    ngOnInit() {
        this.showMock(this.isMock);
    }

    ngAfterViewInit() {
        if (!this.isMock) {
            setTimeout(() => {
                this.scrollWidth = this.scroll.nativeElement.scrollWidth;
            }, 1);
        }
    }

    ngOnDestroy() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
        this.subscriptions = [];
    }

    @Output()
    refresh(): void {
        this.Data = [];
    }

    setInitData(): void {
        this.http
            .get(this.restUrl + '/api/manualinput/ManualInputData/' + this.id)
            .subscribe((ref: IMachine_MI[]) => {
                this.Data = this.manualInputService.LoadData(this.Data, ref);
            });
    }

    onButtonSave() {
        this.manualInputService.BtnSaveValues(this.Data);
    }

    onChangeValue(id: string) {
        this.manualInputService.ChangeField(id, this.Data);
    }

    onUnfocusValue(id: string) {
        this.manualInputService.CheckLastValue(id, this.Data);
    }

    private wsConnect(): void {
        this.widgetService.getWidgetLiveDataFromWS(this.id, 'manual-input').subscribe((ref) => {
            this.Data = this.manualInputService.LoadData(this.Data, ref);
            const param = this.widgetSettingsService.getSettingsMI(this.uniqId);
            this.loadSaveData(param);
        });
    }

    showMock(show: boolean): void {
        if (show) {
        } else {
            this.setInitData();
            this.wsConnect();
        }
    }

    async loadSaveData(param) {
        let indexMachine: number = 0;
        //const param = await this.widgetSettingsService.getSettings(this.uniqId);
        for (let itemDate of this.Data) {
            indexMachine++;
            for (let itemSaveDate of param) {
                if (itemDate.name === itemSaveDate.name) {
                    this.Data[indexMachine - 1].open = itemSaveDate.open;
                    this.Data[indexMachine - 1].active = itemSaveDate.active;
                }
            }
        }
    }

    onScroll(event) {
        this.scroll.nativeElement.scrollLeft = event.currentTarget.scrollLeft;
    }

    onAllSettings(): void {
        this.allSettings = !this.allSettings;
        for (let i of this.Data) {
            i.active = false;
        }
    }

    onSettings(item: IMachine_MI): void {
        for (let i of this.Data) {
            i.active = false;
        }
        item.active = !item.active;
        this.chooseSetting = item;
        this.allSettings = false;
    }

    onShowAllSettings(): void {
        this.openAllSettings = !this.openAllSettings;
        for (let i of this.Data) {
            i.open = this.openAllSettings;
        }
    }

    onShowMachine(machine): void {
        if (machine.open === undefined) {
            machine.open = true;
        }
        machine.open = !machine.open;
        this.saveDataObj();
        this.OnManualInputSendSettings(this.saveData);
        this.saveData = [];
    }

    onShowItemMachine(item): void {
        item.open = !item.open;
    }

    onInputMessage(i): void {
        i.openInput = !i.openInput;
    }

    public async OnManualInputSendSettings(param): Promise<void> {
        await this.widgetSettingsService.saveSettings(this.uniqId, param);
    }

    private CallMIScript(json): void {}

    saveDataObj(): void {
        for (const machine of this.Data) {
            const machineObj: IMachine_MI = {
                name: machine.name,
                active: machine.active,
                open: machine.open,
                groups: [],
            };
            for (const item of machine.groups) {
                let valueOpen: boolean;
                if (item.open === undefined) {
                    valueOpen = true;
                } else {
                    valueOpen = item.open;
                }
                const itemObj: IGroup_MI = {
                    name: item.name,
                    open: valueOpen,
                };
                machineObj.groups.push(itemObj);
            }
            this.saveData.push(machineObj);
        }
    }
}
