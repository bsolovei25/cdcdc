import { ISouBalance } from "src/app/dashboard/models/SOU/sou-balance.model";

export const souBalanceData: ISouBalance[] = [
    {
      title: 'Итого сырья',
      icon: 'material',
      mass: 1634153,
      percent: 100,
      products: [
        {
          type: 'oil',
          title: 'Нефть',
          percent: 87.28,
          mass: 1433569,
          percentAgree: 10,
          massAgree: 143569
        },
        {
          type: 'oil_kgs',
          title: 'КГС',
          percent: 8.29,
          mass: 136212,
          percentAgree: 10,
          massAgree: 143569
        },
        {
          type: 'barrel_small',
          title: 'Прочие',
          percent: 4.42,
          mass: 72565,
          percentAgree: 34.02,
          massAgree: 14569
        }
      ]
    }, 
    {
      title: "Итого продукции",
      icon: 'production',
      mass: 1634153,
      percent: 99.49182371287,
      products: [
        {
          type: 'summ',
          title: 'Всего светлых',
          percent: 71.02,
          mass: 1114929,
          percentAgree: 19,
          massAgree: 1435469
        },
        {
          type: 'car',
          title: 'Бензины',
          percent: 33.16,
          mass: 518130,
          percentAgree: 10,
          massAgree: 143569
        },
        {
          type: 'plane',
          title: 'ТС-1',
          percent: 71.02,
          mass: 1114929,
          percentAgree: 10,
          massAgree: 143569
        },
        {
          type: 'truck',
          title: 'ДТ',
          percent: 30.31,
          mass: 457760,
          percentAgree: 10,
          massAgree: 143569
        },
        {
          type: 'ship',
          title: 'СМТ',
          percent: 1.82,
          mass: 28514,
          percentAgree: 10,
          massAgree: 143569
        },
        {
          type: 'ring',
          title: 'Ароматика',
          percent: 0.77,
          mass: 12126,
          percentAgree: 10,
          massAgree: 143569
        },
        {
          type: 'summ',
          title: 'Всего темных',
          percent: 15.62,
          mass: 245190,
          percentAgree: 10,
          massAgree: 143569
        },
        {
          type: 'oil',
          title: 'Газы',
          percent: 1.69,
          mass: 26550,
          percentAgree: 10,
          massAgree: 143569
        },
        {
          type: 'oil',
          title: 'Топливо',
          percent: 8.61,
          mass: 218970,
          percentAgree: 10,
          massAgree: 143569
        },
        {
          type: 'oil',
          title: 'Потери',
          percent: 8.61,
          mass: 218970,
          percentAgree: 10,
          massAgree: 143569
        },
        {
          type: 'oil',
          title: 'Прочее',
          percent: 8.61,
          mass: 218970,
          percentAgree: 10,
          massAgree: 143569
        }
      ]
    }
  ]