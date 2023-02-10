import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LAB_REPORT_END_POINT, START_BASE_PATH } from 'src/app/Constants/apiEndPoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabReportsService {

  // head:any
  constructor(private http:HttpClient) { 
    //  this.head=new HttpHeaders(
    //   {
    //     'liviaapp-token':`${localStorage.getItem('access_token')}`
    //   }
    // )
  }

  getLabReport(queryObj: any): Observable<any> {
    return this.http.get(`${environment.API_BASE_PATH + START_BASE_PATH}/lab-report`,
    {params:queryObj});
  }
  DateFilter(stDate:any,enDate:any): Observable<any> {
    // let head=new HttpHeaders(
    //   {
    //     'liviaapp-token':`${localStorage.getItem('access_token')}`
    //   }
    // )
    return this.http.get(`${environment.API_BASE_PATH + START_BASE_PATH}/lab-report`);
  }
}
