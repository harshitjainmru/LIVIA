import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private _router:Router){}
  // tok :any
  canActivate(  _router: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
    console.log('LoginGuard');

      if (localStorage.getItem('tok')) {
        const tree: UrlTree = this._router.parseUrl('/imagingRequest');
        console.log('parselogin');
        return tree;

      } else {
        return true
        
       
      }
      
}
  
}
