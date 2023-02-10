import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INITIATE_PAYMENT, PAYMENT_TEST_END_POINT, START_BASE_PATH } from 'src/app/Constants/apiEndPoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentIds:any
  // head:any
  constructor(private http:HttpClient) { 
    //  this.head=new HttpHeaders(
    //   {
    //     'liviaapp-token':`${localStorage.getItem('access_token')}`
    //   }
    // )
  }

  getPaymentList(queryObj:any): Observable<any> {
    return this.http.get(`${environment.API_BASE_PATH + START_BASE_PATH}/lab-payment`,{params:queryObj});
  }

  // Initiate Payment
  getData(claim_id:any): Observable<any> {
    return this.http.patch(`${environment.API_BASE_PATH + INITIATE_PAYMENT} `,claim_id)

  }
  setId(data:any){
    this.paymentIds = data
   
  }
  getId(){    
    return this.paymentIds;

  }


}
