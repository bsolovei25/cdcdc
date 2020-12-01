import { IKpeTable, IKpeTableBody, IKpeTableHeader } from '../kpe-table.component';

export const tableHeader: IKpeTableHeader[] = [
    { name: 'Название', id: '1' },
    { name: 'План, т', id: '2' },
    { name: 'Ср. расход', id: '3' },
    { name: 'Мгновенный расход', id: '4' },
    { name: 'Накопление, т', id: '5' },
    { name: '% от Плана', id: '6' },
    { name: 'Прогноз на 03:00, т', id: '7' },
    { name: 'т', id: '8' },
    { name: '%', id: '9' },
    { name: 'Рек. расход,м3/ч', id: '10' },
    { name: 'Комментарий', id: '11' }
];
export const table: IKpeTable[] = [{
    unit: {
        name: 'КОМПОНЕНТЫ АВТОБЕНЗИНОВ И АРОМАТИКА',
        description: 'КОМПОНЕНТЫ АВТОБЕНЗИНОВ И АРОМАТИКА'
    },
    parameters: [
        {
            id: 111,
            name: 'Автобензины',
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
            id: 112,
            name: 'Платформат Л 35/11-1000',
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
            id: 113,
            name: 'Стаб. Платформат С-300 КПА в АБ',
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
            id: 114,
            name: 'Легкий платформат С-400БР',
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
            id: 115,
            name: 'Бензин ГО БКК',
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
            id: 116,
            name: 'Бензин КТ-1/1',
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
            id: 117,
            name: 'У/в С9',
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
            id: 118,
            name: 'Бензин рафинат',
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
            id: 119,
            name: 'Смесь бензинов п/г',
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
            id: 120,
            name: 'Бензин прямогонный',
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
            id: 121,
            name: 'Бензин газовый',
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
            id: 122,
            name: 'Смесь изопентана',
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
            id: 123,
            name: 'Смесь изопентана',
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
            id: 124,
            name: 'Гексановый изомеризат',
            plan: 227.7,
            average: 227.7,
            instant: 94.4,
            accumulation: 1169.6,
            percentPlan: '36%',
            predictPercent: 2274.4,
            deviationValue: 44,
            deviationPercent: '0.6%',
            recommended: 2274.4,
            isNotCritical: 0,
            isCritical: 0,
            isDeviation: 0
        },
        {
            id: 125,
            name: 'Алкилат',
            plan: 2447.7,
            average: 2447.7,
            instant: 94.4,
            accumulation: 1169.6,
            percentPlan: '89%',
            predictPercent: 2274.4,
            deviationValue: 44,
            deviationPercent: '-1.2%',
            recommended: 2274.4,
            isNotCritical: 0,
            isCritical: 0,
            isDeviation: 0
        },
        {
            id: 126,
            name: 'Бутан нормальный',
            plan: 2277.7,
            average: 2277.7,
            instant: 94.4,
            accumulation: 1169.6,
            percentPlan: '43%',
            predictPercent: 2274.4,
            deviationValue: 44,
            deviationPercent: '0.2%',
            recommended: 2274.4,
            isNotCritical: 1,
            isCritical: 0,
            isDeviation: 0
        },
        {
            id: 127,
            name: 'Некондиция Р-21',
            plan: 2277.7,
            average: 2277.7,
            instant: 94.4,
            accumulation: 1169.6,
            percentPlan: '12%',
            predictPercent: 2274.4,
            deviationValue: 44,
            deviationPercent: '1.2%',
            recommended: 2274.4,
            isNotCritical: 0,
            isCritical: 1,
            isDeviation: 0
        },
        {
            id: 128,
            name: 'Изобутан+ ББФ',
            plan: 77.7,
            average: 77.7,
            instant: 94.4,
            accumulation: 1169.6,
            percentPlan: '-',
            predictPercent: 2274.4,
            deviationValue: 44,
            deviationPercent: '-',
            recommended: 2274.4,
            isNotCritical: 0,
            isCritical: 0,
            isDeviation: 0
        },
        {
            id: 129,
            name: 'Ароматика',
            plan: 1177.7,
            average: 1177.7,
            instant: 94.4,
            accumulation: 1169.6,
            percentPlan: '-',
            predictPercent: 2274.4,
            deviationValue: 44,
            deviationPercent: '-',
            recommended: 2274.4,
            isNotCritical: 0,
            isCritical: 0,
            isDeviation: 0
        }
    ]
}
];

