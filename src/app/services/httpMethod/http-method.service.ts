import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpMethodService {

  constructor(private http:HttpClient) { }
  getData(url:any,data:any){
   return this.http.get(url,data);
  }
  putData(url:any,data:any){
    return this.http.put(url,data)
  }
  patchData(url:any,data:any){
    return this.http.patch(url,data)
  }
  postData(url:any,data:any){
    return this.http.post(url,data)
  }

}
