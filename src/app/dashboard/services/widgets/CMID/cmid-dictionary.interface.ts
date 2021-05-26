export interface ITypeOfReason {
    name: string
}

export interface IDirectoryRow {
    id: string;
    name: string;
    code: string;
}

export interface IDirectoryData {
    id: string;
    tripReasonName: string;
    rows: IDirectoryRow[];
}

export interface IReasonOfDisconnect {
    directoryName: string;
    description: string;
    directoryData: IDirectoryData[];
}
