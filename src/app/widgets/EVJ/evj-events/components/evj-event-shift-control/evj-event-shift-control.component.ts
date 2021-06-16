import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ChangeShiftCommonService } from '@widgets/EVJ/change-shift/services/change-shift-common.service';
import { DecorateUntilDestroy, takeUntilDestroyed } from '@shared/functions/take-until-destroed.function';
import { filter, tap } from 'rxjs/operators';

@DecorateUntilDestroy()
@Component({
    selector: 'evj-evj-event-shift-control',
    templateUrl: './evj-event-shift-control.component.html',
    styleUrls: ['./evj-event-shift-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvjEventShiftControlComponent implements OnInit {
    public isPickerOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public pickerControl: FormControl = new FormControl(new Date());
    public shifts$: Observable<any>;

    constructor(private changeShiftCommon: ChangeShiftCommonService) {}

    public ngOnInit(): void {
        this.pickerControl.valueChanges
            .pipe(takeUntilDestroyed(this))
            .subscribe((x) => this.changeShiftCommon.setDate(new Date(x)));
        this.changeShiftCommon.chosenDate$
            .pipe(
                filter((x) => !!x),
                takeUntilDestroyed(this)
            )
            .subscribe((x) => this.pickerControl.setValue(x));
    }

    public toggleCalendar(event: Event): void {
        this.isPickerOpened$.next(!this.isPickerOpened$.getValue());
    }

    public changeDirection(direction: 'prev' | 'next'): void {
        this.changeShiftCommon.changeShifts(direction);
    }

    public refresh(): void {
        this.changeShiftCommon.setDefaultShifts();
    }

    public report(): void {}
}
