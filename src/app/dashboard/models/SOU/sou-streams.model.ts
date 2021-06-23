import { ISouSection } from '@dashboard/models/SOU/sou-operational-accounting-system.model';

export interface ISouOptions {
    manufactures: ISouManufacture[];
    title: string;
    widgetType: string;
}

export interface ISouManufacture {
    id: string;
    name: string;
    units: ISouUnit[];
}

export interface ISouUnit {
    id: string;
    name: string;
    reservoirs: ISouReservoir[];
    balance: 'main' | 'section';
    section: ISouSection[];
}

export interface ISouReservoir {
    id: string;
    name: string;
}

export interface ISouStreamsClient {
    id: string;
    objectName: string;
    objectType: string;
}

export interface ISouStreamsObject {
    id: string;
    objectName: string;
    objectType: string;
}

export interface ISouStreamsSingleObject {
    objectName: string;
    objectStatus: string;
    objectType: 'Tank'|'Unit';
}

export interface ISouStreamsOperation {
    sourceName: string // "Емкость Е-2 ГРС";
    destinationName: string; // "Емкость Е-20 ГРС";
    startTime: string; // "2021-06-16T09:54:58.491Z";
    endTime: string; // "2021-06-16T09:54:58.491Z";
    sourceProduct: string; // "Фр.пропановая-комп. сжиж. газа(НПП НХ)";
    destinationProduct: string; // "Газ сжиженный пропан авто. (ПА)";
    sourceMass: number;
    destinationMass: number;
    flow: string; // "(поз. 2553)";
}
