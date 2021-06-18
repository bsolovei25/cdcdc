import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IHeaderSettingPanelTab, IInputItem } from '@dashboard/components/header-setting-panel/header-setting-panel.interface';
import { AbstractControl, ControlContainer, FormArray, FormControl, FormGroup } from '@angular/forms';
import { FilterBlock } from '@dashboard/components/header-setting-panel/header-setting-panel.enum';

const DefaultItem: IInputItem = { name: 'Name', screenName: 'ScreenName', screenGroup: 'ScreenGroup' };

@Component({
    selector: 'evj-header-setting-panel-tab',
    templateUrl: './header-setting-panel-tab.component.html',
    styleUrls: ['./header-setting-panel-tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderSettingPanelTabComponent implements OnInit {
    public form: FormGroup;
    filterBlock: typeof FilterBlock = FilterBlock;

    public tabForm: FormGroup = new FormGroup({
        filtration: new FormControl(''),
        relations: new FormArray([this.createInput()]),
    });
    public activeBlock: FilterBlock;
    public filterBlocks: typeof FilterBlock = FilterBlock;

    @Input() tab: IHeaderSettingPanelTab;
    @Output() toggleActiveEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() removeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private controlContainer: ControlContainer) {}

    public ngOnInit(): void {
        this.form = (this.controlContainer.control as FormGroup);
    }

    public toggleActive(): void {
        const { isActivate } = this.form.value;
        this.form.get('isActivate').setValue(!isActivate);
        this.toggleActiveEvent.emit(!isActivate);
    }

    get relationsArray(): AbstractControl[] {
        return (this.form.get('relations') as FormArray).controls;
    }

    get relations(): FormArray {
        return this.form.get('relations') as FormArray;
    }

    // TODO добавить логику заполнения формы при редактировании хедера после задачи с подвязкой данных
    public addInput(item: IInputItem = DefaultItem): void {
        this.relations.push(this.createInput());
    }

    public removeInput(itemIndex: number): void {
        this.relations.removeAt(itemIndex);
    }

    public removeTab(): void {
        this.removeEvent.next(true);
    }

    public setActive(type: FilterBlock): void {
        this.activeBlock = type;
        this.form.get('filtration').setValue(this.filterBlock[type]);
    }

    public toggleTab(): void {
        const { isOpen } = this.form.value;
        this.form.get('isOpen').setValue(!isOpen);
    }

    private createInput(): FormGroup {
        return new FormGroup({
            name: new FormControl(''),
            screenName: new FormControl(''),
            screenGroup: new FormControl(''),
        })
    }
}
