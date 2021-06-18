import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
    selector: 'evj-header-setting-panel-relation-input',
    templateUrl: './header-setting-panel-relation-input.component.html',
    styleUrls: ['./header-setting-panel-relation-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderSettingPanelRelationInputComponent implements OnInit {
    public form: FormGroup;

    @Output() deleteEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private controlContainer: ControlContainer) {}

    public ngOnInit(): void {
        this.form = (this.controlContainer.control as FormGroup);
    }

    public removeItem(): void {
        this.deleteEvent.emit(true);
    }

}
