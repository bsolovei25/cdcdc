// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { AuthService } from '@core/service/auth.service';
// Local modules

@Injectable({
    providedIn: 'root',
})
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('Authorization')) {
            return next.handle(req);
        } else {
            const authReq = req.clone({
                headers: req.headers.append(
                    'Authorization',
                    `Bearer ` + this.authService.userSessionToken
                ),
            });
            return next.handle(authReq);
        }
    }
}
