import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IResponse } from 'src/app/shared/model/interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  readAllCategoryFilterOfCategory(categoryID: number): Observable<IResponse> {
    return this.http.get<any>(
      `${environment.backendUrl}/category-filter/read/${categoryID}`
    );
  }

  readAllProductByCategoryFilter(
    categoryFilterID: number
  ): Observable<IResponse> {
    return this.http.get<any>(
      `${environment.backendUrl}/category-filter/product/${categoryFilterID}`
    );
  }
  constructor(private http: HttpClient) {}
}
