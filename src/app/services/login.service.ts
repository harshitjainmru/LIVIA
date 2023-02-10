import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LOGIN_END_POINT, SIGNUP_END_POINT, START_BASE_PATH } from '../Constants/apiEndPoint';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userInfo:any
  user_id:any
  user_token:any;
  constructor(private http:HttpClient) { }
  // Login api
  // putData(value:any):Observable<any>{
  //   return this.http.put(environment.API_BASE_PATH + LOGIN_END_POINT,value)
  // }
  //patch data api
  patchData(data: any): Observable<any>{
    console.log(data,"query data from servicee");
    return this.http.patch(environment.API_BASE_PATH + SIGNUP_END_POINT,data);
  }
  // Signup api
  // postData(formValue:any):Observable<any> {
  //   return this.http.post(environment.API_BASE_PATH + SIGNUP_END_POINT,formValue)
  // }
  //Registration API Stepper 1 and Stepper 3
  putDta(value:any):Observable<any>{
    return this.http.put(`${environment.API_BASE_PATH + SIGNUP_END_POINT}?id=${this.user_id}`,value)
  }
  stepper3(value:any):Observable<any>{
    return this.http.put(`${environment.API_BASE_PATH + SIGNUP_END_POINT}?id=${this.user_id}`,value)
  }
  //Registration API Stepper 2
  putData2(value:any):Observable<any>{
    return this.http.put(`${environment.API_BASE_PATH + SIGNUP_END_POINT}?id=${this.user_id}`,value)
  }
  //county in Stepper1
  getCountry():Observable<any> {
    return this.http.get(`${environment.API_BASE_PATH + START_BASE_PATH}/city?limit=10&offset=0&search=&country_code=ke`)
  }
  //get data of user
  setUserData(userData: any) {
    this.userInfo = userData;
    this.user_id = userData.id;
    this.user_token = userData.token
  }
  getData(){
    return this.userInfo
  }
}




