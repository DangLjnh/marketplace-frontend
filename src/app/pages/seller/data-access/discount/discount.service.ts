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
  updateDiscountPercent(
    rawDiscountData: IDiscountPercent
  ): Observable<IResponse> {
    return this.http.put<IResponse>(
      `${environment.backendUrl}/discount/percent/update`,
      rawDiscountData
    );
  }
  createDiscountOption(
    rawDiscountData: IDiscountPercent
  ): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/discount-option/percent/create`,
      rawDiscountData
    );
  }
  readAllDiscountPercentOfShop({
    shopID,
    offset,
    limit,
  }: {
    shopID: number;
    offset: number;
    limit: number;
  }): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/discount/percent/read-all-shop?shopID=${shopID}&offset=${offset}&limit=${limit}`
    );
  }
  readSingleDiscountPercent(discountPercentID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/discount/percent/read-single/${discountPercentID}`
    );
  }
  constructor(private http: HttpClient) {}
}
