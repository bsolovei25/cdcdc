export interface IAlertWindowModel {
    isShow: boolean;
    questionText: string;
    acceptText: string;
    cancelText: string;
    acceptFunction?: () => void;
    cancelFunction?: () => void;
}