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
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Circle,
                    data: {
                        value: 44.6,
                        unit: 'ºС',
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
                        value: 44.6,
                        unit: 'ºС',
                    },
                },
                {
                    type: AstueOnpzMnemonicFurnaceElementType.Quad,
                    data: {
                        value: 44.6,
                        unit: 'кг/см²',
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
            value: 44.6,
            unit: 'ºС',
            streamType: AstueOnpzMnemonicFurnaceStreamStatsType.Deviation,
        },
        streams: [44.6, 44.6, 44.6, 44.6, 44.6, 44.6],
    },
    gasStats: {
        title: 'Уходящие газы',
        main: {
            value: 44.6,
            unit: 'ºС',
            streamType: AstueOnpzMnemonicFurnaceStreamStatsType.Norm,
        },
        streams: [44.6, 44.6, 44.6, 44.6],
    },
};
