export interface ITankInformation {
    id: number;
    name: string;
    tank: ITankCard[];
    type: string;
}

export interface ITankCard { // Карточка резервуара
    id: number;
    name: string;
    valuePas: number; /// Значение паспорта
    valueGr: number; /// Температура в градусах Цельсия
    valueLev: number;  // Значение уровеня резервуара (?)
    tankFilling: number; // Процент заполнение резервуара
    status: string; /// Статус - в работе; выведен из-под контроля
    operation: string; /// операция с резервуаром 
                    ///- Отсутсвуют операции; Наполение; Отгрузка;
}

export interface ITankFilter { // Тип резервуара
    id: number;
    name: string; // TCБ; СУГ; БИТУМЫ;
    tank: ITankFilterTanks[];
}

export interface ITankFilterTanks { // Резервуары
    id: number;
    name: string;
    isActive?: boolean; // Не нужны
    open?: boolean; // Не нужны
}