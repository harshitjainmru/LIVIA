import {  Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { validation } from 'src/app/Constants/formValidation';
import { ForgotService } from 'src/app/services/forgotPassowrd/forgot.service';
import { SnackBarServiceService } from 'src/app/services/SnackBarCommonService/snack-bar-service.service';
import { DialogData } from '../../account/onboarding/login/login.component';
import { LoginComponent } from '../../account/onboarding/login/login.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  spinner:boolean=false
  resetForm!:FormGroup
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _fb:FormBuilder,
    private service:ForgotService,
    private _snackBar:MatSnackBar,
    private router:Router,
    private snackService:SnackBarServiceService
  ) {}



  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.resetForm = this._fb.group({
      email:['',[validation.INPUT_REQUIRED,validation.EMAIL.EMAIL_PATTERN,validation.EMAIL.EMAIL_email]],

    })
  }
  openSnackBar(message:any){
    this._snackBar.open(message,'',{
      duration:2000,
      panelClass:'snackBar',
      verticalPosition:'top',
      horizontalPosition:'center'
    })

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit(){
    const value = this.resetForm.value;
    // value ["server_path"]='http://localhost:4200/';
    value ["server_path"]=location.origin + '/';
    if(this.resetForm.valid){
     this.spinner=true
      this.service.resetdata(value).subscribe((res)=>{
        if(res.code == 200){
          this.spinner=true
          this.snackService.openSnackBar(res.messages)
        }
        console.log('hiii welcome to the aabra ka daabra')
      },err=>{
        this.openSnackBar(err.error.messages)
      })
      console.log('hi welcome to the reset password field');

    }
  }
}

