import { ISouMainIndicators } from '../../../dashboard/models/SOU/sou-main-indicators.model';

export const SOURCE_DATA: ISouMainIndicators = {
    reductionSpeed: {
        title: 'Скорость сведения МБ',
        units: '%',
        diagram: {
            fact: 90,
            plan: 100,
        },
        elements: [
            {
                value: 1,
                date: new Date(),
            },
            {
                value: -1,
                date: new Date(),
            },
            {
                value: 2,
                date: new Date(),
            },
        ],
    },
    reductionQuality: {
        title: 'Качество сведения МБ',
        units: '%',
        value: 9,
        elements: [
            {
                value: 100,
                date: new Date(),
            },
            {
                value: 100,
                date: new Date(),
            },
            {
                value: 100,
                date: new Date(),
            },
        ],
    },
    formationSpeed: {
        title: 'Скорость формирования сводки',
        units: '%',
        diagram: {
            fact: 100,
            plan: 100,
        },
        elements: [
            {
                value: 100,
                date: new Date(),
            },
            {
                value: 100,
                date: new Date(),
            },
            {
                value: 100,
                date: new Date(),
            },
        ],
    },
    errorsOperations: {
        title: 'Кол-во ошибок рег. операций',
        units: 'шт',
        value: 8,
        maxValue: 9,
    },
    errorsRude: {
        title: 'Количество грубых ошибок',
        units: 'шт',
        value: 19,
    },
    losses: {
        title: 'Потери',
        units: '%',
        sum: {
            value: 7974,
            percentage: 0.51,
        },
        identified: {
            value: 3375,
            percentage: 0.215,
        },
        unidentified: {
            value: 4599,
            percentage: 0.29,
        },
    },
};
