import { IKpeEnergyTab } from './components/kpe-energy-tab/kpe-energy-tab.component';
import { IKpeEnergy } from './kpe-energy.component';

export const DATASOURCE: IKpeEnergy = {
    tabs: [
        {
            title: 'Электроэнергия',
            unit: 'кВт*ч/c',
            type: 'electricity',
            fact: 90.123123,
            plan: 100,
        },
        {
            title: 'Тепловая энергия',
            unit: 'Гкал/ct',
            type: 'warm',
            fact: 112,
            plan: 100,
        },
        {
            title: 'Оборотная вода',
            unit: 'м3/с',
            type: 'water',
            fact: 100,
            plan: 100,
        },
        {
            title: 'Топливо',
            unit: 'тут/с',
            type: 'fuel',
            fact: 112,
            plan: 100,
        },
        {
            title: 'Производство пара',
            unit: 'Гкал/с',
            type: 'steam',
            fact: 30,
            plan: 100,
        },
    ],
    chart: [],
};
