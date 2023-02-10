import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOGIN_END_POINT } from 'src/app/Constants/apiEndPoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  constructor(private http:HttpClient) { }
  
  // forgot password
  resetdata(data:any):Observable<any>{
    return this.http.post(environment.API_BASE_PATH + LOGIN_END_POINT,data)
  }
  //patch api for forgot password
  verifyToken(data:any):Observable<any>{
    
    return this.http.patch(`${environment.API_BASE_PATH + LOGIN_END_POINT}?verify_token=1`,data);

  }
  //resetPassword Patch Api
  resetPassword(data:any):Observable<any>{
    return this.http.patch(environment.API_BASE_PATH + LOGIN_END_POINT, data)
  }
}
