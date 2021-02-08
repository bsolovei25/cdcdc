import { ICircleData } from '../../../dashboard/models/OZSM/ozsm-circle-planning-diagram.model';

export const cardData: ICircleData[] = [
    {
        name: 'Выработка',
        value: 1000000,
        deviation: 0,
        percentValue: 75,
    },
    {
        name: 'Смешение',
        value: 1126658,
        deviation: 0,
        percentValue: 50,
    },
    {
        name: 'Налив',
        value: 1126658,
        deviation: -310,
        percentValue: 25,
    },
    {
        name: 'Фасовка',
        value: 1126658,
        deviation: 0,
        percentValue: 100,
    },
];

export const planData: ICircleData[] = [
    {
        name: 'производства',
        value: 1000000,
        deviation: 1140062,
        percentValue: 75,
    },
    {
        name: 'отгрузки',
        value: 1126658,
        deviation: 1140062,
        percentValue: 50,
    },
];
