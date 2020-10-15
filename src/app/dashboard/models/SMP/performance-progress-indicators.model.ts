export interface IGetData {
    data: IProgressIndicators;
}
export interface IProgressIndicators {
    statePark: IPerfProgPark; /// Состояние парка
    shipment: IPerfProgPark; /// Отгрузка
    circle: IPerfProgCircle[]; /// Массив кругов с визуализацией дней
}

export interface IPerfProgCircle {
    id: number;
    title: string; /// enum (?) => Выработка, Паспортизация, Отгрузка
    value: number;
    icon: string; /// enum (?) => production, passportization, shipment
    gaugePercent: number; /// Процент заполнения внешнего круга, возможно не требуется
    piePercent: number; /// Процент заполнения внутреннего круга
    isCritical: boolean; /// Состояние внутренего круга enum => normal, critical
    days: IPerfCircleDay[]; /// массив дней
}

export interface IPerfCircleDay {
    day: number; // день месяца
    state: string; /// состояние дня. enum - normal, warning, critical, disabled
}

export interface IPerfProgPark {
    capacity?: number; /// Вместимость
    balance?: number; /// Остаток
    certified?: number; /// Паспортизировано (Использовано)
    planLevel: number; /// % (0-100) плана заполнения уровня бака
    factLevel: number; /// % (0-100) фактическое заполнение уровня бака
}
