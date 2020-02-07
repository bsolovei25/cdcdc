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
} from '@angular/router';
import { AuthService } from '@core/service/auth.service';
// Local modules

@Injectable({
    providedIn: 'root', // singleton service
})
export class AuthenticationGuard
    implements CanLoad, CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {}

    private async authenticationCheck(
        route: Route | ActivatedRouteSnapshot,
        backAddress?: string,
        allow403?: boolean
    ): Promise<boolean> {
        try {
            const auth = await this.authService.getUserAuth();
            if (auth) {
                return true;
            }
        } catch (error) {
            return false;
        }
        return false;
    }

    async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
        return this.authenticationCheck(route, segments.join('/'), true);
    }

    async canActivate(
        route: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot
    ): Promise<boolean | UrlTree> {
        return true;
    }

    async canActivateChild(
        route: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot
    ): Promise<boolean | UrlTree> {
        return true;
    }
}
