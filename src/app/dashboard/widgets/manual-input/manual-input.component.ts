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
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { AppConfigService } from 'src/app/services/appConfigService';
import { WidgetSettingsService } from '../../services/widget-settings.service';

@Component({
    selector: 'evj-manual-input',
    templateUrl: './manual-input.component.html',
    styleUrls: ['./manual-input.component.scss'],
})
export class ManualInputComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('scroll') scroll: ElementRef;
    @ViewChild('blockScroll') blockScroll: ElementRef;

    scrollWidth: number;

    static itemCols: number = 30;
    static itemRows: number = 20;

    private subscriptions: Subscription[] = [];

    public title: string;
    public previewTitle: string;

    allSettings: boolean = true;
    openAllSettings: boolean = true;

    chooseSetting: IMachine_MI;

    constructor(
        public manualInputService: ManualInputService,
        public widgetService: NewWidgetService,
        public widgetSettingsService: WidgetSettingsService,
        private http: HttpClient,
        private configService: AppConfigService,
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

    saveData: IMachine_MI[] = [];

    ngOnInit(): void {
        this.showMock(this.isMock);
    }

    ngAfterViewInit(): void {
        if (!this.isMock) {
            setTimeout(() => {
                this.scrollWidth = this.scroll.nativeElement.scrollWidth;
            }, 1);
        }
    }

    ngOnDestroy(): void {
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
                this.loadSaveData(ref);
            });
    }

    onButtonSave(): void {
        this.manualInputService.BtnSaveValues(this.Data);
    }

    onChangeValue(id: string): void {
        this.manualInputService.ChangeField(id, this.Data);
    }

    onUnfocusValue(id: string): void {
        this.manualInputService.CheckLastValue(id, this.Data);
    }

    private wsConnect(): void {
        this.widgetService.getWidgetLiveDataFromWS(this.id, 'manual-input').subscribe((ref) => {
            this.loadSaveData(ref);
        });
    }

    showMock(show: boolean): void {
        if (show) {
        } else {
            this.setInitData();
            this.wsConnect();
        }
    }

    async loadSaveData(data: IMachine_MI[]): Promise<void> {
        const settings: IMachine_MI[] = await this.widgetSettingsService.getSettings(this.uniqId);
        for (const itemDate of data) {
            try{
                itemDate.open = settings.find(el => el.name === itemDate.name).open;
                itemDate.active = settings.find(el => el.name === itemDate.name).active;
            }
            catch{
            //    itemDate.open = true;
             //   itemDate.active = false;
            }
            // itemDate.open = settings.find(el => el.name === itemDate.name).open;
            // itemDate.active = settings.find(el => el.name === itemDate.name).active;
        }
        this.Data = this.manualInputService.LoadData(this.Data, data);
        console.log(this.Data);
    }

    onScroll(event): void {
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

    public async OnManualInputSendSettings(settings): Promise<void> {
        await this.widgetSettingsService.saveSettings(this.uniqId, settings);
    }

    saveDataObj(): void {
        for (const machine of this.Data) {
            const machineObj: IMachine_MI = {
                name: machine.name,
                active: machine.active,
                open: machine.open,
                groups: [],
            };
            for (const item of machine.groups) {
                const itemObj: IGroup_MI = {
                    name: item.name,
                    open: item.open === item?.open ?? true,
                };
                machineObj.groups.push(itemObj);
            }
            this.saveData.push(machineObj);
        }
    }
}
