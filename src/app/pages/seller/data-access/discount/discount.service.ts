import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDiscountPercent, IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  createDiscount(rawDiscountData: IDiscountPercent): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/discount/percent/create`,
      rawDiscountData
    );
  }
  createDiscountOption(rawDiscountData: IDiscountPercent): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/discount-option/percent/create`,
      rawDiscountData
    );
  }
  constructor(private http: HttpClient) {}
}
