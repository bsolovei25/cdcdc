import { ISouEnergetic } from '../../../dashboard/models/SOU/sou-energetic.model';

export const DATA_SOURCE: ISouEnergetic = {
    engUnits: 'тэр.',
    elements: [
        {
            title: 'Вода',
            type: 'h2o',
            value: 56,
        },
        {
            title: 'Тепло-гия',
            type: 'energy-heat',
            value: 180,
        },
        {
            title: 'Топливо',
            type: 'fire',
            value: 96,
        },
        {
            title: 'Электро-гия',
            type: 'energy',
            value: 73,
        },
    ],
};
