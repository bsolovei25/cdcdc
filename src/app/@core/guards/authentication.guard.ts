// Angular
import { Injectable } from '@angular/core';
import {
    CanLoad,
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    Route,
    UrlSegment,
    UrlTree,
    Navigation,
    ActivatedRoute,
} from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { Observable } from 'rxjs';
// Local modules

@Injectable({
    providedIn: 'root', // singleton service
})
export class AuthenticationGuard implements CanLoad, CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private route: ActivatedRoute) {}

    private async authenticationCheck(
        route: Route | ActivatedRouteSnapshot,
        backAddress?: string,
        allow403?: boolean
    ): Promise<boolean> {
        try {
            const auth = await this.authService.getUserAuth();
            return !!auth;
        } catch (error) {
            return false;
        }
    }

    async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
        return this.authenticationCheck(route, segments.join('/'), true);
    }

    async canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Promise<boolean | UrlTree> {
        if (Object.keys(route?.queryParams)?.length > 0) {
            localStorage.setItem('queryParams', JSON.stringify(route.queryParams));
        }
        return this.authenticationCheck(route, null, true);
    }

    async canActivateChild(
        route: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot
    ): Promise<boolean | UrlTree> {
        return true;
    }
}
