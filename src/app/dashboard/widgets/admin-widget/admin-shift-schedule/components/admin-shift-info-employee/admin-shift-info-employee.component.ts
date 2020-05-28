import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IAdminShiftUserBrigade } from '../../admin-shift-schedule.component';
import { AdminShiftScheduleService } from 'src/app/dashboard/services/widgets/admin-shift-schedule.service';

@Component({
  selector: 'evj-admin-shift-info-employee',
  templateUrl: './admin-shift-info-employee.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./admin-shift-info-employee.component.scss']
})
export class AdminShiftInfoEmployeeComponent implements OnInit {
  @Input() public data: IAdminShiftUserBrigade;
  @Input() public type: string;
  @Input() public star: boolean = false;

  constructor(private adminShiftScheduleService: AdminShiftScheduleService) { }

  ngOnInit(): void {
  }

  delete(): void {
    const windowsParam = {
      isShow: true,
      questionText: 'Вы уверены, что хотите удалить сотрудника?',
      acceptText: 'Да',
      cancelText: 'Нет',
      acceptFunction: () => this.adminShiftScheduleService.closeAlert(),
      closeFunction: () => {
        this.adminShiftScheduleService.closeAlert();
      }
    };
    this.adminShiftScheduleService.alertWindow$.next(windowsParam);
  }

  changeStatus(): void {

  }

}
