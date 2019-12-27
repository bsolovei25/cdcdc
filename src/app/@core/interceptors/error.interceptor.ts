// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// Angular material
// RxJS
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '@core/service/auth.service';
import { Router } from '@angular/router';
// Local modules


@Injectable({
  providedIn: 'root' // singleton service
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  /** Intercept request with custom error handling */
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    // pass source request
    // return next.handle(req);
    // console.log('interceprtor', req, next);

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

        // show snackbar based on HTTP code
        // if (this.authService.userIsAuthenticated) {
        //   if (err instanceof HttpErrorResponse) {
        //     switch (err.status) {
        //       case 401:
        //         this.snackBar.open(`Не достаточно прав для выполнения операции`, undefined, { duration: 5000 });
        //         break;
        //       case 403:
        //         if (!result.is(CoreResultCodeEnum.tokenRequireReplacement)) {
        //           this.snackBar.open(`Доступ запрещен`, undefined, { duration: 5000 });
        //         }
        //         break;
        //       case 409:
        //         this.snackBar.open(`Запрос не был обработан, данные на сервере новее`, undefined, { duration: 5000 });
        //         break;
        //       case 422:
        //         this.snackBar.open(`Запрос не был обработан`, undefined, { duration: 5000 });
        //         break;
        //       case 500:
        //         this.snackBar.open(`Возникла ошибка в ходе обработки запроса на сервере`, undefined, { duration: 5000 });
        //         break;
        //       default:
        //         break;
        //     }
        //   }
        // }
        // return the error to the method that called it
        return throwError(err);
      })
    );
  }

}
