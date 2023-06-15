import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _categoryFilter = new BehaviorSubject<number>(0);
  set categoryFilter(categoryFilterID: number) {
    this._categoryFilter.next(categoryFilterID);
  }
  get categoryFilter$(): Observable<number> {
    return this._categoryFilter.asObservable();
  }
  readAllCategory(): Observable<IResponse> {
    return this.http.get<IResponse>(`${environment.backendUrl}/category/read`);
  }
  readSingleCategoryFilter(categoryFilterID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/category-filter/read-single/${categoryFilterID}`
    );
  }
  readAllCategoryFilterByCategory(categoryID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/category-filter/read/${categoryID}`
    );
  }
  constructor(private http: HttpClient) {}
}
