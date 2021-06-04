import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EcWidgetService } from '@widgets/EC/ec-widget-shared/ec-widget.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
    isActive?: boolean;
    fileName?: string;
}

interface IIcon {
    name: string;
    fileName: string;
}

const icons: IIcon[] = [
    {name: 'Печи', fileName: 'bake'},
    {name: 'Теплообменники', fileName: 'heatexchanger'},
    {name: 'Насосы', fileName: 'pump'},
    {name: 'АВО', fileName: 'abo'},
    {name: 'Компрессоры', fileName: 'compressor'},
    {name: 'Котлы-утилизаторы', fileName: 'waste-heat-boiler'},
];


@Component({
    selector: 'evj-ec-widget-header',
    templateUrl: './ec-widget-header.component.html',
    styleUrls: ['./ec-widget-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcWidgetHeaderComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public headerWidgetMenu: IHeaderWidgetMenu | null = null;
    public headerMenuForm: FormGroup;

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
        this.initFormListeners();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IHeaderWidgetMenuResponse): void {
        const activeEquipment = this.headerWidgetMenu?.equipments.find(data => data.isActive);

        this.headerWidgetMenu = ref?.menu;
        this.headerWidgetMenu.equipments.forEach(equipment => {
            const icon = icons.find(item => item.name === equipment.name);

            equipment.isActive = activeEquipment?.name === equipment.name;
            equipment.fileName = icon.fileName;
        });
        this.setFormValues();
    }

    public get getMenuUnits(): IMenuReferenceModel[] {
        return this.headerWidgetMenu?.units.filter(
            (item) => item.parentId === this.headerMenuForm.get('manufacture').value
        );
    }

    public onClickEquipment(data: IMenuReferenceModel): void {
        if (!data.isActive) {
            this.headerWidgetMenu.equipments.forEach(item => item.isActive = false);
            data.isActive = !data.isActive;
            this.ecWidgetService.headerWidgetEquipmentId$.next(data.id);
        }
    }

    private setFormValues(): void {
        this.headerMenuForm.get('manufacture').setValue(
            this.headerMenuForm.get('manufacture').value
                ?? this.headerWidgetMenu.manufacturies[0].id
        );
        this.headerMenuForm.get('unit').setValue(
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

    private initFormListeners(): void {
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
            .subscribe(unit => {
                this.ecWidgetService.headerWidgetUnitId$.next(unit);
            }),
        )
    }
}
