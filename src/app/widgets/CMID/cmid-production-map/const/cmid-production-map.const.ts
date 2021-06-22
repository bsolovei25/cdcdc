import { ICmidMnpzProductionMapInterface } from '@widgets/CMID/cmid-production-map/models/cmid-production-map.interface';

export const cmidMnpzProductionMapData: ICmidMnpzProductionMapInterface = {
    elements: [
        {
            name: 'БОВ-2',
            safety: 5,
            reliability: 5,
            ecology: 5
        },
        {
            name: 'БОВ-4',
            safety: 5,
            reliability: 5,
            ecology: 5
        },
        {
            name: 'БОВ-5',
            safety: 5,
            reliability: 5,
            ecology: 5
        },
    ],
    weather: {
        precipitation: 0,
        windSpeed: 0,
        windDirection: 0,
        temperature: 0,
        pressure: 0
    }
};
