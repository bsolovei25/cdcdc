// Angular
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// Angular material
// RxJS
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
// Local modules

@Injectable({
    providedIn: 'root', // singleton service
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    /** Intercept request with custom error handling */
    intercept(req: HttpRequest<any>, next: HttpHandler): any {
        // pass source request
        return next.handle(req).pipe(
            catchError((err) => {
                switch (err.status) {
                    case 401:
                        this.router.navigate(['login']);
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
}
