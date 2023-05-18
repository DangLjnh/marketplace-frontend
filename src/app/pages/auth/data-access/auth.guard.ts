import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { CheckDeactivate } from 'src/app/shared/model/CheckDeactivate';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanDeactivate<CheckDeactivate> {
  constructor(private authService: AuthService, private router: Router) {}
  canDeactivate(
    component: CheckDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot | undefined
  ): Observable<boolean> {
    return component.checkDeactivate(currentRoute, currentState, nextState);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // let isLogin = this.authService.dataUser$.subscribe((data) => {});
    // if (isLogin) {
    //   this.router.navigate(['home']);
    //   return false;
    // } else {
    //   return true;
    // }
    return this.authService.dataUser$.pipe(
      map((user) => {
        if (user) {
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
