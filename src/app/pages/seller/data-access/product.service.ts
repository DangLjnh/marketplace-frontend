import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  createProduct(rawProductData: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/product/create`,
      rawProductData
    );
  }

  createProductTypeOption(rawProductData: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/product-type-option/create`,
      rawProductData
    );
  }

  readAllProductOfShop(shopID: number | undefined): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/product/read-all/${shopID}`
    );
  }

  readSingleProduct(productID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/product/read-single/${productID}`
    );
  }

  updateProduct(rawProductData: any): Observable<IResponse> {
    return this.http.put<IResponse>(
      `${environment.backendUrl}/product/update`,
      rawProductData
    );
  }
  constructor(private http: HttpClient) {}
}
