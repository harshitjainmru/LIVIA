import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { SIGNUP_END_POINT } from 'src/app/Constants/apiEndPoint';
import { NAV_TO_LOGIN } from 'src/app/Constants/commonRouters';
import { HttpMethodService } from 'src/app/services/httpMethod/http-method.service';
import { LoginService } from 'src/app/services/login.service';
import { RegisterFormService } from 'src/app/services/register-form.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {



  constructor(
    private Service: RegisterFormService,
    private route: ActivatedRoute,
    public service: LoginService,
    private nav:Router,
    private _service:HttpMethodService
  ) {}
  ngOnInit(): void {
    this.patchDataApiCall();
    this.Service.createForm()
  }
  goBack(stepper: MatStepper){
    stepper.previous();
}


  patchDataApiCall() {
    let token;
    this.route.params.subscribe((event) => {
      token = event.data;
      console.log(token, 'query data');
    });
    let phoneId = localStorage.getItem('phone_id');
    const paramData = {
      access_token: token,
      os_type: 3,
      phone_id: phoneId,
    };
    this._service.patchData(environment.API_BASE_PATH + SIGNUP_END_POINT,paramData).subscribe(
      (res:any) => {
        console.log(res, 'response from api data!');
        if (res.user_status == '1' || res.user_status == '6') {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
          this.service.setUserData(res.user);
        } else {
          this.nav.navigate([NAV_TO_LOGIN])
        }
      },
      (err) => {
        console.log(err, 'error from patch api');
        this.nav.navigate([NAV_TO_LOGIN])
      }
    );
  }

}
