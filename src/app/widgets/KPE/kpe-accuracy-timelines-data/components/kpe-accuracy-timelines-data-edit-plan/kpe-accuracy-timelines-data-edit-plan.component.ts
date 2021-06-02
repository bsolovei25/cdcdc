import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'evj-kpe-accuracy-timelines-data-edit-plan',
  templateUrl: './kpe-accuracy-timelines-data-edit-plan.component.html',
  styleUrls: ['./kpe-accuracy-timelines-data-edit-plan.component.scss']
})
export class KpeAccuracyTimelinesDataEditPlanComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { date: string }) {}

    ngOnInit(): void {}

    public dateControl: FormControl = new FormControl({ value: new Date(), disabled: false });
}
