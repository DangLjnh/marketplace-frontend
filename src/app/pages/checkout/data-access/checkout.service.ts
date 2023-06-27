import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private _listDataOrder = new BehaviorSubject<any>([]);
  choosePayment: string = '';

  set listDataOrder(values: any[]) {
    this._listDataOrder.next(values);
  }

  get listDataOrder$(): Observable<any[]> {
    return this._listDataOrder.asObservable();
  }

  createOrder(rawOrderData: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/order/create`,
      rawOrderData
    );
  }

  readAllOrderOfUser(userID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/order-account/read-all/${userID}`
    );
  }

  createPayMomo(rawOrderData: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/pay/create/momo`,
      rawOrderData
    );
  }

  constructor(private http: HttpClient) {}
}
