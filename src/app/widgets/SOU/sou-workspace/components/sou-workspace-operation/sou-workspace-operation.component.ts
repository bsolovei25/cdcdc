import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IInputOptions } from '@shared/interfaces/input.model';

@Component({
    selector: 'evj-sou-workspace-operation',
    templateUrl: './sou-workspace-operation.component.html',
    styleUrls: ['./sou-workspace-operation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SouWorkspaceOperationComponent implements OnInit {

    @Input() sourceType: 'Tank'|'Unit';
    @Input() destinationType: 'Tank'|'Unit';

    @Output() clickSmartTrend: EventEmitter<boolean> = new EventEmitter;

    public form: FormGroup;
    public massInputOptions: IInputOptions = {
        type: 'number',
        state: 'normal',
        placeholder: '',
        isMovingPlaceholder: false,
    };

    constructor() {
    }

    ngOnInit(): void {
        this.initForm();
    }

    clickBtn(): void {
        this.clickSmartTrend.emit();
    }

    public get isValid(): boolean {
        return this.form?.valid;
    }

    public get sourceMass(): number {
        return this.form?.value?.massSource;
    }

    public get startTime(): Date {
        return this.form?.value?.dateSource;
    }

    public get endTime(): Date {
        return this.form?.value?.dateReceiver;
    }

    public get destinationMass(): number {
        return this.form?.value?.massReceiver;
    }

    public get isSourceTank(): boolean {
        return this.sourceType === 'Tank';
    }

    public get isReceiverTank(): boolean {
        return this.destinationType === 'Tank';
    }

    public get delta(): number {
        const massSource = this.form?.value?.massSource && parseInt(this.form?.value?.massSource, 10);
        const massReceiver = this.form?.value?.massReceiver && parseInt(this.form?.value?.massReceiver, 10);

        if (
            (massSource || massSource === 0)
            && (massReceiver || massReceiver === 0)
        ) {
            return Math.abs(massReceiver - massSource);
        }

        return null;
    }

    private initForm(): void {
        this.form = new FormGroup({
            dateSource: new FormControl(new Date()),
            dateDestination: new FormControl(''),
            massSource: new FormControl('100'),
            massReceiver: new FormControl(null),
        })
    }


}
