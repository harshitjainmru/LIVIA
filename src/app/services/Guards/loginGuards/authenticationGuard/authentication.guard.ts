import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private _router:Router){}
  // tok :any
  canActivate(
    _router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):any {
      console.log('AuthenticationGuard');
      
      if(localStorage.getItem('tok')=='true'){

        return true
      }
      else{
        this._router.navigate(['/login'])
      }
      
}
}
