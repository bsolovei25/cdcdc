import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';

export interface IGroupScreens {
    name: string;
}

@Component({
    selector: 'evj-group-selector',
    templateUrl: './group-selector.component.html',
    styleUrls: ['./group-selector.component.scss'],
})
export class GroupSelectorComponent implements OnInit, OnDestroy {
    public isDropdownShowing: boolean = false;

    public formControl: FormControl = new FormControl('');

    public groups: IGroupScreens[] = [
        {
            name: 'СОУ',
        },
        {
            name: 'КПЭ',
        },
        {
            name: 'ЭЖКО',
        },
        {
            name: 'СУС',
        },
        {
            name: 'Энергоконтроль',
        },
    ];

    public selector: SelectionModel<IGroupScreens> = new SelectionModel<IGroupScreens>();

    constructor() {}

    public ngOnInit(): void {
        this.selector.select(this.groups[0]);
    }

    public ngOnDestroy(): void {}

    public onMouseEnter(): void {
        this.isDropdownShowing = true;
    }

    public onMouseLeave(): void {
        this.isDropdownShowing = false;
    }

    public onAction(group: IGroupScreens, event: boolean): void {
        if (event) {
            this.selector.select(group);
        } else {
            const idx = this.groups.findIndex((item) => item === group);
            this.groups.splice(idx, 1);
        }
    }

    public onCreateGroup(): void {
        if (!!this.formControl.value) {
            const newGroup: IGroupScreens = {
                name: this.formControl.value.slice(),
            };
            this.groups.push(newGroup);
            this.selector.select(newGroup);
            this.formControl.setValue('');
        }
    }
}
