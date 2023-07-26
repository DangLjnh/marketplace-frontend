import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private _totalRevenueOfDay = new BehaviorSubject<any>(0);

  set totalRevenueOfDay(values: number) {
    this._totalRevenueOfDay.next(values);
  }
  get totalRevenueOfDay$(): Observable<number> {
    return this._totalRevenueOfDay.asObservable();
  }
  readAllOrderActiveOfShop({
    shopID,
    limit,
    offset,
  }: {
    shopID: number;
    limit: number;
    offset: number;
  }): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/order-shop/read-all?shopID=${shopID}&limit=${limit}&offset=${offset}`
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

  readRevenueOfProduct(rawDataOrder: {
    productID: number;
    productPriceOptionID: number;
  }): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/order-product/read-single`,
      rawDataOrder
    );
  }

  readQuantityOrder(rawDataOrder: {
    shopID: number;
    statusID: number;
  }): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/order/read-count-status?shopID=${rawDataOrder.shopID}&statusID=${rawDataOrder.statusID}`
    );
  }

  updateStatusOrder(rawDataOrder: any): Observable<IResponse> {
    return this.http.put<IResponse>(
      `${environment.backendUrl}/order/update/status`,
      rawDataOrder
    );
  }

  // bill

  createBill(rawBillData: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/bill/send-bill`,
      rawBillData
    );
  }

  readAllBill(rawBillData: any): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/bill/read-all?shopID=${rawBillData.shopID}&offset=${rawBillData.offset}&limit=${rawBillData.limit}`
    );
  }

  readRevenueByYear(rawData: { year: number; shopID: number }) {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/bill/read-revenue-year?shopID=${rawData.shopID}&year=${rawData.year}`
    );
  }

  readRevenueByMonth(rawData: { month: number; shopID: number }) {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/bill/read-revenue-month?shopID=${rawData.shopID}&month=${rawData.month}`
    );
  }

  readRevenueByDay(rawData: { shopID: number }) {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/bill/read-revenue-day?shopID=${rawData.shopID}`
    );
  }

  constructor(private http: HttpClient) {}
}
