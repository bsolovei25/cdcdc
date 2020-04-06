// Angular
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
// Angular material
// RxJS
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarService } from '../../dashboard/services/snack-bar.service';
// Local modules

@Injectable({
    providedIn: 'root', // singleton service
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private materialController: SnackBarService) {}

    /** Intercept request with custom error handling */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // pass source request
        return next.handle(req).pipe(
            catchError((err) => {
                switch (err.status) {
                    case 401:
                        this.router.navigate(['login']);
                        break;
                    case 403:
                        this.materialController.openSnackBar('У Вас недостаточно прав для выполнения этой операции!',
                            'snackbar-red');
                        break;
                    case 500:
                        break;
                    case 0:
                        this.materialController.openSnackBar('Сервер не отвечает',
                            'snackbar-red');
                        break;
                    case 477:
                        this.materialController.openSnackBar(
                            err.error.messages[0].message,
                            'snackbar-red'
                        );
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
}
