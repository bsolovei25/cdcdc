import { IDatesInterval } from '../../services/widget.service';

export interface IApsLoad {
    units: string;
    period: IDatesInterval;
    chart: IApsLoadChart[];
}

export interface IApsLoadChart {
    value: number;
    date: Date;
}
