import { Component, OnInit, Input } from '@angular/core';
import { PetroleumScreenService } from 'src/app/dashboard/services/petroleum-screen.service';
import { ITankAttribute } from '../../../../models/petroleum-products-movement.model';
import { SnackBarService } from '../../../../services/snack-bar.service';

@Component({
    selector: 'evj-operation-park-screen',
    templateUrl: './operation-park-screen.component.html',
    styleUrls: ['./operation-park-screen.component.scss'],
})
export class OperationParkScreenComponent implements OnInit {
    @Input() title: string[];
    public data: ITankAttribute[];

    public readonly dict: { title: string, key: string }[] = [
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

    constructor(
        private petroleumService: PetroleumScreenService,
        private snackBarService: SnackBarService
    ) {}

    public ngOnInit(): void {
        this.petroleumService.currentTankParam.subscribe(
            (item) => {
                this.data = item.objectAttributes;
                console.log(item);
            }
        );
    }

    returnMenu(): void {
        this.petroleumService.openScreen('info');
    }

    dateTimePicker(date: Date, item: ITankAttribute): void {
        console.log(date);
        if (date.getTime() > Date.now()) {
            this.snackBarService.openSnackBar('Некорректно установлено время (установите время не превышающее текущее)' , 'snackbar-red');
            item.paramDateTime = new Date(item.paramSaveDateTime);
            return;
        }
        item.paramDateTime = new Date(date);
    }

    public startEdit(item: ITankAttribute): void {
        this.testData.forEach(el => el.isActive = false);
        item.isActive = true;
        item.paramSaveValue = item.paramValue;
        item.paramSaveDateTime = new Date(item.paramDateTime);
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
}
