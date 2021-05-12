import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'evj-admin-rsc-datetimepicker',
  templateUrl: './admin-rsc-datetimepicker.component.html',
  styleUrls: ['./admin-rsc-datetimepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminRscDatetimepickerComponent implements OnInit {
  @Input()
  public date: Date = new Date();

  @Input()
  public label: string = 'Срок выполнения';

  @Input()
  public disabled: boolean = false;

  @Output()
  public onValueChange: EventEmitter<string | Date> = new EventEmitter<string | Date>();

  constructor() {}

  public ngOnInit(): void {}

  public onClick(): void {}

  public dateTimePickerInputStart(value: string | Date): void {
      this.onValueChange.emit(value);
  }
}