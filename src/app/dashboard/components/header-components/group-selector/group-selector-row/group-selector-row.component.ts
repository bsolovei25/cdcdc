import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGroupScreens } from '../group-selector.component';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'evj-group-selector-row',
    templateUrl: './group-selector-row.component.html',
    styleUrls: ['./group-selector-row.component.scss'],
})
export class GroupSelectorRowComponent implements OnInit {
    @Input() public isClaimsAvailable: boolean = false;
    @Input() public group: IGroupScreens;
    @Output() private selectGroup: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() private deleteGroup: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() private editGroup: EventEmitter<string> = new EventEmitter<string>();

    readonly baseSrc: string = 'https://deploy.funcoff.club/api/file-storage/';

    public isShowButtons: boolean = false;
    public isEditing: boolean = false;

    public formControl: FormControl = new FormControl({value: '', disabled: false});

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
        this.deleteGroup.emit(true);
    }

    public onClickSaveEdit(): void {
        this.isEditing = false;
        this.editGroup.emit(this.formControl.value);
    }

    public onClickCancelEdit(): void {
        this.isEditing = false;
        this.formControl.setValue('');
    }
}
