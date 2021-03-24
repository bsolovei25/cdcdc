import { Component, OnInit, EventEmitter, Output, Input, OnChanges, OnDestroy } from '@angular/core';
import { timeInterval } from 'rxjs/operators';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';
import { IPostSystemOptionsTemplate } from 'src/app/dashboard/models/ADMIN/report-server.model';
import { ReportServerConfiguratorService } from 'src/app/dashboard/services/widgets/admin-panel/report-server-configurator.service';

@Component({
    selector: 'evj-system-period-edit',
    templateUrl: './system-period-edit.component.html',
    styleUrls: ['./system-period-edit.component.scss'],
})
export class SystemPeriodEditComponent implements OnInit, OnChanges {
    @Output() public result: EventEmitter<any> = new EventEmitter<any>();
    @Input() dataSystemOptions: any;
    @Input() dataTemplate: any;

    type = {
        none: 'Без запроса времени',
        year: 'Годичный',
        month: 'Месячный',
        day: 'Суточный',
        exactTime: 'Точное время',
        timePeriod: 'Произвольное время',
        datePeriod: 'Произвольная дата',
    };

    keys = Object.keys(this.type);

    data: any = [
        {
            name: 'Годичный',
            isActive: false,
        },
        {
            name: 'Месячный',
            isActive: false,
        },
        {
            name: 'Суточный',
            isActive: false,
        },
        {
            name: 'Произвольное время',
            isActive: false,
        },
        {
            name: 'Точное время',
            isActive: false,
        },
        {
            name: 'Произвольная дата',
            isActive: false,
        },
        {
            name: 'Без запроса времени',
            isActive: false,
        },
    ];

    dateNow: Date = new Date();

    dateValue: any;

    public timeCheck: string;

    constructor(public reportService: ReportServerConfiguratorService, public snackBar: SnackBarService) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.dataTemplate?.periodType) {
            const activePeriodTemplate = this.dataTemplate.periodType;
            this.data.forEach((el) => {
                if (el.name === this.type[activePeriodTemplate]) {
                    el.isActive = true;
                    this.timeCheck = el.name;
                }
            });
        }
    }

    close(): void {
        const obj = {
            close: false,
            type: 'periodEdit',
        };
        this.result.emit(obj);
    }

    save(): void {
        this.putTemplate();
    }

    putTemplate(): void {
        const idSystemOptions = this.dataSystemOptions.id;
        const activeCheck = this.data.find((e) => e.isActive).name;
        const periodTypeС = this.keys.find((el) => this.type[el] === activeCheck);

        const windowsParam = {
            isShow: true,
            questionText: 'Применить внесенные изменения?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () => {
                this.dataTemplate.systemOptions.forEach((e) => {
                    if (e.id === idSystemOptions) {
                        e.value = activeCheck;
                    }
                });
                this.dataTemplate.periodType = periodTypeС;

                const obj: IPostSystemOptionsTemplate = {
                    systemOptionValues: this.dataTemplate.systemOptions,
                    fileTemplate: this.dataTemplate.fileTemplate,
                    periodType: periodTypeС,
                };

                this.reportService.postSystemOptions(this.dataTemplate.id, obj).subscribe(
                    (ans) => {
                        this.snackBar.openSnackBar('Файл-шаблон сохранен');
                        const obj = {
                            close: true,
                            type: 'periodEdit',
                        };
                        this.result.emit(obj);
                    },
                    (error) => {
                        this.snackBar.openSnackBar('Сервер не отвечает');
                    }
                );
            },
            closeFunction: () => {
                this.reportService.closeAlert();
            },
        };
        this.reportService.alertWindow$.next(windowsParam);
    }

    changeSwap(item): void {
        for (const i of this.data) {
            i.isActive = false;
        }
        item.isActive = true;
        this.timeCheck = item.name;
    }

    setValueTime(event): void {
        /// ВОЗМОЖНО НУЖНО БУДЕТ УБРАТЬ ( ВЫБОР ДАТЫ В ДАТА ПИКЕРЕ ЭВЕНТ )
        this.dateValue = event;
    }
}
