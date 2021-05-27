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
import { AuthService } from '@core/service/auth.service';
// Local modules

@Injectable({
    providedIn: 'root', // singleton service
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private materialController: SnackBarService,
        private authService: AuthService
    ) {}

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
                        this.materialController.openSnackBar(
                            'У Вас недостаточно прав для выполнения этой операции!',
                            'error'
                        );
                        break;
                    case 500:
                        break;
                    case 0:
                        this.materialController.openSnackBar('Сервер не отвечает', 'error');
                        break;
                    case 477:
                        if (err?.error && err) {
                            const type = err.error.message.type;
                            if (type === 'message') {
                                console.warn('477', err.error.message.message);
                            } else {
                                this.materialController.openSnackBar(err.error.message.message, type);
                                console.error(err);
                            }
                        }
                        this.materialController.openSnackBar(err.error.message.message, 'error');
                        break;
                    case 475:
                        if (err?.error) {
                            this.authService.configureUserAuth(err.error);
                            return next.handle(req);
                        }
                        console.error('Error 475 (continue): Token was not received');
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
