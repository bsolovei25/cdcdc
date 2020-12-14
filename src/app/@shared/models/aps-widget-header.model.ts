export interface IApsWidgetHeaderMenu {
    title: string;
    action: () => any;
}

export type ApsHeaderIconType =
    | 'drop'
    | 'book'
    | 'gantt'
    | 'document'
    | 'pen'
    | 'map'
    | 'menu'
    | 'periods'
    | 'plant'
    | 'tank'
    | 'tools'
    | 'triangle'
    | 'safety'
    | 'performance'
    | 'energy'
    | 'kpe-marker'
    | 'sliders'
    | 'document'
    | 'keyboard'
    | 'factory'
    | 'squares'
    | 'dots-triangle'
    | 'pie';
