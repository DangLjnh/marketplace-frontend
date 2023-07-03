import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readSingleProduct(productID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/product/read-single/${productID}`
    );
  }
  searchSameProduct(name: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendCrawlUrl}/product/search`,
      name
    );
  }
  constructor(private http: HttpClient) {}
}
