import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  readAllOrderActiveOfShop(shopID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/order-shop/read-all/${shopID}`
    );
  }

  readAllOrderWithStatusOfShop({
    shopID,
    offset,
    limit,
    statusID,
  }: {
    shopID: number | undefined;
    statusID: number;
    offset: number;
    limit: number;
  }): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/order-shop/read-all-status?shopID=${shopID}&statusID=${statusID}&offset=${offset}&limit=${limit}`
    );
  }

  readSingleOrderDetail(orderID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/order/read-single/${orderID}`
    );
  }

  updateStatusOrder(rawDataOrder: any): Observable<IResponse> {
    return this.http.put<IResponse>(
      `${environment.backendUrl}/order/update/status`,
      rawDataOrder
    );
  }
  constructor(private http: HttpClient) {}
}
