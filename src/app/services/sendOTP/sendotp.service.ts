import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { START_BASE_PATH } from 'src/app/Constants/apiEndPoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendotpService {
// head:any
  constructor(private http:HttpClient) {
  //   this.head=new HttpHeaders(
  //     {
  //       'liviaapp-token':`${localStorage.getItem('access_token')}`
  //     }
  //   )
   }
   getOTP(queryObj:any, claimId:any): Observable<any>{
    return this.http.put(`${environment.API_BASE_PATH + START_BASE_PATH}/lab-request/${claimId}`,queryObj);
    
   }
   //Verify OTP 
   verifyOtp(queryObj:any,claimId:any){
     return this.http.patch(`${environment.API_BASE_PATH + START_BASE_PATH}/lab-request/${claimId}`,queryObj)

   }
}
