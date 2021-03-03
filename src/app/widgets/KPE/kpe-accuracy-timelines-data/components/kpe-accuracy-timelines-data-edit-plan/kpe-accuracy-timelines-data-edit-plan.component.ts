import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'evj-kpe-accuracy-timelines-data-edit-plan',
  templateUrl: './kpe-accuracy-timelines-data-edit-plan.component.html',
  styleUrls: ['./kpe-accuracy-timelines-data-edit-plan.component.scss']
})
export class KpeAccuracyTimelinesDataEditPlanComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    public dateControl: FormControl = new FormControl({ value: new Date(), disabled: false });
}