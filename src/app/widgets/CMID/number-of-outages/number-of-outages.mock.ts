import { INumberOfOutagesModel } from "@widgets/CMID/number-of-outages/models/number-of-outages.model";

export const OUTAGES_MOCK: INumberOfOutagesModel[] = [
    {
        group: 'Group 1',
        manufactures: [
            {
                name: 'Производство 88',
                plants: [
                    {
                        name: 'АВТ-20',
                        unauthorized: 0,
                        expired: 0,
                        total: 0
                    },
                    {
                        name: 'АВТ-30',
                        unauthorized: 0,
                        expired: 0,
                        total: 5
                    },
                    {
                        name: 'АВТ-40',
                        unauthorized: 1,
                        expired: 0,
                        total: 1
                    },
                    {
                        name: 'АВТ-50',
                        unauthorized: 0,
                        expired: 2,
                        total: 2
                    },
                    {
                        name: 'АВТ-60',
                        unauthorized: 3,
                        expired: 2,
                        total: 5
                    }
                ]
            }
        ]
    },
    {
        group: 'Group 2',
        manufactures: [
            {
                name: 'Производство 14',
                plants: [
                    {
                        name: 'АВТ-40',
                        unauthorized: 0,
                        expired: 0,
                        total: 0
                    }
                ]
            },
        ]
    },
    {
        group: 'Group 3',
        manufactures: [
            {
                name: 'Производство 14',
                plants: [
                    {
                        name: 'АВТ-40',
                        unauthorized: 0,
                        expired: 0,
                        total: 0
                    }
                ]
            },
        ]
    },
    {
        group: 'Group 4',
        manufactures: [
            {
                name: 'Товарное производство',
                plants: [
                    {
                        name: 'АВТ-40',
                        unauthorized: 0,
                        expired: 0,
                        total: 0
                    }
                ]
            },
            {
                name: 'Общезаводское хозяйство',
                plants: [
                    {
                        name: 'АВТ-40',
                        unauthorized: 0,
                        expired: 0,
                        total: 0
                    }
                ]
            }
        ]
    }
]
