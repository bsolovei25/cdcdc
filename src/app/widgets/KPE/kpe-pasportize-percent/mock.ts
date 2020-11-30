import { IKpePasportizeProduct } from './components/kpe-pasportize-percent-product/kpe-pasportize-percent-product.component';
import { IKpePasportizeGauge } from './kpe-pasportize-percent.component';

export const productData: IKpePasportizeProduct[] = [
    {
        title: 'Газ сниженный ПТ',
        percentage: 100,
        count: 10,
    },
    {
        title: 'Газ сж. для а/тр. ПА',
        percentage: 85,
        count: 7,
    },
    {
        title: 'Битум БНД 100/130',
        percentage: 76,
        count: 5,
    },
    {
        title: 'Топ-в д/реакт. двиг. ТС-1 в/c (tкр. - 60°C)',
        percentage: 79,
        count: 5,
    },
    {
        title: 'Топливо диз. летнее Л-55 (ДТ-Л-K5)',
        percentage: 50,
        count: 4,
    },
    {
        title: 'Топливо диз. ЕВРО сорта С, K5 (ДТ-Л-К5)',
        percentage: 40,
        count: 3,
    },
    {
        title: 'Топливо ТКМ-16 с серой 2%, 3',
        percentage: 40,
        count: 3,
    },
    {
        title: 'СМТ (DMA) вид II',
        percentage: 40,
        count: 3,
    },
    {
        title: 'ТСУ-380 спец. вид I',
        percentage: 30,
        count: 2,
    },
    {
        title: 'Бензин газовой м.А',
        percentage: 30,
        count: 2,
    },
    {
        title: 'Автомоб. бензин G-Drive 100 (АИ-100-K5)',
        percentage: 30,
        count: 2,
    },
    {
        title: 'Бензин неэтилированный марки АИ-92-К5',
        percentage: 20,
        count: 1,
    },
    {
        title: 'ТСУ-180 (RME-180) вид М',
        percentage: 10,
        count: 1,
    },
    {
        title: 'Топливо диз. ЕВРО сорта F, K5 (ДТ-Е-К5)',
        percentage: 0,
        count: 1,
    }
];

export const gaugeData: IKpePasportizeGauge = {
    plan: 764,
    planDescription: 'Зафиксированных случаев паспортизации',
    fact: 715,
    factDescription: 'Паспортизаций с первого предъявления',
    percentage: 0.935863
};
