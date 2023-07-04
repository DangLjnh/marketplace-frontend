import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  readAllCategory(): Observable<IResponse> {
    return this.http.get<IResponse>(`${environment.backendUrl}/category/read`);
  }

  constructor(private http: HttpClient) {}
}
