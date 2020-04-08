import { Component, OnInit, Input } from '@angular/core';
import { PetroleumScreenService } from 'src/app/dashboard/services/petroleum-screen.service';
import { ITankAttribute } from '../../../../models/petroleum-products-movement.model';

interface IParams {
    name: string;
    unit: string;
    datetime: Date;
    value: string;
    isActive: boolean;
    isEdit: boolean;
    saveValue?: string;
    saveDatetime?: Date;
    icon: string; // TODO delete
}

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
            key: 'paramDatetime',
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
            paramDatetime: new Date(),
            paramValue: 'test',
            isActive: false,
            isEdit: true,
        },
        {
            paramTitle: 'test',
            paramUnit: 'test',
            paramDatetime: new Date(),
            paramValue: 'test',
            isActive: false,
            isEdit: true,
        },
        {
            paramTitle: 'test',
            paramUnit: 'test',
            paramDatetime: new Date(),
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

    constructor(private petroleumService: PetroleumScreenService) {}

    public ngOnInit(): void {
        this.petroleumService.currentTankParam.subscribe(
            (item) => {
                this.data = item.objectAttributes;
            }
        );
    }

    returnMenu(): void {
        this.petroleumService.openScreen('info');
    }

    dateTimePicker(date: Date, item: ITankAttribute): void {
        item.paramDatetime = new Date(date);
    }

    public startEdit(item: ITankAttribute): void {
        this.testData.forEach(el => el.isActive = false);
        item.isActive = true;
        item.paramSaveValue = item.paramValue;
        item.paramSaveDatetime = new Date(item.paramDatetime);
    }

    public closeEdit(item: ITankAttribute): void {
        item.isActive = false;
        item.paramValue = item.paramSaveValue;
        item.paramDatetime = new Date(item.paramSaveDatetime);
    }

    public okEdit(item: ITankAttribute): void {
        console.log(item.paramDatetime);
        console.log(item.paramSaveDatetime);
    }
}
