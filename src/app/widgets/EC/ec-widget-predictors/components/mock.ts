import {
    IPredictors,
    IPredictorsGroup
} from "@widgets/ASTUE-ONPZ/astue-onpz-predictors/astue-onpz-predictors.component";

export const PREDICTORS_GROUP_DATA: IPredictorsGroup[] = [
    {
        id: '0',
        name: 'Погода',
        predictors: [
            {
                isHidden: false,
                id: '1',
                name: 'Скорость ветра',
                label: '',
                colorIndex: 3,
                tag: 'Meteo:SP',
                unitId: 0,
                unitName: '',
            },
            {
                isHidden: false,
                id: '2',
                name: 'Температура воздуха',
                label: '',
                colorIndex: 4,
                tag: 'Meteo:T1',
                unitId: 0,
                unitName: '',
            },
            {
                isHidden: false,
                id: '3',
                name: 'Температура продукта на выходе из печи',
                label: '',
                colorIndex: 5,
                tag: 'AVT10:PL103_O',
                unitId: 0,
                unitName: '',
            },
            {
                isHidden: false,
                id: '4',
                name: 'Доля отгона сырья',
                label: '',
                colorIndex: 6,
                tag: 'AVT10:DTL_2_50_O',
                unitId: 0,
                unitName: '',
            },
        ]
    },
    {
        id: '1',
        name: 'Топливо газообразное',
        predictors: [
            {
                isHidden: false,
                id: '1',
                name: 'Скорость ветра',
                label: '',
                colorIndex: 3,
                tag: 'Meteo:SP',
                unitId: 0,
                unitName: '',
            },
            {
                isHidden: false,
                id: '2',
                name: 'Температура воздуха',
                label: '',
                colorIndex: 4,
                tag: 'Meteo:T1',
                unitId: 0,
                unitName: '',
            },
            {
                isHidden: false,
                id: '3',
                name: 'Температура продукта на выходе из печи',
                label: '',
                colorIndex: 5,
                tag: 'AVT10:PL103_O',
                unitId: 0,
                unitName: '',
            },
            {
                isHidden: false,
                id: '4',
                name: 'Доля отгона сырья',
                label: '',
                colorIndex: 6,
                tag: 'AVT10:DTL_2_50_O',
                unitId: 0,
                unitName: '',
            },
        ]
    },
    {
        id: '2',
        name: 'Жидкое топливо',
        predictors: [
            {
                isHidden: false,
                id: '1',
                name: 'Скорость ветра',
                label: '',
                colorIndex: 3,
                tag: 'Meteo:SP',
                unitId: 0,
                unitName: '',
            },
            {
                isHidden: false,
                id: '1',
                name: 'Температура воздуха',
                label: '',
                colorIndex: 4,
                tag: 'Meteo:T1',
                unitId: 0,
                unitName: '',
            },
            {
                isHidden: false,
                id: '1',
                name: 'Температура продукта на выходе из печи',
                label: '',
                colorIndex: 5,
                tag: 'AVT10:PL103_O',
                unitId: 0,
                unitName: '',
            }
        ]
    },
    {
        id: '3',
        name: 'Дымовые газы',
        predictors: [
            {
                isHidden: false,
                id: '1',
                name: 'Скорость ветра',
                label: '',
                colorIndex: 4,
                tag: 'Meteo:SP',
                unitId: 0,
                unitName: '',
            },
            {
                isHidden: false,
                id: '2',
                name: 'Температура продукта на выходе из печи',
                label: '',
                colorIndex: 5,
                tag: 'AVT10:PL103_O',
                unitId: 0,
                unitName: '',
            },
            {
                isHidden: false,
                id: '3',
                name: 'Доля отгона сырья',
                label: '',
                colorIndex: 6,
                tag: 'AVT10:DTL_2_50_O',
                unitId: 0,
                unitName: '',
            },
        ]
    },
    {
        id: '4',
        name: 'Воздух',
        predictors: [
            {
                isHidden: false,
                id: '1',
                name: 'Скорость ветра',
                label: '',
                colorIndex: 3,
                tag: 'Meteo:SP',
                unitId: 0,
                unitName: '',
            },
            {
                isHidden: false,
                id: '2',
                name: 'Температура воздуха',
                label: '',
                colorIndex: 4,
                tag: 'Meteo:T1',
                unitId: 0,
                unitName: '',
            }
        ]
    }
]

export const PREDICTORS_DATA: IPredictors[] = [
    {
        isHidden: false,
        id: '1',
        name: 'Скорость ветра',
        label: '',
        colorIndex: 3,
        tag: 'Meteo:SP',
        unitId: 0,
        unitName: '',
    },
    {
        isHidden: false,
        id: '2',
        name: 'Температура воздуха',
        label: '',
        colorIndex: 4,
        tag: 'Meteo:T1',
        unitId: 0,
        unitName: '',
    },
    {
        isHidden: false,
        id: '3',
        name: 'Температура продукта на выходе из печи',
        label: '',
        colorIndex: 0,
        tag: 'AVT10:PL103_O',
        unitId: 0,
        unitName: '',
    },
    {
        isHidden: false,
        id: '4',
        name: 'Доля отгона сырья',
        label: '',
        colorIndex: 5,
        tag: 'AVT10:DTL_2_50_O',
        unitId: 0,
        unitName: '',
    },
]