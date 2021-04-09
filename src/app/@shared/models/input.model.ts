export interface IInputIcon {
    src: string;
    svgStyle: { [key: string]: number | string };
    isClickable: boolean;
    onClick?: () => void;
    secState?: string;
}

export interface IInputMask {
    prefix: string;
    mask: string;
    showMaskTyped: boolean;
}

export interface IInputOptions {
    type: string;
    state: InputStatesType;
    placeholder: string;
    isMovingPlaceholder: boolean;
    withoutUnderline?: boolean;
    icon?: IInputIcon;
    mask?: IInputMask;
    logo?: IInputIcon;
}

export type InputStatesType = 'normal' | 'rounded' | 'warning' | 'danger';
