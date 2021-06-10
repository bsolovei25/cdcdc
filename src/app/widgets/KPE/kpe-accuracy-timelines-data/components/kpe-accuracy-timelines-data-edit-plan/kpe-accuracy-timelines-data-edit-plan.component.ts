import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KpeAccuracyTimelineDataService } from '@dashboard/services/widgets/KPE/kpe-accuracy-timeline-data.service';
import { IKpeAccTimelinesDataEditPlan } from '@dashboard/models/KPE/kpe-accuracy-timelines-data.model';
import { IAlertWindowModel } from '@shared/interfaces/alert-window.model';
import { KpeHelperService } from '@widgets/KPE/shared/kpe-helper.service';

@Component({
  selector: 'evj-kpe-accuracy-timelines-data-edit-plan',
  templateUrl: './kpe-accuracy-timelines-data-edit-plan.component.html',
  styleUrls: ['./kpe-accuracy-timelines-data-edit-plan.component.scss']
})
export class KpeAccuracyTimelinesDataEditPlanComponent implements OnInit {
    public correctionForm: FormGroup;
    public alert: IAlertWindowModel = null;
    public modifiedHeaderDate: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { date: string },
        private fb: FormBuilder,
        private kpeAccuracyTimelineDataService: KpeAccuracyTimelineDataService,
        private kpeHelperService: KpeHelperService,
        private dialogRef: MatDialogRef<KpeAccuracyTimelinesDataEditPlanComponent>
        ) {}

    public ngOnInit(): void {
        this.initHeader();
        this.initForm();
        this.initAlertWindow();
    }

    private initHeader(): void {
        this.modifiedHeaderDate = this.kpeHelperService.transformDateToMonthYear(this.data.date);
    }

    private initAlertWindow(): void {
        this.alert = this.kpeAccuracyTimelineDataService.planCorrectionFormAlert;
    }

    private initForm(): void {
        this.correctionForm = this.fb.group({
            correctionText: [null, [Validators.required]],
            correctionDate: [new Date()]
        })
    }

    public submitForm(): void {
        if (this.correctionForm.invalid) {
            this.openWarningModal();
        } else {
            this.sendPlanCorrection();
        }
    }

    private openWarningModal(): void {
        this.alert.isShow = true;

        this.alert.acceptFunction = () => {
            this.dialogRef.close()
        }
    }

    private sendPlanCorrection(): void {
        const dataToSend: IKpeAccTimelinesDataEditPlan = {
            adjustmentComment: this.correctionForm.value.correctionText,
            dateOfCreation: this.data.date,
            dateOfCorrection: this.correctionForm.value.correctionDate.toISOString()
        };

        this.kpeAccuracyTimelineDataService.submitPlanCorrection(dataToSend).then(() => this.dialogRef.close());
    }
}
