import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ILogin,
  IRegister,
  IResponse,
  IResponseToken,
  IUser,
} from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _dataUser = new BehaviorSubject<any>(null);
  set dataUser(value: IUser) {
    this._dataUser.next(value);
  }
  get dataUser$(): Observable<IUser> {
    return this._dataUser.asObservable();
  }

  registerUser(rawUserData: IRegister): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/auth/register`,
      rawUserData
    );
  }

  loginUser(rawUserData: ILogin): Observable<IResponseToken> {
    return this.http.post<IResponseToken>(
      `${environment.backendUrl}/auth/login`,
      rawUserData
    );
  }

  accountUser(): Observable<IUser> {
    return this.http.get<IUser>(`${environment.backendUrl}/auth/account`);
  }

  verifyToken(refreshToken: string | null): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/auth/verify-token`,
      { refresh_token: refreshToken }
    );
  }

  constructor(private http: HttpClient) {}
}
