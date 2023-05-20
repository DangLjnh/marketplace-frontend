import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface CheckDeactivate {
  checkDeactivate(
    currentRoute: ActivatedRouteSnapshot,
    currentRate: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean>;
}
