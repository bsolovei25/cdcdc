import { ICmidMnpzProductionMapInterface } from "@widgets/CMID/cmid-mnpz-production-map/models/cmid-mnpz-production-map.interface";

export const cmidMnpzProductionMapData: ICmidMnpzProductionMapInterface = {
    builds: [
        {
            id: 40,
            name: 'ЭЛОУ-АВТ-6',
            options: {
                safety: '2',
                reliability: '5',
                ecology: '1'
            }
        },
        {
            id: 48,
            name: 'КЦА',
            options: {
                safety: '8',
                reliability: '1',
                ecology: '2'
            }
        },
        {
            id: 49,
            name: 'ЛЧ-35/11-1000',
            options: {
                safety: '4',
                reliability: '2',
                ecology: '2'
            }
        },
        {
            id: 61,
            name: 'ЛЧ-24-2000',
            options: {
                safety: '5',
                reliability: '3',
                ecology: '1'
            }
        },
        {
            id: 86,
            name: 'УПБ',
            options: {
                safety: '10',
                reliability: '4',
                ecology: '6'
            }
        }
    ],
    weather: { precipitation: 15, temperature: 320, pressure: 745, wind: 5.1, windDirection: 'ВЮВ' },
};
