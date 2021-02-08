import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

type snackBarColor = 'snackbar-red' | 'blue';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    constructor(private snackBar: MatSnackBar) {}

    public openSnackBar(
        msg: string = 'Операция выполнена',
        panelClass: snackBarColor = 'blue',
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
