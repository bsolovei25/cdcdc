import { IAPSRecipeDiagram } from './aps-recipe-diagram.component';

export const DATASOURCE: IAPSRecipeDiagram[] = [
    {
        id: 1,
        codePims: 'WT6',
        productName: 'НЕФТЬ АВТ-6\n',
        productDeviation: 43504.6,
        deviationQuality: 0,
        type: 'stream',
        values: [{
            date: new Date('2020-15-07'),
            value: 4900.23,
            deviationQuality: 0
        }],
        children: [],
        percent: null
    },
    {
        id: 6,
        codePims: 'KN6\n',
        productName: 'СГК АВТ-6\n',
        productDeviation: 282.773,
        deviationQuality: 1,
        type: 'stream',
        values: [
            {
                date: new Date('2020-02-07'),
                value: 4900.23,
                deviationQuality: 1
            },
            {
                date: new Date('2020-02-07'),
                value: 49.23,
                deviationQuality: 0
            }],
        children: [],
        percent: null
    },
    {
        id: 7,
        codePims: 'SLO\n',
        productName: 'НЕФТЯНАЯ ФАЗА\n',
        productDeviation: 282.773,
        deviationQuality: 0,
        type: 'stream',
        values: [{
            date: new Date('2020-15-07'),
            value: 4900.23,
            deviationQuality: 0
        }],
        children: [],
        percent: null
    },
    {
        id: 8,
        codePims: 'AS6DZ\n',
        productName: 'АВТ-6, вариант ДТЗ\n',
        productDeviation: 282.773,
        deviationQuality: 0,
        type: 'unit',
        values: [{
            date: new Date('2020-15-07'),
            value: 4900.23,
            deviationQuality: 0
        }],
        children: [
            {
                id: 68,
                codePims: '<F1\n',
                productName: 'ФР.БЕН.НЕСТ.НК-195\n',
                productDeviation: 282.773,
                deviationQuality: 0,
                type: 'stream',
                values: [{
                    date: new Date('2020-15-07'),
                    value: 4900.23,
                    deviationQuality: 0
                }],
                children: [{
                    id: 688,
                    codePims: 'SFB2\n',
                    productName: 'ФСБ\n',
                    productDeviation: 282.773,
                    deviationQuality: 0,
                    type: 'to',
                    values: [{
                        date: new Date('2020-15-07'),
                        value: 4900.23,
                        deviationQuality: 0
                    }],
                    children: [],
                    percent: null
                }],
                percent: 0.1677
            },
            {
                id: 6567,
                codePims: '<W1\n',
                productName: 'ДТ "ЛЕТ" ПР.АВТ-6\n',
                productDeviation: 282.773,
                deviationQuality: 0,
                type: 'stream',
                values: [{
                    date: new Date('2020-15-07'),
                    value: 4900.23,
                    deviationQuality: 0
                }],
                children: [{
                    id: 65673,
                    codePims: 'SDSL\n',
                    productName: 'Смесь ДТЛ прям\n',
                    productDeviation: 282.773,
                    deviationQuality: 0,
                    type: 'to',
                    values: [{
                        date: new Date('2020-15-07'),
                        value: 4900.23,
                        deviationQuality: 0
                    }],
                    children: [],
                    percent: null
                }],
                percent: 0.1677
            },
            {
                id: 622,
                codePims: '<U1\n',
                productName: 'MAЗУТ ПРЯМ.АВТ-6\n',
                productDeviation: 282.773,
                deviationQuality: 0,
                type: 'stream',
                values: [
                    {
                        date: new Date('2020-15-07'),
                        value: 4900.23,
                        deviationQuality: 0
                    },
                    {
                        date: new Date('2020-15-07'),
                        value: 1200.23,
                        deviationQuality: 1
                    },
                    {
                        date: new Date('2020-15-07'),
                        value: 6500.23,
                        deviationQuality: 0
                    }
                ],
                children: [{
                    id: 64667,
                    codePims: 'SVR6\n',
                    productName: 'ВТ-6\n',
                    productDeviation: 282.773,
                    deviationQuality: 0,
                    type: 'to',
                    values: [{
                        date: new Date('2020-15-07'),
                        value: 4900.23,
                        deviationQuality: 0
                    }],
                    children: [],
                    percent: null
                }],
                percent: 0.1677
            },
            {
                id: 64357,
                codePims: '<A1\n',
                productName: 'ГАЗ СУХОЙ\n',
                productDeviation: 282.773,
                deviationQuality: 0,
                type: 'stream',
                values: [{
                    date: new Date('2020-15-07'),
                    value: 4900.23,
                    deviationQuality: 0
                }],
                children: [],
                percent: null
            }
        ],
        percent: null
    },


    {
        id: 999,
        codePims: 'SLO',
        productName: 'last-row',
        productDeviation: 282.773,
        deviationQuality: 0,
        type: 'stream',
        values: [{
            date: new Date('2020-15-07'),
            value: 4900.23,
            deviationQuality: 0
        }],
        children: [],
        percent: null
    }
];
