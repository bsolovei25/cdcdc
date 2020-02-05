// Angular
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
// Angular material
// RxJS
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
                        // this.openSnackBar('Сервер не отвечает');
                        break;
                    case 403:
                        console.error(err);
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
        msgDuration: number = 3000,
        actionText?: string,
        actionFunction?: () => void
    ): void {
        const snackBarInstance = this.snackBar.open(msg, actionText, { duration: msgDuration });
        if (actionFunction) {
            snackBarInstance.onAction().subscribe(() => actionFunction());
        }
    }
}
