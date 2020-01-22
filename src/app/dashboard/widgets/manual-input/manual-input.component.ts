import { Component, OnDestroy, OnInit, Input, Output, Inject, Injector } from '@angular/core';
import { ManualInputService } from '../../services/manual-input.service';
import { HttpClient } from '@angular/common/http';
import { Machine_MI, ManualInputData } from '../../models/manual-input.model';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { AppConfigService } from 'src/app/services/appConfigService';

@Component({
    selector: 'evj-manual-input',
    templateUrl: './manual-input.component.html',
    styleUrls: ['./manual-input.component.scss'],
})
export class ManualInputComponent implements OnInit, OnDestroy {
    static itemCols = 30;
    static itemRows = 20;

    private subscriptions: Subscription[] = [];

    public title: string;
    public previewTitle: string;

    constructor(
        public manualInputService: ManualInputService,
        public widgetService: NewWidgetService,
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

    Data: Machine_MI[] = [];

    private flag: boolean = true;

    ngOnInit() {
        this.showMock(this.isMock);
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
            .subscribe((ref: Machine_MI[]) => {
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
        });
    }

    showMock(show) {
        if (show) {
        } else {
            this.setInitData();
            this.wsConnect();
        }
    }
}
