import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGroupScreens } from '../group-selector/group-selector.component';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'evj-group-selector-row',
    templateUrl: './group-selector-row.component.html',
    styleUrls: ['./group-selector-row.component.scss'],
})
export class GroupSelectorRowComponent implements OnInit {
    @Input() public group: IGroupScreens;
    @Output() private selectGroup: EventEmitter<boolean> = new EventEmitter<boolean>();

    public isShowButtons: boolean = false;
    public isEditing: boolean = false;

    public formControl: FormControl = new FormControl('');

    constructor() {}

    public ngOnInit(): void {}

    public onMouseEnter(): void {
        this.isShowButtons = true;
    }

    public onMouseLeave(): void {
        this.isShowButtons = false;
    }

    public onClickGroup(): void {
        this.selectGroup.emit(true);
    }

    public onClickEdit(): void {
        this.formControl.setValue(this.group.name);
        this.isEditing = true;
    }

    public onClickDelete(): void {
        this.selectGroup.emit(false);
    }

    public onClickSaveEdit(): void {
        this.isEditing = false;
        this.group.name = this.formControl.value;
        this.selectGroup.emit(true);
    }

    public onClickCancelEdit(): void {
        this.isEditing = false;
        this.formControl.setValue('');
    }
}
