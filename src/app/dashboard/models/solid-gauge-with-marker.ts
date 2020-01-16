export interface SolidGaugeWithMarker {
    values: SolidGaugeWithMarkerItem[];
}

export interface SolidGaugeWithMarkerItem {
    name: string;
    fact: number;
    percent: number;
    value: number;
}
