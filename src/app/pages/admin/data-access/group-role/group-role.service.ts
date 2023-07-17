import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IResponse } from 'src/app/shared/model/interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class GroupRoleService {
  readAllGroup(): Observable<IResponse> {
    return this.http.get<IResponse>(`${environment.backendUrl}/group/read-all`);
  }

  createGroup(rawGroupData: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/group/create`,
      rawGroupData
    );
  }

  updateGroup(rawGroupData: any): Observable<IResponse> {
    return this.http.put<IResponse>(
      `${environment.backendUrl}/group/update`,
      rawGroupData
    );
  }

  readSingleGroup(groupID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/group/read-single/${groupID}`
    );
  }

  //   router.get("/group/read-all", groupController.readAllGroup);
  // router.post("/group/create", groupController.createGroup);
  // router.put("/group/update", groupController.updateGroup);
  // router.delete("/group/delete", groupController.deleteGroup);

  readAllRole(): Observable<IResponse> {
    return this.http.get<IResponse>(`${environment.backendUrl}/role/read-all`);
  }
  constructor(private http: HttpClient) {}
}
