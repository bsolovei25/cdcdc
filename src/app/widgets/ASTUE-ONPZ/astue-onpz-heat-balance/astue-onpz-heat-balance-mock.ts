import { IAstueOnpzHeatBalanceItem } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-heat-balance.model';

export const heatBalanceData: IAstueOnpzHeatBalanceItem[] = [
    {
        name: 'Q',
        description: 'description',
        absoluteValue: 200,
        relativeValue: 200,
        items: [
            {
                name: 'Q1',
                description: 'description',
                absoluteValue: 200,
                relativeValue: 200,
            },
            {
                name: 'Q2',
                description: 'description',
                absoluteValue: 200,
                relativeValue: 200,
            },
        ],
    },
];
