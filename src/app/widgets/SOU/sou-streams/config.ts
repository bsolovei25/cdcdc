export const TITLES_OF_TABLE: { name: string, type: string, bigBlock?: boolean }[] = [
    {
        name: 'Начало операции',
        type: 'startTime'
    },
    {
        name: 'Конец операции',
        type: 'endTime'
    },
    {
        name: 'Тип источника',
        type: 'sourceType'
    },
    {
        name: 'Источник',
        type: 'sourceName'
    },
    {
        name: 'Поток',
        type: 'flow'
    },
    {
        name: 'Продукт в источнике',
        bigBlock: true,
        type: 'sourceProduct'
    },
    {
        name: 'Тип приёмника',
        type: 'destinationType'
    },
    {
        name: 'Приёмник',
        type: 'destinationName'
    },
    {
        name: 'Продукт в приёмнике',
        bigBlock: true,
        type: 'destinationProduct'
    }
];
