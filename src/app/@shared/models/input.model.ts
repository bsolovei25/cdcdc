export interface IInputIcon {
    src: string;
    svgStyle: { [key: string]: number | string };
    isClickable: boolean;
    onClick?: () => void;
    secState?: string;
}

export interface IInputOptions {
    type: string;
    state: InputStatesType;
    placeholder: string;
    isMovingPlaceholder: boolean;
    icon?: IInputIcon;
}

export type InputStatesType = 'normal' | 'rounded' | 'warning' | 'danger';
