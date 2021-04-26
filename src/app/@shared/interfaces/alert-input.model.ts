export interface IAlertInputModel {
    isShow?: boolean;
    title?: string;
    placeholder?: string;
    acceptText: string;
    cancelText: string;
    value: string;
    acceptFunction?: (value: string) => void;
    cancelFunction?: () => void;
}
