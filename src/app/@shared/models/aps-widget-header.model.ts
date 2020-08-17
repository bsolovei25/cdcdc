export interface IApsWidgetHeaderMenu {
    title: string;
    action: () => any;
}

export type ApsHeaderIconType =
    | 'drop'
    | 'book'
    | 'gantt'
    | 'map'
    | 'menu'
    | 'periods'
    | 'plant'
    | 'tank'
    | 'tools'
    | 'triangle'
    | 'safety'
    | 'performance'
    | 'kpe-marker';
