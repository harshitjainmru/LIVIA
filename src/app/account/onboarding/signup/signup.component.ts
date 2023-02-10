import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup} from "@angular/forms";
import { Router } from "@angular/router";
import { SIGNUP_END_POINT } from "src/app/Constants/apiEndPoint";
import { NAV_TO_LOGIN } from "src/app/Constants/commonRouters";
import { validation } from "src/app/Constants/formValidation";
import { HttpMethodService } from "src/app/services/httpMethod/http-method.service";
import { SnackBarServiceService } from "src/app/services/SnackBarCommonService/snack-bar-service.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  signForm!: FormGroup;
  spinner = false;
  hide: boolean = true;
  disable_btn: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private serviceSnack: SnackBarServiceService,
    private _service: HttpMethodService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.signForm = this.fb.group({
      name_prefix:["",[validation.INPUT_REQUIRED]],
      first_name: [
        "",
        [
          validation.INPUT_REQUIRED, validation.NAME.NAME_LENGTH, validation.NAME.NAME_PATTERN
        ],
      ],
      last_name: [
        "",
        [
          validation.INPUT_REQUIRED, validation.NAME.NAME_LENGTH, validation.NAME.NAME_PATTERN

        ],
      ],
      country_code: ["", [validation.INPUT_REQUIRED]],
      phone_number: [
        "",
        [validation.INPUT_REQUIRED,validation.PHONE_NO],
      ],
   
      email: [
        "",
        [
         validation.INPUT_REQUIRED,validation.EMAIL.EMAIL_PATTERN,validation.EMAIL.EMAIL_email
        ],
      ],
     
      password: [
        "",
        [
        validation.INPUT_REQUIRED, validation.PASSWORD.PASSWORD_LENGTH,validation.PASSWORD.PASSWORD_PATTERN
        ],
      ],
      // ,Validators.pattern( "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,}$"
    });
  }
  onSubmit() {
    const formValue = this.signForm.value;
    (formValue["os_type"] = 3),
      (formValue["phone_code"] = 254),
      (formValue["phone_id"] = btoa(this.signForm.controls.phone_number.value)),
      (formValue["server_path"] = "http://localhost:4200/");
    localStorage.setItem("phone_id", formValue.phone_id);
    if (this.signForm.valid) {
      this.spinner = true;
      this._service
        .postData(environment.API_BASE_PATH + SIGNUP_END_POINT, formValue)
        .subscribe(
          (res: any) => {
            console.log(res, "hiiiiiiiiiiiiii");
            if (res.code == 200) {
              console.log("success", res);
              console.log("hiiiiiii", this.signForm.value);
              this.serviceSnack.openSnackBar(
                "Congratulation's 🎉, Verification link has been sent to your email"
              );
              this._route.navigate([NAV_TO_LOGIN]);
              this.spinner = false;
            } else {
              this.serviceSnack.openSnackBar(res.message);
              this.spinner = false;
              this.disable_btn = true;
              setTimeout(() => {
                this.disable_btn = false;
              }, 5000);
            }
          },
          (err) => {
            this.serviceSnack.ErrorOpenSnackBar(err.error.messages[0]);
            this.spinner = false;
          }
        );
    }
  }
}
