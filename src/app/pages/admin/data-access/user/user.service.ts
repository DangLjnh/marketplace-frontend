import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _listUser = new BehaviorSubject<any>([]);

  set listUser(value: any) {
    this._listUser.next(value);
  }
  get listUser$(): Observable<any> {
    return this._listUser.asObservable();
  }

  banUser(userID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/user/ban/${userID}`
    );
  }
  readAllUser({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/user/read-all?offset=${offset}&limit=${limit}`
    );
  }
  readSingleUser(userID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/user/read-single/${userID}`
    );
  }
  updateGroupUser(rawUserData: {
    userID: number;
    groupID: number;
  }): Observable<IResponse> {
    return this.http.put<IResponse>(
      `${environment.backendUrl}/user/update-group`,
      rawUserData
    );
  }
  constructor(private http: HttpClient) {}
}
