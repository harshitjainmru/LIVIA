import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { START_BASE_PATH } from 'src/app/Constants/apiEndPoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http:HttpClient) { }
  getInsurance(){
    return this.http.get(`${environment.API_BASE_PATH + START_BASE_PATH}/lab-settings`)
  }
}
