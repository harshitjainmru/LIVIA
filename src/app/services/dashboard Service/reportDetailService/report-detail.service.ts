import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  SEND_LAB_REPORT,  VERIFY_OTP } from 'src/app/Constants/apiEndPoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportDetailService {
  claimId:any
  // Header:any
  constructor(private http:HttpClient) { 
    // this.Header  = new HttpHeaders({
    //   "liviaapp-token" : `${localStorage.getItem('access_token')}`
    // })
  }
  // setClaimId(data:any){
  //   this.claimId = data
  // }
  send_lab_report(claim_id:any,data:any){
    // let Header = new HttpHeaders({
    //   "liviaapp-token" : `${localStorage.getItem('access_token')}`
    // })
    return this.http.put(environment.API_BASE_PATH + SEND_LAB_REPORT + `/${claim_id}`,data);   

  }
  verify_otp(claim_id:any,data:any){
    return this.http.patch(`${environment.API_BASE_PATH + VERIFY_OTP}/${claim_id}`,data);
  }
  setEmail(data:any){

    return this.http.post(environment.API_BASE_PATH + SEND_LAB_REPORT ,data);

  }
  report_Detail(claim_id:any){
  
    return this.http.get(environment.API_BASE_PATH + SEND_LAB_REPORT + `/${claim_id}`);   

  }
  saveDetail(requestId:any,data:any){
   return this.http.put(`${environment.API_BASE_PATH + SEND_LAB_REPORT}/${requestId}`,data)

  }
 
}
