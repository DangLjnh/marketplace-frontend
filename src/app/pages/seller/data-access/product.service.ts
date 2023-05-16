import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  createShop(rawProductData: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/product/create`,
      rawProductData
    );
  }
  constructor(private http: HttpClient) {}
}
