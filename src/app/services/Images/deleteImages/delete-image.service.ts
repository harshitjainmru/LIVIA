import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { START_BASE_PATH } from 'src/app/Constants/apiEndPoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteImageService {

  constructor(private http:HttpClient) { }
  deleteImage(data: any): Observable<any> {
    const head = {
      headers: new HttpHeaders({
        'liviaapp-token':`${localStorage.getItem('access_token')}`,
      }),
      body: {
        'image':data
      },
    };
    return this.http.delete(`${environment.API_BASE_PATH + START_BASE_PATH}/image`, head);
  }
}
