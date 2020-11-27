import { IKpeTable, IKpeTableBody, IKpeTableHeader } from '../kpe-table.component';

export const tableHeader: IKpeTableHeader[] = [
    { name: 'Название', id: '1' },
    { name: 'Ср. расход', id: '2' },
    { name: 'Мгновенный расход', id: '3' },
    { name: 'Накопление', id: '4' },
    { name: '% от Плана', id: '5' },
    { name: 'Прогноз на 03:00, т', id: '6' },
    { name: 'т', id: '7' },
    { name: '%', id: '8' },
    { name: 'Рек. расход,м3/ч', id: '9' },
    { name: 'Комментарий', id: '10' }
];
export const table: IKpeTable[] = [{
    unit: {
        name: 'КОМПОНЕНТЫ АВТОБЕНЗИНОВ И АРОМАТИКА',
        description: 'КОМПОНЕНТЫ АВТОБЕНЗИНОВ И АРОМАТИКА'
    },
    parameters: [
        {
            id: 123,
            name: 'АВТ-6',
            plan: 2277.7,
            average: 2277.7,
            instant: 94.4,
            accumulation: 1169.6,
            percentPlan: '52%',
            predictPercent: 2274.4,
            deviationValue: 44,
            deviationPercent: '1.2%',
            recommended: 2274.4,
            isNotCritical: 0,
            isCritical: 0,
            isDeviation: 0
        },
        {
            id: 2534,
            name: 'АВТ-7',
            plan: 2277.7,
            average: 2277.7,
            instant: 94.4,
            accumulation: 1169.6,
            percentPlan: '52%',
            predictPercent: 2274.4,
            deviationValue: 44,
            deviationPercent: '1.2%',
            recommended: 2274.4,
            isNotCritical: 0,
            isCritical: 0,
            isDeviation: 0
        },
        {
            id: 3345,
            name: 'АВТ-8',
            plan: 2277.7,
            average: 2277.7,
            instant: 94.4,
            accumulation: 1169.6,
            percentPlan: '52%',
            predictPercent: 2274.4,
            deviationValue: 44,
            deviationPercent: '1.2%',
            recommended: 2274.4,
            isNotCritical: 0,
            isCritical: 1,
            isDeviation: 0
        },
        {
            id: 1345,
            name: 'АВТ-6',
            plan: 2277.7,
            average: 2277.7,
            instant: 94.4,
            accumulation: 1169.6,
            percentPlan: '52%',
            predictPercent: 2274.4,
            deviationValue: 44,
            deviationPercent: '1.2%',
            recommended: 2274.4,
            isNotCritical: 0,
            isCritical: 0,
            isDeviation: 1
        },
        {
            id: 2234,
            name: 'АВТ-7',
            plan: 2277.7,
            average: 2277.7,
            instant: 94.4,
            accumulation: 1169.6,
            percentPlan: '52%',
            predictPercent: 2274.4,
            deviationValue: 44,
            deviationPercent: '1.2%',
            recommended: 2274.4,
            isNotCritical: 2,
            isCritical: 0,
            isDeviation: 0
        },
        {
            id: 3242,
            name: 'АВТ-8',
            plan: 2277.7,
            average: 2277.7,
            instant: 94.4,
            accumulation: 1169.6,
            percentPlan: '52%',
            predictPercent: 2274.4,
            deviationValue: 44,
            deviationPercent: '1.2%',
            recommended: 2274.4,
            isNotCritical: 0,
            isCritical: 1,
            isDeviation: 0
        }
    ]
},
    {
        unit: {
            name: 'N1-ПППНБК',
            description: 'N1-ПППНБК'
        },
        parameters: [
            {
                id: 443242,
                name: 'АВТ-6',
                plan: 2277.7,
                average: 2277.7,
                instant: 94.4,
                accumulation: 1169.6,
                percentPlan: '52%',
                predictPercent: 2274.4,
                deviationValue: 44,
                deviationPercent: '1.2%',
                recommended: 2274.4,
                isNotCritical: 0,
                isCritical: 0,
                isDeviation: 0
            },
            {
                id: 54234,
                name: 'АВТ-7',
                plan: 2277.7,
                average: 2277.7,
                instant: 94.4,
                accumulation: 1169.6,
                percentPlan: '52%',
                predictPercent: 2274.4,
                deviationValue: 44,
                deviationPercent: '1.2%',
                recommended: 2274.4,
                isNotCritical: 0,
                isCritical: 0,
                isDeviation: 0
            },
            {
                id: 62342,
                name: 'АВТ-8',
                plan: 2277.7,
                average: 2277.7,
                instant: 94.4,
                accumulation: 1169.6,
                percentPlan: '52%',
                predictPercent: 2274.4,
                deviationValue: 44,
                deviationPercent: '1.2%',
                recommended: 2274.4,
                isNotCritical: 0,
                isCritical: 1,
                isDeviation: 0
            }
        ]
    }
];

