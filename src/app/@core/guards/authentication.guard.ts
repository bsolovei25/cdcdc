// Angular
import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, UrlSegment, UrlTree, Navigation } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
// Local modules

@Injectable({
  providedIn: 'root' // singleton service
})
export class AuthenticationGuard implements CanLoad, CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private async authenticationAndPermissionCheck(route: Route | ActivatedRouteSnapshot, backAddress?: string, allow403?: boolean): Promise<boolean> {
    console.log('зашел');
    
   
    return true;
  }

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    console.log('CanLoad');
    
    // console.log(`%cAuthenticateAndPermissionGuard.canLoad: ${route.loadChildren}`, 'background-color: #dfffd6; color: #000000;');
    return this.authenticationAndPermissionCheck(route, segments.join('/'), true);
  }

  async canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Promise<boolean | UrlTree> {
    // console.log(`%cAuthenticateAndPermissionGuard.canActivate: ${routerState.url}`, 'background-color: #dfffd6; color: #000000;');
    return this.authenticationAndPermissionCheck(route, routerState.url);
  }

  async canActivateChild(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Promise<boolean | UrlTree> {
    // console.log(`%cAuthenticateAndPermissionGuard.canActivateChild: ${route.component ? (route.component as any).name : undefined} ${routerState.url}`, 'background-color: #dfffd6; color: #000000;');
    return this.authenticationAndPermissionCheck(route, routerState.url);
  }

}