export const tableLoading: IKpeTable[] = [{
    unit: {
        name: 'N1-ПППНБК',
        description: 'N1-ПППНБК'
    },
    parameters: [
        {
            id: 999,
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
            id: 998,
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
            id: 997,
            name: 'АВТ-8',
            plan: 18.1,
            average: 18.1,
            instant: 0.3,
            accumulation: 10.6,
            percentPlan: '-',
            predictPercent: 19.4,
            deviationValue: 3,
            deviationPercent: '0.0%',
            recommended: 19.4,
            isNotCritical: 0,
            isCritical: 0,
            isDeviation: 0
        },
        {
            id: 996,
            name: 'АВТ-9',
            plan: 1317.9,
            average: 1317.9,
            instant: 53.2,
            accumulation: 688.9,
            percentPlan: '48%',
            predictPercent: 2542.0,
            deviationValue: -11,
            deviationPercent: '-0.1%',
            recommended: 2542.0,
            isNotCritical: 0,
            isCritical: 1,
            isDeviation: 0
        },
        {
            id: 995,
            name: 'АВТ-10',
            plan: 1317.9,
            average: 1317.9,
            instant: 53.2,
            accumulation: 688.9,
            percentPlan: '48%',
            predictPercent: 2542.0,
            deviationValue: -11,
            deviationPercent: '-0.1%',
            recommended: 2542.0,
            isNotCritical: 0,
            isCritical: 1,
            isDeviation: 0
        },
        {
            id: 994,
            name: 'Вакуумный блок АВТ-10',
            plan: 3624.4,
            average: 3624.4,
            instant: 151.9,
            accumulation: 1169.6,
            percentPlan: '52%',
            predictPercent: 2274.4,
            deviationValue: 44,
            deviationPercent: '1.2%',
            recommended: 2274.4,
            isNotCritical: 1,
            isCritical: 0,
            isDeviation: 0
        },
        {
            id: 993,
            name: '21-10/3м',
            plan: 170.4,
            average: 170.4,
            instant: 6.9,
            accumulation: 97.8,
            percentPlan: '44%',
            predictPercent: 180.5,
            deviationValue: -457,
            deviationPercent: '-5.5%',
            recommended: 180.5,
            isNotCritical: 0,
            isCritical: 0,
            isDeviation: 0
        },
        {
            id: 992,
            name: '19/3',
            plan: 170.4,
            average: 170.4,
            instant: 6.9,
            accumulation: 97.8,
            percentPlan: '44%',
            predictPercent: 180.5,
            deviationValue: -457,
            deviationPercent: '-5.5%',
            recommended: 180.5,
            isNotCritical: 0,
            isCritical: 0,
            isDeviation: 0
        }
        ,
        {
            id: 991,
            name: 'УПНК',
            plan: 170.4,
            average: 170.4,
            instant: 6.9,
            accumulation: 97.8,
            percentPlan: '44%',
            predictPercent: 180.5,
            deviationValue: 0,
            deviationPercent: '-',
            recommended: 180.5,
            isNotCritical: 0,
            isCritical: 0,
            isDeviation: 0
        }
    ]
},
    {
        unit: {
            name: 'N2-ПГПНАБ',
            description: 'N2-ПГПНАБ'
        },
        parameters: [
            {
                id: 899,
                name: 'КТ-1/1 с. 001',
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
                id: 898,
                name: 'КТ-1/1 с.001 ВБ',
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
                id: 897,
                name: 'КТ-1/1 с. 100',
                plan: 18.1,
                average: 18.1,
                instant: 0.3,
                accumulation: 10.6,
                percentPlan: '-',
                predictPercent: 19.4,
                deviationValue: 3,
                deviationPercent: '0.0%',
                recommended: 19.4,
                isNotCritical: 0,
                isCritical: 0,
                isDeviation: 0
            },
            {
                id: 896,
                name: 'КТ-1/1 с. 200',
                plan: 1317.9,
                average: 1317.9,
                instant: 53.2,
                accumulation: 688.9,
                percentPlan: '48%',
                predictPercent: 2542.0,
                deviationValue: -11,
                deviationPercent: '-0.1%',
                recommended: 2542.0,
                isNotCritical: 0,
                isCritical: 0,
                isDeviation: 0
            },
            {
                id: 895,
                name: 'КТ-1/1 с. МТБЭ',
                plan: 1317.9,
                average: 1317.9,
                instant: 53.2,
                accumulation: 688.9,
                percentPlan: '48%',
                predictPercent: 2542.0,
                deviationValue: -11,
                deviationPercent: '-0.1%',
                recommended: 2542.0,
                isNotCritical: 0,
                isCritical: 0,
                isDeviation: 0
            },
            {
                id: 894,
                name: '43-103',
                plan: 3624.4,
                average: 3624.4,
                instant: 151.9,
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
                id: 893,
                name: '25/12',
                plan: 170.4,
                average: 170.4,
                instant: 6.9,
                accumulation: 97.8,
                percentPlan: '44%',
                predictPercent: 180.5,
                deviationValue: -457,
                deviationPercent: '-5.5%',
                recommended: 180.5,
                isNotCritical: 0,
                isCritical: 0,
                isDeviation: 0
            },
        ]
    }
];

