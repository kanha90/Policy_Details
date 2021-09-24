import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PolicyServiceService {
  constructor(private http: HttpClient) {}

  getAllpolicy(): Observable<any> {
    return this.http.get(`${environment.url}`);
  }

  getPolicyByPolicyId(id: string): Observable<any> {


    return this.http.get(`${environment.url}/${id}`);
  }

  getPolicyByCustomerId(id: string): Observable<any> {


    return this.http.get(`${environment.url}/customers/${id}`);
  }

  updatePolicyByPolicyId(payload: any): Observable<any> {


    return this.http.patch(`${environment.url}/${payload.Policy_id}`, payload);
  }
}
