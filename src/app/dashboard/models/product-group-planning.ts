export interface IProductGroupPlanning {
    product: IProduct;
    typeProduct: ITypeProduct[];
    compleateProduct: ICompleateProduct;
    imageType: string;
}

export interface IProduct {
    name: string;
    value: number;
    productPercent: number;
    criticalValue: number;
}

export interface ITypeProduct {
    name: string;
    value: number;
    percent: number;
    criticalValue: number;
    criticalButton: IButton;
}

export interface IButton {
    button1: boolean;
    button2: boolean;
    button3: boolean;
}

export interface ICompleateProduct {
    value: number;
    compleateProcent: number;
}
