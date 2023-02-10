import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CLAIM_END_POINT, LAB_REPORT_END_POINT, START_BASE_PATH } from 'src/app/Constants/apiEndPoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClaimServiceService {
// head:any
  constructor(private http:HttpClient) {
    // this.head = new HttpHeaders({
    //   'liviaapp-token':`${localStorage.getItem('access_token')}`
    // })
   }
  getClaim(queryObj:any): Observable<any> {
   
    return this.http.get(`${environment.API_BASE_PATH + START_BASE_PATH}/lab-claim`,
    {params:queryObj});
    // headers:this.head,
  }

}
