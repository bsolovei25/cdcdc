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

    private flag: boolean = true;

    saveData: IMachine_MI[] = [];

    ngOnInit() {
        this.showMock(this.isMock);
    }

    ngAfterViewInit() {
        if (!this.isMock) {
            setTimeout(() => {
                this.scrollWidth = this.scroll.nativeElement.scrollWidth;
            }, 10);
        }
    }

    ngOnDestroy() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
        this.subscriptions = [];
    }

    public onActiveBlock(name, event) {
        if (!this.isMock) {
            for (let item of this.Data) {
                event.currentTarget.parentElement.lastElementChild.classList.remove(
                    'ng-star-inserted'
                );
                if (
                    item.name === name &&
                    event.currentTarget.parentElement.lastElementChild.className ===
                    'table-container-2-none'
                ) {
                    for (let i of event.currentTarget.parentElement.children) {
                        i.classList.remove('ng-star-inserted');
                        if (i.className === 'table-container-2-none') {
                            i.classList.remove('table-container-2-none');
                            i.classList.add('table-container-2');
                        }
                    }
                } else if (
                    item.name === name &&
                    event.currentTarget.parentElement.lastElementChild.className ===
                    'table-container-2'
                ) {
                    for (let i of event.currentTarget.parentElement.children) {
                        i.classList.remove('ng-star-inserted');
                        if (i.className === 'table-container-2') {
                            i.classList.remove('table-container-2');
                            i.classList.add('table-container-2-none');
                        }
                    }
                }
            }
        }
    }

    public onActiveBottomBlock(name, event) {
        if (!this.isMock) {
            for (let item of this.Data) {
                for (let i of item.groups) {
                    if (
                        i.name === name &&
                        event.currentTarget.parentElement.lastElementChild.className ===
                        'd-table-none'
                    ) {
                        for (let i of event.currentTarget.parentElement.children) {
                            if (i.className === 'd-table-none') {
                                i.classList.remove('d-table-none');
                                i.classList.add('d-table');
                            }
                        }
                    } else if (
                        i.name === name &&
                        event.currentTarget.parentElement.lastElementChild.className === 'd-table'
                    ) {
                        for (let i of event.currentTarget.parentElement.children) {
                            if (i.className === 'd-table') {
                                i.classList.remove('d-table');
                                i.classList.add('d-table-none');
                            }
                        }
                    }
                }
            }
        }
    }

    @Output()
    refresh() {
        this.Data = [];
    }

    setInitData() {
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

    private wsConnect() {
        this.widgetService.getWidgetLiveDataFromWS(this.id, 'manual-input').subscribe((ref) => {
            this.Data = this.manualInputService.LoadData(this.Data, ref);
            const params = this.widgetSettingsService.getSettings(this.uniqId);
            //   this.CallMIScript(JSON.stringify(params));
        });
    }

    showMock(show) {
        if (show) {
        } else {
            this.setInitData();
            this.wsConnect();
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
        const container = document.getElementById('container');
        if (this.openAllSettings) {
            container.className = 'container';
        } else {
            container.className = 'container-none';
        }
    }

    onShowMachine(machine): void {
        machine.open = !machine.open;
        this.saveDataObj();
        // const jsonObj = JSON.stringify({ data: this.Data });
        this.OnManualInputSendSettings(this.saveData);
        this.saveData = [];
    }

    onShowItemMachine(item): void {
        item.open = !item.open;
    }

    public async OnManualInputSendSettings(param): Promise<void> {
        await this.widgetSettingsService.saveSettings(this.uniqId, param);
    }

    private CallMIScript(json): void { }

    saveDataObj(): void {
        for (const machine of this.Data) {
            const machineObj: IMachine_MI = {
                name: machine.name,
                active: machine.active,
                open: machine.open,
                groups: [],
            };
            for (const item of machine.groups) {
                let itemObj: IGroup_MI;
                itemObj.name = item.name;
                if (item.open === undefined) {
                    itemObj.open = true;
                } else {
                    itemObj.open = item.open;
                }
                machineObj.groups.push(itemObj);
            }
            this.saveData.push(machineObj);
        }
    }
}
