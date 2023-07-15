import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  createShop(rawShopData: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/shop/create`,
      rawShopData
    );
  }
  updateShop(rawShopData: any): Observable<IResponse> {
    return this.http.put<IResponse>(
      `${environment.backendUrl}/shop/update`,
      rawShopData
    );
  }
  constructor(private http: HttpClient) {}
}
