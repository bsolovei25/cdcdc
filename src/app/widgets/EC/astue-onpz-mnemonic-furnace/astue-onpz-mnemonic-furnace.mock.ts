import {
    AstueOnpzMnemonicFurnaceElementType,
    AstueOnpzMnemonicFurnaceRectType,
    AstueOnpzMnemonicFurnaceStreamStatsType,
    IAstueOnpzMnemonicFurnace,
} from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-mnemonic-furnace.model';

export const SOURCE_DATA: IAstueOnpzMnemonicFurnace = {
    unitTitle: 'П-1/3',
    inputOilBlock: {
        title: 'Входящая отбензиненная нефть',
        lines: [
            [
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        count: 'Σ',
                        title: 'потоков',
                        value: 4000,
                        unit: 'м/с',
                        type: AstueOnpzMnemonicFurnaceRectType.Full,
                        streamType: AstueOnpzMnemonicFurnaceStreamStatsType.Deviation,
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Circle,
                    data: {
                        id: '1',
                        value: 44.6,
                        unit: 'ºС',
                        streamType: AstueOnpzMnemonicFurnaceStreamStatsType.Deviation,
                    },
                },
            ],
            [
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        count: '1',
                        title: 'поток',
                        value: 4000,
                        unit: 'м/с',
                        type: AstueOnpzMnemonicFurnaceRectType.Full,
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Circle,
                    data: {
                        id: '2',
                        value: 44.6,
                        unit: 'ºС',
                    },
                },
            ],
            [
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        count: '2',
                        title: 'поток',
                        value: 4000,
                        unit: 'м/с',
                        type: AstueOnpzMnemonicFurnaceRectType.Full,
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Circle,
                    data: {
                        id: '3',
                        value: 44.6,
                        unit: 'ºС',
                    },
                },
            ],
            [
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        count: '3',
                        title: 'поток',
                        value: 4000,
                        unit: 'м/с',
                        type: AstueOnpzMnemonicFurnaceRectType.Full,
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Circle,
                    data: {
                        id: '4',
                        value: 44.6,
                        unit: 'ºС',
                    },
                },
            ],
            [
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        count: '4',
                        title: 'поток',
                        value: 4000,
                        unit: 'м/с',
                        type: AstueOnpzMnemonicFurnaceRectType.Full,
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Circle,
                    data: {
                        id: '5',
                        value: 44.6,
                        unit: 'ºС',
                    },
                },
            ],
        ],
    },
    inputGasBlock: {
        title: 'Входящий толивный газ',
        lines: [
            [
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        title: 'Расход',
                        value: 4000,
                        unit: 'м³/с',
                        type: AstueOnpzMnemonicFurnaceRectType.Value,
                    },
                },
            ],
            [
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        title: 'Плотность',
                        value: 4000,
                        unit: 'м³/с',
                        type: AstueOnpzMnemonicFurnaceRectType.Value,
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Circle,
                    data: {
                        id: '6',
                        value: 44.6,
                        unit: 'ºС',
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Quad,
                    data: {
                        value: 44.6,
                        unit: 'кг/см²',
                        streamType: AstueOnpzMnemonicFurnaceStreamStatsType.Deviation,
                    },
                },
            ],
            [
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        title: 'Q сгорания',
                        value: 4000,
                        unit: 'м³/с',
                        type: AstueOnpzMnemonicFurnaceRectType.Value,
                    },
                },
            ],
        ],
    },
    inputLiquidBlock: {
        title: 'Жидкое топливо',
        lines: [
            [
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        title: 'Прямое ж. т.',
                        value: 4000,
                        unit: 'м³/с',
                        type: AstueOnpzMnemonicFurnaceRectType.Value,
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Circle,
                    data: {
                        id: '7',
                        value: 44.6,
                        unit: 'ºС',
                    },
                },
            ],
            [
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        title: 'Возврат ж. т.',
                        value: 4000,
                        unit: 'м³/с',
                        type: AstueOnpzMnemonicFurnaceRectType.Value,
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Circle,
                    data: {
                        id: '8',
                        value: 44.6,
                        unit: 'ºС',
                    },
                },
            ],
        ],
    },
    outputBlock: {
        title: 'Выходящее сырье',
        lines: [
            [
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        count: '1',
                        title: 'поток',
                        type: AstueOnpzMnemonicFurnaceRectType.Stream,
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Circle,
                    data: {
                        id: '9',
                        value: 44.6,
                        unit: 'ºС',
                    },
                },
            ],
            [
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        count: '2',
                        title: 'поток',
                        type: AstueOnpzMnemonicFurnaceRectType.Stream,
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Circle,
                    data: {
                        id: '10',
                        value: 44.6,
                        unit: 'ºС',
                    },
                },
            ],
            [
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        count: '3',
                        title: 'поток',
                        type: AstueOnpzMnemonicFurnaceRectType.Stream,
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Circle,
                    data: {
                        id: '11',
                        value: 44.6,
                        unit: 'ºС',
                    },
                },
            ],
            [
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Rect,
                    data: {
                        count: '4',
                        title: 'поток',
                        type: AstueOnpzMnemonicFurnaceRectType.Stream,
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Circle,
                    data: {
                        id: '12',
                        value: 44.6,
                        unit: 'ºС',
                    },
                },
            ],
        ],
    },
    dischargeStats: {
        title: 'Разряжение',
        main: {
            id: '13',
            value: 44.6,
            unit: 'ºС',
            streamType: AstueOnpzMnemonicFurnaceStreamStatsType.Deviation,
        },
        streams: [{ value: 44.6, streamType: AstueOnpzMnemonicFurnaceStreamStatsType.Deviation }],
    },
    gasStats: {
        title: 'Уходящие газы',
        main: {
            id: '14',
            value: 44.6,
            unit: 'ºС',
            streamType: AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
        },
        streams: [{ value: 44.6, streamType: AstueOnpzMnemonicFurnaceStreamStatsType.Norm }],
    },
    oxygenStats: {
        title: 'Кислород',
        main: {
            id: '15',
            value: 44.6,
            unit: 'ºС',
            streamType: AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
        },
        streams: [{ value: 44.6, streamType: AstueOnpzMnemonicFurnaceStreamStatsType.Norm }],
    },
};
