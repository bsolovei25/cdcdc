export interface IProducts {
    id: number;
    groupName: string; // title - 'Бензин' и тд
    performance: number; /// Отклонение в круге левой панели
    groupValue: number; /// Значение (оформелно) для левой и правой панели
    groupValueTwo: number; /// Второе значение в левом блоке
    pointStatus: string; /// Статус продукта: enum - normal, danger, warning
    ///Left-side button
    /// enum - normal, danger, warning
    groupDeviationValue: string; /// Левая верхняя кнопка
    groupDeviationFlag: string; /// Левая центральная кнопка
    groupDeviationShip: string; /// Левая нижняя кнопка
    groupDeviationAkk: string; /// Правая верхняя кнопка
    groupDeviationUpd: string; /// Правая нижняя кнопка
    ///Right-side
    groupDeviationAllValue: number; /// Значение в круге
    groupDeviationNotValue: number; /// Не оформлено

    framedPecent: number; // Процент офорленных для прогресс бара
    notFramedPercent: number; // Процент не оформленных для прогресс бара

    gaugePercent: number; /// Процент заполнения круга gauge

    ///Middle-side
    products: ITypeProduct[];

    typeImage?: string;
    isActive?: boolean;
}

export interface ITypeProduct {
    title: string;
    piePercent: number;
    gaugePercent: number;
    pieStatus: string; /// Статус внутреннего круга: enum - normal, danger, warning
    days: ITypeProductDay[]; /// массив дней
    ///Button
    /// enum - normal, danger, warning
    productFiling: string; /// Левая верхняя кнопка
    productUpdate: string; /// Левая нижняя кнопка
    productCrowded: string; /// Левая большая кнопка
    productFlask: string; /// Правая верхняя кнопка
    productList: string; /// Правая нижняя кнопка
    productBuild: string; /// Правая большая кнопка
}

export interface ITypeProductDay {
    day: number; // день месяца
    state: string; /// состояние дня. enum - normal, warning, critical, disabled
}
