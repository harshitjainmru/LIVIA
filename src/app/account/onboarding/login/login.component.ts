import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LOGIN_END_POINT } from 'src/app/Constants/apiEndPoint';
import { NAV_TO_LAB_REQUEST } from 'src/app/Constants/commonRouters';
import { validation } from 'src/app/Constants/formValidation';
import { HttpMethodService } from 'src/app/services/httpMethod/http-method.service';
import { SnackBarServiceService } from 'src/app/services/SnackBarCommonService/snack-bar-service.service';
import { environment } from 'src/environments/environment';
import { ResetPasswordComponent } from '../../../components/reset-password/reset-password.component';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  spinner=false;
  animal: any;
  name: any;
  verify:any
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    public dialog: MatDialog,
    private snackService:SnackBarServiceService,
    private _service:HttpMethodService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          validation.INPUT_REQUIRED,validation.EMAIL.EMAIL_PATTERN,validation.EMAIL.EMAIL_email
        ],
      ],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [validation.INPUT_REQUIRED,validation.PASSWORD.PASSWORD_LENGTH,validation.PASSWORD.PASSWORD_PATTERN]],
      phone_id: [''],
      os_type: [''],
    });
  }

  navigateToDashboard() {
    if (this.loginForm.valid) {
      this._route.navigate([NAV_TO_LAB_REQUEST]);
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '500px',
      disableClose:true,
      data: {name: this.name, animal: this.animal},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
 
  onSubmit() {
    const formvalue = this.loginForm.value;
    (formvalue['os_type'] = 3),
      (formvalue['phone_id'] = btoa(this.loginForm.controls.email.value + 'harshithjtf'));

    if (this.loginForm.valid) {
      this.spinner = true;
      this._service.putData(environment.API_BASE_PATH + LOGIN_END_POINT,formvalue).subscribe(
        (res:any) => {
          if(res.user_status=='1'){
            this.snackService.openSnackBar('login Successful')
            localStorage.setItem('tok','true')
            localStorage.setItem('access_token',res.access_token);
            localStorage.setItem('refresh_token',res.refresh_token)
            localStorage.setItem('phone_id',formvalue['phone_id'])
            console.log(res,'harsh');
            this._route.navigate([NAV_TO_LAB_REQUEST])
          }
           if(res.user_status=='6'){
          this.snackService.openSnackBar(res.user.status_name)
          this.spinner = false
          
          }
          else{
            this.spinner=false
          }
        }
        ,
        (err) => {
          this.snackService.ErrorOpenSnackBar(err.error.messages);
          this.spinner =false
          this.loginForm.reset()

        }
      );
    }

  }

}

