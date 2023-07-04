import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchProduct(keyword: string): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/product/search`,
      { name: keyword }
    );
  }

  constructor(private http: HttpClient) {}
}
