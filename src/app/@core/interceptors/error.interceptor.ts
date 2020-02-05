// Angular
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
// Angular material
// RxJS
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
// Local modules

@Injectable({
    providedIn: 'root', // singleton service
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private snackBar: MatSnackBar) {}

    /** Intercept request with custom error handling */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // pass source request
        return next.handle(req).pipe(
            catchError((err) => {
                switch (err.status) {
                    case 401:
                        this.router.navigate(['login']);
                        break;
                    case 500:
                        // this.router.navigate(['login']);
                        break;
                    case 0:
                        this.router.navigate(['login']);
                        this.openSnackBar('Сервер не отвечает');
                        break;
                    case 403:
                        console.error(err);
                        break;
                    case 477:
                        const message: string = err.error.messages[0].message;
                        const panelClass: string = 'snackbar-red';
                        this.openSnackBar(message, panelClass);
                        console.log(err);
                        break;
                    default:
                        break;
                }
                // return the error to the method that called it
                return throwError(err);
            })
        );
    }

    openSnackBar(
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
