import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EcWidgetService } from '@widgets/EC/ec-widget-shared/ec-widget.service';
import { debounceTime, distinctUntilChanged, filter, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

interface IHeaderWidgetMenuResponse {
    menu: IHeaderWidgetMenu;
}

interface IHeaderWidgetMenu {
    equipments: IMenuReferenceModel[];
    manufacturies: IMenuReferenceModel[];
    units: IMenuReferenceModel[];
}

interface IMenuReferenceModel {
    id: string;
    parentId?: string;
    name: string;
    deviationCount: number;
    isActive?: boolean;
    fileName?: string;
}

interface IIcon {
    name: string;
    fileName: string;
}

const icons: IIcon[] = [
    { name: 'Печи', fileName: 'bake' },
    { name: 'Теплообменники', fileName: 'heatexchanger' },
    { name: 'Насосы', fileName: 'pump' },
    { name: 'АВО', fileName: 'abo' },
    { name: 'Компрессоры', fileName: 'compressor' },
    { name: 'Котлы-утилизаторы', fileName: 'waste-heat-boiler' }
];

@Component({
    selector: 'evj-ec-widget-header',
    templateUrl: './ec-widget-header.component.html',
    styleUrls: ['./ec-widget-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcWidgetHeaderComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public headerMenuForm: FormGroup;
    public data$: BehaviorSubject<null | IHeaderWidgetMenu> = new BehaviorSubject(null);

    constructor(
        public widgetService: WidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private ecWidgetService: EcWidgetService,
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.initForm();
        this.initListeners();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IHeaderWidgetMenuResponse): void {
        this.data$.next(this.normalizeData(ref));
    }

    private normalizeData(data: IHeaderWidgetMenuResponse): IHeaderWidgetMenu {
        const activeEquipment = this.data$.getValue()?.equipments.find(x => x.isActive);

        data.menu.equipments = data.menu.equipments.map(equipment => {
            const icon = icons.find(item => item.name === equipment.name);

            return {
                ...equipment,
                isActive: activeEquipment?.name === equipment.name,
                fileName: icon.fileName
            };
        });

        return data?.menu;
    }

    public get getMenuUnits(): IMenuReferenceModel[] {
        return this.data$.getValue()?.units.filter(
            (item) => item.parentId === this.headerMenuForm.get('manufacture').value
        );
    }

    public get getEquipments(): IMenuReferenceModel[] {
        return this.data$.getValue()?.equipments.filter(
            item => item.parentId === this.headerMenuForm.get('unit').value
        )
    }

    public onClickEquipment(equipment: IMenuReferenceModel): void {
        if (!equipment.isActive) {
            const data = this.data$.getValue();

            data.equipments = data.equipments.map(item => ({
                ...item,
                isActive: equipment.id === item.id
            }));
            this.data$.next(data);
            this.ecWidgetService.headerWidgetEquipmentId$.next({
                id: equipment.id,
                fileName: equipment.fileName,
            });
            this.ecWidgetService.mnemonicWidgetEquipmentItemId$.next(null);
            this.ecWidgetService.mnemonicWidgetBakeItemId$.next(null);
        }
    }

    private setFormValues(): void {
        this.headerMenuForm?.get('manufacture').setValue(
            this.headerMenuForm.get('manufacture').value
                ?? this.data$.getValue()?.manufacturies[0].id
        );
        this.headerMenuForm?.get('unit').setValue(
            this.headerMenuForm.get('unit').value
                ?? this.getMenuUnits[0].id
        );
    }

    private initForm(): void {
        this.headerMenuForm = new FormGroup({
            manufacture: new FormControl(null),
            unit: new FormControl(null)
        });
    }

    private initListeners(): void {
        this.subscriptions.push(
            this.headerMenuForm.get('manufacture').valueChanges
                .subscribe(() => {
                    this.headerMenuForm.get('unit').setValue(null);
                }),

            this.headerMenuForm.get('unit').valueChanges
                .pipe(
                    debounceTime(100),
                    distinctUntilChanged()
                )
                .subscribe(() => {
                    this.deactivateEquipments();
                    this.ecWidgetService.headerWidgetEquipmentId$.next(null);
                    this.ecWidgetService.mnemonicWidgetEquipmentItemId$.next(null);
                    this.ecWidgetService.mnemonicWidgetBakeItemId$.next(null);
                }),

            this.data$
                .pipe(
                    filter(Boolean),
                    take(1)
                )
                .subscribe(this.setFormValues.bind(this)),
        );
    }

    private deactivateEquipments(): void {
        const data = this.data$.getValue();

        data.equipments = data.equipments.map(item => ({
            ...item,
            isActive: false
        }));
        this.data$.next(data);
    }
}
