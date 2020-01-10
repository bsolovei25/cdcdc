
export interface OilControls {
    operations: number;
    deviations: number;
    product: OilProduct[];
  
  }

export interface OilProduct{
    name: string;
    value: number;
    critical: number;
    storage: OilStorage[];
}

export interface OilStorage{
    id: number;
    nameStorage: string;
    status: string;
    valueStorage: number;
    tank: OilTank[];
    tanker: OilTanker[];
}

export interface OilTank{
    timeStart: string;
    timeEnd: string;
    bukLevel: number;
    tankValue: OilTankValue[];

}

export interface OilTankValue{
    name: string;
    valueFirts: number;
    valueSecond: number;
    status: string;
}

export interface OilTanker{
    nameTanker: string;
    shipped: boolean;
    value: number;
    title: string;
}