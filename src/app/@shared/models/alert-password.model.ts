export interface IAlertPasswordModel {
    isShow: boolean;
    isCreatePassword: boolean;
    acceptFunction?: (password: string) => void;
    closeFunction?: () => void;
}
