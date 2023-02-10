import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BALANCE_END_POINT, START_BASE_PATH } from 'src/app/Constants/apiEndPoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabRequestService {
  // head:any
  constructor(private http:HttpClient) { 
    //  this.head=new HttpHeaders(
    //   {
    //     'liviaapp-token':`${localStorage.getItem('access_token')}`
    //   }
    // )
  }

  getLabRequest(queryObj: any): Observable<any> {
    return this.http.get(`${environment.API_BASE_PATH + START_BASE_PATH}/lab-request`,{params:queryObj});
  }
  rejectRequest(claim_id:any):Observable<any>{
    return this.http.delete(`${environment.API_BASE_PATH + START_BASE_PATH}/lab-request/${claim_id}`);
  }
  DateFilter(stDate:any,enDate:any): Observable<any> {
    // let head=new HttpHeaders(
    //   {
    //     'liviaapp-token':`${localStorage.getItem('access_token')}`
    //   }
    // )
    // return this.http.get(`${environment.API_BASE_PATH + START_BASE_PATH}/lab-request?offset=0&limit=10&search=1&claim_start_date=${stDate}&claim_end_date=${enDate}`);
    return this.http.get(`${environment.API_BASE_PATH + START_BASE_PATH}/lab-request`);
  }

  // get balance service
  getUserBalance(id:any): Observable<any> {
    return this.http.get(`${environment.API_BASE_PATH + BALANCE_END_POINT}/${id}`);
  }
}
