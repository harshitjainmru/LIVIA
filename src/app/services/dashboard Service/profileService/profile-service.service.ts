import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PAYMENT_TEST_END_POINT, PROFILE_END_POINT } from 'src/app/Constants/apiEndPoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  
  constructor(private http:HttpClient) { }
  getData(){
    // let head = new HttpHeaders({
    //   'liviaapp-token':`${localStorage.getItem('access_token')}`
    // })
    return this.http.get(`${environment.API_BASE_PATH + PROFILE_END_POINT}`)
  }
}
