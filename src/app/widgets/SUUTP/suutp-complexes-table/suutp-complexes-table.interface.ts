export interface ITableDataRow {
    value: string;
    isWarning?: boolean;
}

export interface ITableData {
    cells: any[];
}

export interface ITableHeaders {
    [key: string]: string;
}

export interface ITableMain {
    headers: ITableHeaders[];
    rows: any[];
    displayedColumns: string[];
}
