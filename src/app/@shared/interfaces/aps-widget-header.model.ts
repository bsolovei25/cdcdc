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
    | 'keyboard'
    | 'factory'
    | 'squares'
    | 'dots-triangle'
    | 'balance'
    | 'pie'
    | 'setting'
    | 'people'
    | 'calculator';
