export interface IFacilityDeviationElement {
    title: string; // название производства
    value: number; // текущее значение
    deviation: number; // отклонение
    isWarning: boolean; // обозначать ли установку желтым цветом
    // круговые индикаторы
    indicators: {
        id: number;
        isWarning: boolean;
    }[];
}
