import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NAV_TO_LOGIN } from "src/app/Constants/commonRouters";
import { validation } from "src/app/Constants/formValidation";
import { ForgotService } from "src/app/services/forgotPassowrd/forgot.service";
import { SnackBarServiceService } from "src/app/services/SnackBarCommonService/snack-bar-service.service";
import { ConfirmedValidator } from "../CustomValidation/confirmPassword.validator";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  userInfo = { token: "", email: "" };
  resetForm!: FormGroup;
  hide = true;
  hide1 = true;
  disable_btn:boolean=false
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ForgotService,
    private nav: Router,
    private snackService:SnackBarServiceService
  ) {}

  ngOnInit(): void {
    this.getApiData();
    this.createForm();
  }
  createForm() {
    this.resetForm = this.fb.group({
      password: ["", [validation.INPUT_REQUIRED,validation.PASSWORD.PASSWORD_LENGTH]],
      cnfPassword: ["", [validation.INPUT_REQUIRED,validation.PASSWORD.PASSWORD_LENGTH]],
    },{
      validator: ConfirmedValidator('password', 'cnfPassword')
    }
    )
  }
  getApiData() {
    this.route.params.subscribe((event) => {
      this.userInfo.email = event.email;
      this.userInfo.token = event.token;
    });
    
    this.service.verifyToken(this.userInfo).subscribe(
      (res) => {
        console.log(res, "verify token response");
        if (res.code == 200 && res.status == 1) {
          console.log("success");
        } else {
          this.snackService.openSnackBar(res.messages)
          this.nav.navigate([NAV_TO_LOGIN]);
        }
      },
      (err) => {
        this.snackService.ErrorOpenSnackBar(err.error.messages)
        console.log(err, "Error from verify token!");
        this.nav.navigate([NAV_TO_LOGIN]);
      }
    );
  }
  click(){
    if(this.resetForm.controls.password.value != this.resetForm.controls.cnfPassword.value){
      this.snackService.ErrorOpenSnackBar('Password does not match!!')
      this.disable_btn=true 
      setTimeout(() => {
        this.disable_btn = false
        }, 3000);
    }
  }

  onSubmit() {
    this.click()
    if (
      this.resetForm.valid &&
      this.resetForm.controls.password.value ==
      this.resetForm.controls.cnfPassword.value)
       {
        const formValue = {
          token: this.userInfo.token,
          email: this.userInfo.email,
          password: this.resetForm.controls.password.value,
        };
        this.service.resetPassword(formValue).subscribe(
          (res) => {
            console.log(res, "btn-click");
            if (res.code == 200) {
              this.snackService.openSnackBar(res.messages)
              this.nav.navigate([NAV_TO_LOGIN]);
          } else {
            this.snackService.openSnackBar(res.messages);
          }
        },
        (err) => {
          console.log(err, "error occured!");
          this.snackService.ErrorOpenSnackBar(err.error.messages)
          this.nav.navigate([NAV_TO_LOGIN]);

        }
      );
    } 
  }
}
