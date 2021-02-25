import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PetroleumScreenService } from 'src/app/dashboard/services/widgets/petroleum-screen.service';
import { ITankAttribute } from 'src/app/dashboard/models/NK/petroleum-products-movement.model';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-operation-park-screen',
    templateUrl: './operation-park-screen.component.html',
    styleUrls: ['./operation-park-screen.component.scss'],
})
export class OperationParkScreenComponent implements OnInit, OnDestroy {
    @Input() title: string[];
    public data: ITankAttribute[];
    private subscriptions: Subscription[] = [];

    public readonly dict: { title: string; key: string }[] = [
        {
            title: 'Название параметра',
            key: 'paramTitle',
        },
        {
            title: 'Ед. изм.',
            key: 'paramUnit',
        },
        {
            title: 'Дата/Время',
            key: 'paramDateTime',
        },
        {
            title: 'Значение',
            key: 'paramValue',
        },
        {
            title: '',
            key: 'buttons',
        },
    ];

    public readonly testData: ITankAttribute[] = [
        {
            paramTitle: 'test',
            paramUnit: 'test',
            paramDateTime: new Date(),
            paramValue: 'test',
            isActive: false,
            isEdit: true,
        },
        {
            paramTitle: 'test',
            paramUnit: 'test',
            paramDateTime: new Date(),
            paramValue: 'test',
            isActive: false,
            isEdit: true,
        },
        {
            paramTitle: 'test',
            paramUnit: 'test',
            paramDateTime: new Date(),
            paramValue: 'test',
            isActive: false,
            isEdit: false,
        },
        {
            paramTitle: 'test',
            paramValue: 'test',
            isActive: false,
            isEdit: false,
        },
    ];

    constructor(private petroleumService: PetroleumScreenService, private snackBarService: SnackBarService) {}

    public ngOnInit(): void {
        if (this.subscriptions?.length > 0) {
            return;
        }
        this.subscriptions.push(
            this.petroleumService.currentTankParam.subscribe((item) => {
                this.data = item.objectAttributes;
                this.data.sort((a, b) => {
                    if (a.isEdit && !b.isEdit) {
                        return -1;
                    } else if (!a.isEdit && b.isEdit) {
                        return 1;
                    }
                    return 0;
                });
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((item) => item.unsubscribe());
    }

    returnMenu(): void {
        this.petroleumService.openScreen('info');
    }

    dateTimePicker(date: Date, item: ITankAttribute): void {
        console.log(date);
        if (date.getTime() > Date.now()) {
            this.snackBarService.openSnackBar(
                'Некорректно установлено время (установите время не превышающее текущее)',
                'error'
            );
            item.paramDateTime = new Date(item.paramSaveDateTime);
            return;
        }
        item.paramDateTime = new Date(date);
    }

    public startEdit(item: ITankAttribute): void {
        this.testData.forEach((el) => (el.isActive = false));
        item.isActive = true;
        item.paramSaveValue = item.paramValue;
        item.paramSaveDateTime = new Date(item.paramDateTime);
        item.paramDateTime = new Date(Date.now());
    }

    public closeEdit(item: ITankAttribute): void {
        item.isActive = false;
        item.paramValue = item.paramSaveValue;
        item.paramDateTime = new Date(item.paramSaveDateTime);
    }

    public async okEdit(item: ITankAttribute): Promise<void> {
        console.log(item.paramDateTime);
        console.log(item.paramSaveDateTime);
        await this.petroleumService.setTankAttributes(item);
    }

    public isDropdown(item: ITankAttribute): boolean {
        if (item?.valueStates?.length > 0 && item?.isEdit) {
            return true;
        }
        return false;
    }
}
