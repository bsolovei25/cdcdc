import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';

interface IAstueOnpzMenuStructure {
    manufactures: IAstueOnpzMenuManufacture[];
    title: string;
    widgetType: string;
}

export interface IAstueOnpzMenuManufacture {
    name: string;
    units: IAstueOnpzMenuUnit[];
}

export interface IAstueOnpzMenuUnit {
    name: string;
}

@Component({
    selector: 'evj-astue-onpz-menu-structure',
    templateUrl: './astue-onpz-menu-structure.component.html',
    styleUrls: ['./astue-onpz-menu-structure.component.scss']
})
export class AstueOnpzMenuStructureComponent extends WidgetPlatform implements OnInit, OnDestroy, AfterViewInit {

    public manufactures: IAstueOnpzMenuManufacture[];

    public units: IAstueOnpzMenuUnit[];

    public manufactureSelect: FormControl = new FormControl();

    public unitSelect: FormControl = new FormControl();

    constructor(
        public widgetService: WidgetService,
        private astueOnpzService: AstueOnpzService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
    }

    public ngAfterViewInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: IAstueOnpzMenuStructure): void {
        this.manufactures = ref.manufactures;
        this.setManufactureSelectValue();
        this.setUnitSelectValue();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.astueOnpzService.sharedMonitoringOptions.subscribe(options => {
                if (options) {
                    this.manufactureSelect.setValue(options.manufactureName);
                    this.manufactures?.forEach(manufacture => {
                        if (manufacture.name === options.manufactureName) {
                            this.units = manufacture.units;
                            this.unitSelect.setValue(options.unitName);
                        }
                    });
                }
            }),
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public onManufactureSelect(event: MatSelectChange): void {
        this.setUnitSelectValue(false);
        this.astueOnpzService.updateManufactureName(event.value);
    }

    public onUnitSelect(event: MatSelectChange): void {
        this.astueOnpzService.updateUnitName(event.value);
    }

    private setManufactureSelectValue(): void {
        const value = this.manufactureSelect.value ? this.manufactureSelect.value : this.manufactures[0].name;
        this.manufactureSelect.setValue(value);
        this.astueOnpzService.updateManufactureName(value);
    }

    private setUnitSelectValue(saveValueFlag: boolean = true): void {
        if (this.unitSelect.value && saveValueFlag) {
            return;
        }
        const value = this.manufactureSelect.value;
        this.manufactures.forEach(manufacture => {
            if (manufacture.name === value) {
                this.units = manufacture.units;
                this.unitSelect.setValue(this.units[0].name);
                this.astueOnpzService.updateUnitName(this.units[0].name);
            }
        });
    }
}
