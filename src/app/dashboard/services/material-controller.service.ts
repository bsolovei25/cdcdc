import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class MaterialControllerService {
    constructor(private snackBar: MatSnackBar) {}

    public openSnackBar(
        msg: string = 'Операция выполнена',
        panelClass: string | string[] = '',
        msgDuration: number = 5000,
        actionText?: string,
        actionFunction?: () => void
    ): void {
        const configSnackBar = new MatSnackBarConfig();
        configSnackBar.panelClass = panelClass;
        configSnackBar.duration = msgDuration;
        const snackBarInstance = this.snackBar.open(msg, actionText, configSnackBar);
        if (actionFunction) {
            snackBarInstance.onAction().subscribe(() => actionFunction());
        }
    }
}
