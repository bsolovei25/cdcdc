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


// ------------ Новые модели ------------ //
export interface IDataProgressGroup {
    data: {
        items: IProductGroups[];
    }
}

export interface IProductGroups {
    id: number; // Номер позиции в списке
    groupName: string; // Наименование группы продуктов
    devProduction: number; // Верхнее числовое значение (на макете 187863)
    devPassport: number; // Нижнее числовое значение (на макете 187863)
    passRest: number; // Паспортизованный остаток, голубое закрашивание на резервуаре
    allRest: number; // Весь остаток, синее закрашивание на резервуаре
    pointStatus: number; // Статус точки (левее от наименования)
    criticalProd: number; // Уровень критичности выработка (левая верхняя иконка от двух чисел)
    criticalPass: number; // уровень критичности паспортизация (левая нижняя иконка от двух чисел)
    criticalShip: number; // Уровень критичности отгрузка (правая верхняя иконка от двух чисел)
    criticalRazn: number; // Уровень критичности разнарядки (правая средняя иконка от двух чисел)
    criticalTank: number; // Уровень критичности состояния резервуарного парка (правая нижняя иконка от двух чисел)
    shipOf: number; // Оформленная отгрузка, самая правая часть виджета групп
    shipN: number; // Неоформленная отгрузка
    shipAll: number; // Вся отгрузка (цифра внутри круга)
    shipPlanPercent: number; // Дуга, процент выполнения плана по отгрузке
    passPlanPercent: number; // Дуга, процент выполнения плана по паспортизации (самая левая часть)
    pieStatus: number; // Уровень критичности круговой диаграммы (цвет окрашивания)
    daysGroup: IDayGroup[]; // Круг в левой части
    daysShip: IDayGroup[]; // Круг в правой части, отгрузка
    products: IProductsItems[];
    typeImage?: string; // Добавлено фронтом для определения внутренней иконки
}

export interface IProductsItems {
    id: number;
    title: string;
    passPlanPercent: number;
    pieStatus: number;
    criticalProd: number;
    criticalPass: number;
    criticalShip: number;
    criticalRazn: number;
    criticalTank: number;
    passRest: number;
    allRest: number;
    days: IDayGroup[];
}

export interface IDayGroup {
    day: number;
    critical: number;
}