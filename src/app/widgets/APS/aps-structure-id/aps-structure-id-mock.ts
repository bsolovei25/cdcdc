import { IStructure } from './aps-structure-id.component';

export const structureList: IStructure[] = [
    {
        unit: { name: 'Технологическая установка' },
        list: [
            {
                id: '0',
                title: 'Справочник',
                unitType: 1,
            },
            {
                id: '1',
                title: 'Режимы работы ТУ',
                unitType: 2,
            },
            {
                id: '2',
                title: 'Скорость изменнеия загрузки',
                unitType: 3,
            },
            {
                id: '3',
                title: 'Диапазон производительности по регламенту',
                unitType: 4,
            },
            {
                id: '4',
                title: 'Диапазон производительности по PIMS',
                unitType: 5,
            },
            {
                id: '5',
                title: 'Плановая производительность (PIMS)',
                unitType: 6,
            },
            {
                id: '6',
                title: 'Плановый расход топлива (PIMS)',
                unitType: 7,
            },
            // {
            //     id: '7',
            //     title: 'Инженерная модель',
            // }
        ],
    },
    {
        unit: { name: 'Материальный поток' },
        list: [
            {
                id: '8',
                title: 'Справочник',
                unitType: 50,
            },
            {
                id: '9',
                title: 'Выработка (PIMS)',
                unitType: 51,
            },
            {
                id: '10',
                title: 'Распределение (PIMS)',
                unitType: 52,
            },
            {
                id: '11',
                title: 'Показатели качества (PIMS)',
                unitType: 53,
            },
        ],
    },
    {
        unit: { name: 'Резервуар' },
        list: [
            {
                id: '16',
                title: 'Справочник',
                unitType: 100,
            },
            {
                id: '17',
                title: 'График ремонтов',
                unitType: 101,
            },
            {
                id: '18',
                title: 'Возможность хранения материалов',
                unitType: 102,
            },
            {
                id: '19',
                title: 'Начальные запасы',
                unitType: 103,
            },
        ],
    },
    {
        unit: { name: 'Логистические графики' },
        list: [
            {
                id: '24',
                title: 'Графики поставки',
                unitType: 150,
            },
            {
                id: '25',
                title: 'Графики отгрузки',
                unitType: 151,
            },
        ],
    },
    {
        unit: { name: 'Моделирование' },
        list: [
            {
                id: '32',
                title: 'Моделирование пусковых периодов',
                unitType: 200,
            },
            {
                id: '33',
                title: 'Вывод в план',
                unitType: 201,
            },
            {
                id: '34',
                title: 'Загрузить по наличию сырья',
                unitType: 202,
            },
            {
                id: '35',
                title: 'Моделирование загрузки технологической установки',
                unitType: 203,
            },
            {
                id: '36',
                title: 'Моделирование процента отбора',
                unitType: 204,
            },
            {
                id: '37',
                title: 'Моделирование вовлечения сырьевого потока',
                unitType: 205,
            },
            {
                id: '38',
                title: 'Моделирование показателей качества',
                unitType: 206,
            },
            {
                id: '39',
                title: 'Порядок расчета',
                unitType: 207,
            },
            {
                id: '40',
                title: 'Тип установки',
                unitType: 208,
            },
            {
                id: '41',
                title: 'Хранение сырья',
                unitType: 209,
            },
            {
                id: '42',
                title: 'Типы сырья',
                unitType: 210,
            },
        ],
    },
    {
        unit: { name: 'Результат расчета' },
        list: [
            {
                id: '50',
                title: 'Результат расчёта',
                unitType: 300,
            },
        ],
    },
];
