import { FormControl } from '@angular/forms';

export interface IAlertWindowModel {
    isShow: boolean;
    questionText: string;
    acceptText: string;
    cancelText: string;
    acceptFunction?: () => void;
    closeFunction?: () => void;
    cancelFunction?: () => void;
    input?: {
        formControl: FormControl;
        placeholder: string;
    };
    status?: number; // active, success, warning, danger
}
