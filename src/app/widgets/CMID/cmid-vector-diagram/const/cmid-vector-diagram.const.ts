import {
    ICmidRadarDataOptions,
    ICmidVectorDiagramModel,
    ICmidVectorDiagramRadarOptions
} from '@widgets/CMID/cmid-vector-diagram/models/cmid-vector-diagram.model';

export const cmidVectorDiagramData: ICmidVectorDiagramModel[] = [
    {
        id: 1,
        title: 'Безопасность',
        centerValue: 97.8,
        growIndex: 0.2,
        downIndex: null,
        points: [
            {
                name: 'Ключи деблокировки',
                link: '#',
                itemFactValue: 100,
                itemNormValue: 90
            },
            {
                name: 'Пожарная сигнализация',
                link: '#',
                itemFactValue: 90,
                itemNormValue: 98.2
            },
            {
                name: 'Контроль загазованности',
                link: '#',
                itemFactValue: 100,
                itemNormValue: 95
            },
            {
                name: 'ПИД-регуляторы',
                link: '#',
                itemFactValue: 85,
                itemNormValue: 98.2
            },
            {
                name: 'Сигнализации и блокировки',
                link: '#',
                itemFactValue: 90,
                itemNormValue: 99.3
            }
        ]
    },
    {
        id: 2,
        title: 'Надежность',
        centerValue: 96.2,
        growIndex: null,
        downIndex:  1.8,
        points: [
            {
                name: 'Системы вибродиагностики',
                link: '#',
                itemFactValue: 100,
                itemNormValue: 99
            },
            {
                name: 'СУУТП',
                link: '#',
                itemFactValue: 100,
                itemNormValue: 90
            },
            {
                name: 'Диагностика АСУТП',
                link: '#',
                itemFactValue: 82,
                itemNormValue: 89.2
            },
            {
                name: 'Диагностика питания АСУТП',
                link: '#',
                itemFactValue: 90,
                itemNormValue: 91.8
            },
            {
                name: 'Система электрообогрева',
                link: '#',
                itemFactValue: 100,
                itemNormValue: 90
            }
        ]
    },
    {
        id: 3,
        title: 'Экология',
        centerValue: 96.8,
        growIndex: 0.2,
        downIndex: null,
        points: [
            {
                name: 'Сбросы на факел',
                link: '#',
                itemFactValue: 100,
                itemNormValue: 99
            },
            {
                name: 'ПКЗ',
                link: '#',
                itemFactValue: 100,
                itemNormValue: 90
            },
            {
                name: 'Оборотная вода',
                link: '#',
                itemFactValue: 100,
                itemNormValue: 80
            },
            {
                name: 'Сточная вода',
                link: '#',
                itemFactValue: 100,
                itemNormValue: 95
            },
            {
                name: 'АСМВ',
                link: '#',
                itemFactValue: 93,
                itemNormValue: 98.2
            }
        ]
    }
];

export const radarOptions: ICmidVectorDiagramRadarOptions = {
    circlePosition: {
        x: 0,
        y: 0
    },
    circleInnerColor: 'var(--toggler-background)',
    circleBorder: 'var(--gray-G7-color)',
    circleBorder2: 'var(--chart-segment-color)',
    lineColor: 'var(--chart-segment-color)',
    rectFactColor: 'var(--chart-segment-color)',
    rectNormColor: 'var(--opacity-orange-20-color)',
    pointRadius: 4,
}

export const radarDataOptions: ICmidRadarDataOptions[] = [
    {
        textTransform: '-51px, -38px',
        valueTransform: '-14px, -7px',
        textWidth: '200'
    },
    {
        textTransform: '-90px, 3px',
        valueTransform: '-35px, -3px',
        textWidth: '80'
    },
    {
        textTransform: '-98px, 19px',
        valueTransform: '-35px, 13px',
        textWidth: '90'
    },
    {
        textTransform: '5px, 18px',
        valueTransform: '6px, 13px',
        textWidth: '90'
    },
    {
        textTransform: '9px, 3px',
        valueTransform: '8px, 0',
        textWidth: '80'
    }
];
