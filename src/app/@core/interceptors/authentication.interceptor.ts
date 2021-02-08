// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { AuthService } from '@core/service/auth.service';
import { AppConfigService } from '../service/app-config.service';
// Local modules

@Injectable({
    providedIn: 'root',
})
export class AuthenticationInterceptor implements HttpInterceptor {
    private authorizationHeader: string;

    constructor(private authService: AuthService, private appConfigService: AppConfigService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url[req.url.length - 1] === '/') {
            req = req.clone({
                url: req.url.slice(0, -1),
            });
        }

        req = req.clone({
            url: encodeURI(req.url),
        });

        if (!req.url.includes('/api')) {
            return next.handle(req);
        }

        if (!this.authorizationHeader) {
            this.authorizationHeader = this.appConfigService.authorizationHeader;
        }

        if (req.headers.get(this.authorizationHeader)) {
            return next.handle(req);
        }

        if (!this.authService.userSessionToken) {
            return next.handle(req);
        }

        if (req.url.includes('api/user-management/windows-current')) {
            return next.handle(req);
        }

        if (req.headers.has('AuthenticationType')) {
            const tempHeaderValue = req.headers.get('AuthenticationType');
            req = req.clone({
                headers: req.headers.delete('AuthenticationType'),
            });
            switch (tempHeaderValue) {
                case 'windows':
                    req = req.clone({
                        withCredentials: true,
                        headers: req.headers.append(
                            this.authorizationHeader,
                            `Bearer ${this.authService.userSessionToken}`
                        ),
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
            headers: req.headers.append(this.authorizationHeader, `Bearer ${this.authService.userSessionToken}`),
        });

        if (this.authService.keycloakToken) {
            req = req.clone({
                headers: req.headers.append('Authorization', `Bearer ${this.authService.keycloakToken}`),
            });
        }

        return next.handle(req);
    }
}
