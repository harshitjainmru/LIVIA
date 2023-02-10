import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LAB_TEST_END_POINT, START_BASE_PATH } from 'src/app/Constants/apiEndPoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabTestService {
  // head:any
  constructor(private http:HttpClient) {
    // this.head = new HttpHeaders({
    //   'liviaapp-token':`${localStorage.getItem('access_token')}`
      
    // })
   }
   getTestData(queryObj:any){
     return this.http.get(`${environment.API_BASE_PATH +START_BASE_PATH}/lab-test`,{params:queryObj})
   }
  
}
