import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor,HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
 
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private http:HttpClient) {
    }
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError((err: any) => {
          console.log(err);
          if (err.status === 401) {
            if (err.error.message == 'unauthorized') {
              let payLoad = {
                refreshToken: localStorage.getItem('refresh_token'),
                accessToken: localStorage.getItem('access_token'),
              };
              return this.http.post('url', payLoad).pipe(
                mergeMap((data: any) => {
                  if (data.status == 200) {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('refresh_token', data.refresh_token);
                  }
                  req = req.clone({
                    headers: req.headers
                      .set(
                        'liviaapp-token',
                        `${localStorage.getItem('access_token')}`
                      )
                      .set('liviaapp-apiversion', '2.0'),
                  });
                  return Observable.throw("hi");
                })
              );
            } else {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              //Logout from account or do some other stuff
            }
          }
          return Observable.throw(err);
        })
      );
    }
  }
  