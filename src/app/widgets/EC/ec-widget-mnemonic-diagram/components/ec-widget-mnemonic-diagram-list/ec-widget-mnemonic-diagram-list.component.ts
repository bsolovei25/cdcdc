import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IMnemonicEquipmentData } from '@widgets/EC/ec-widget-mnemonic-diagram/ec-widget-mnemonic-diagram.component';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EcWidgetService } from '@widgets/EC/ec-widget-shared/ec-widget.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-ec-widget-mnemonic-diagram-list',
    templateUrl: './ec-widget-mnemonic-diagram-list.component.html',
    styleUrls: ['./ec-widget-mnemonic-diagram-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EcWidgetMnemonicDiagramListComponent implements OnInit, OnDestroy{
    public form: FormGroup;
    public data: IMnemonicEquipmentData[] = [];

    private subscriptions: Subscription[] = [];

    @Input() set inputData(data: IMnemonicEquipmentData[]) {
        if (data) {
            this.data = this.setActiveEquipment(data);
            this.filteringData(this.form.get('search').value);
        }
    };

    constructor(
        private ecWidgetService: EcWidgetService,
        private cd: ChangeDetectorRef,
    ) {}

    public ngOnInit(): void {
        this.initForm();
        this.initListeners();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    public onClickEquipment(item: IMnemonicEquipmentData): void {
        if (!item.isActive) {
            this.ecWidgetService.mnemonicWidgetEquipmentItemId$.next(item.id);
        }

        if (this.activeEquipment) {
            this.activeEquipment.isActive = false;
        }

        item.isActive = true;
    }

    private setActiveEquipment(data: IMnemonicEquipmentData[]): IMnemonicEquipmentData[] {
        if (this.activeEquipment) {
            data.forEach(item => {
                item.isActive = item.name === this.activeEquipment.name;
            })
        }
        return data;
    }

    private get activeEquipment(): IMnemonicEquipmentData | undefined {
        return this.data?.find(item => item.isActive);
    }

    private filteringData(val: string): void {
        this.data.forEach(item => {
            item.isFiltered = item.name.toLowerCase().indexOf(val.toLowerCase()) === -1;
        });
    }

    private initForm(): void {
        this.form = new FormGroup({
            search: new FormControl(''),
        })
    }

    private initListeners(): void {
        this.subscriptions.push(
            this.form.valueChanges
                .pipe(
                    debounceTime(400),
                    distinctUntilChanged(),
                )
                .subscribe(val => {
                    this.filteringData(val.search);
                    this.cd.detectChanges();
                }),
        )
    }
}
