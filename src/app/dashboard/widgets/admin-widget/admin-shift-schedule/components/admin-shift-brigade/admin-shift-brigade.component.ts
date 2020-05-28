import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AdminShiftScheduleService } from 'src/app/dashboard/services/widgets/admin-shift-schedule.service';

@Component({
  selector: 'evj-admin-shift-brigade',
  templateUrl: './admin-shift-brigade.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./admin-shift-brigade.component.scss'],
  animations: [
    trigger('Branch', [
      state(
        'collapsed',
        style({
          height: 0,
          transform: 'translateY(-8px)',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition('collapsed => expanded', animate('150ms ease-in')),
      transition('expanded => collapsed', animate('150ms ease-out')),
    ]),
  ],
})
export class AdminShiftBrigadeComponent implements OnInit {
  @Input() template: TemplateRef<any>;


  public data = [
    {
      fio: 'Иванов Иван Иванович',
      specialty: 'Слесарь АСУ ТП',
      avatar: 'slesar',
      brigade: 1,
    },
    {
      fio: 'Иванов Иван Иванович',
      specialty: 'Слесарь АСУ ТП',
      avatar: 'slesar',
      brigade: 2,
    }, {
      fio: 'Иванов Иван Иванович',
      specialty: 'Слесарь АСУ ТП',
      avatar: 'slesar',
      brigade: 3,
    },
    {
      fio: 'Иванов Иван Иванович',
      specialty: 'Слесарь АСУ ТП',
      avatar: 'slesar',
      brigade: 1,
    }
  ];

  public isOpen: boolean = true;

  constructor(private adminShiftScheduleService: AdminShiftScheduleService) { }

  ngOnInit(): void {
  }

  public openList(): void {
    this.isOpen = !this.isOpen;
  }

  delete(): void {
    const windowsParam = {
      isShow: true,
      questionText: 'Вы уверены, что хотите удалить бригаду?',
      acceptText: 'Да',
      cancelText: 'Нет',
      acceptFunction: () => this.adminShiftScheduleService.closeAlert(),
      closeFunction: () => {
        this.adminShiftScheduleService.closeAlert();
      }
    };
    this.adminShiftScheduleService.alertWindow$.next(windowsParam);
  }

}
