export interface IDocumentsScan {
    id: number;
    externalId?: string;
    name: string;
    date: Date;
    path?: string;
}

export interface IDocumentsTank {
  enabled?: boolean;
  id: string;
  limitHours?: number;
  name: string;
}

export interface IDocumentsLaboratory {
    id: number;
    name: string;
    shortName: string;
}
