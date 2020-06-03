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
        }

        if (!this.authService.userSessionToken) {
            return next.handle(req);
        }

        if (req.url.includes('api/user-management/windows-current')) {
            return next.handle(req);
        }

        req = req.clone({
            url: encodeURI(req.url),
        });

        if (req.headers.has('AuthenticationType')) {
            const tempHeaderValue = req.headers.get('AuthenticationType');
            req = req.clone({
                headers: req.headers.delete('AuthenticationType')
            });
            switch (tempHeaderValue) {
                case 'windows':
                    req = req.clone({
                        withCredentials: true,
                    });
                    return next.handle(req);
            }
        }

        if (req.url.includes('api/Monitoring/')) {
            req = req.clone({
                withCredentials: true,
            });
            return next.handle(req);
        }

        req = req.clone({
            headers: req.headers.append(
                'Authorization',
                `Bearer ${this.authService.userSessionToken}`
            ),
        });

        return next.handle(req);
    }
}
