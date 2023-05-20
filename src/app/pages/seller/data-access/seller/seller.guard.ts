import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SellerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (state.url.startsWith('/seller/portal/onboarding')) {
      return true; // Allow access to '/portal/onboarding' and its child routes
    }
    return this.authService.dataUser$.pipe(
      map((data) => {
        if (data?.Shop !== null) {
          return true;
        } else {
          this.router.navigate(['/seller/portal/onboarding']);
          return false;
        }
      })
    );
  }
}
