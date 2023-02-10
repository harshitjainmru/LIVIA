import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NAV_TO_VALIDATION } from "src/app/Constants/commonRouters";
import { DeleteImageService } from "src/app/services/Images/deleteImages/delete-image.service";
import { UploadImageService } from "src/app/services/Images/upload-image.service";
import { LoginService } from "src/app/services/login.service";
import { RegisterFormService } from "src/app/services/register-form.service";
import { SnackBarServiceService } from "src/app/services/SnackBarCommonService/snack-bar-service.service";

@Component({
  selector: "app-add-lab-pic",
  templateUrl: "./add-lab-pic.component.html",
  styleUrls: ["./add-lab-pic.component.scss"],
})
export class AddLabPicComponent implements OnInit {
  images: string[] = [];
  imageSrc = "";
  payLoadData: string[] = [];
  spinner = false;
  disable_btn: any;

  constructor(
    public service: RegisterFormService,
    private _route: Router,
    private apiService: LoginService,
    private uploadService: UploadImageService,
    private removeService: DeleteImageService,
    private snackService: SnackBarServiceService
  ) {}

  ngOnInit(): void {}
  get labPicture() {
    return this.service.registrationForm.controls.labPic;
  }

  onFileChange(event: any) {
    var file = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];

    if (file) {
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        this.snackService.ErrorOpenSnackBar("invalid format");
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }
  _handleReaderLoaded(e: any) {
    this.spinner = true;
    let reader = e.target;
    this.imageSrc = reader.result.substr(reader.result.indexOf(",") + 1);

    let payLoad = {
      image: this.imageSrc,
      type: "labs",
    };
    this.uploadService.imagedoc(payLoad).subscribe(
      (res: any) => {
        this.images.push(e.target.result);

        this.payLoadData.push(res.image);

        this.labPicture?.get("images")?.patchValue({
          images: this.payLoadData,
        });
        this.spinner = false;
      },
      (err) => {
        console.log(err, "Error from image service!");
      }
    );
  }
  snack() {
    if (this.images.length > 4)
      this.snackService.ErrorOpenSnackBar("Cannot upload more than 5 images");
  }
  deleteImg(idx: any) {
    console.log(this.payLoadData[idx]);
    this.removeService.deleteImage(this.payLoadData[idx]).subscribe(
      (res) => {
        console.log(res, "delete image");
      },
      (err) => {
        console.log(err, "err in delete img!");
      }
    );
    this.images.splice(idx, 1);
    this.payLoadData.splice(idx, 1);
    this.labPicture.patchValue({
      lab_photo: this.payLoadData,
    });
  }
  onSubmit() {
    if (this.labPicture.valid && this.payLoadData.length>0) {
      const formValue = this.labPicture.value;
      formValue["images"] = this.payLoadData;
      formValue["steps"] = 4;
      this.apiService.stepper3(formValue).subscribe(
        (res) => {
          this.snackService.openSnackBar(res.message);
          console.log("hiiiiiiiiii", res.message);
          this._route.navigate([NAV_TO_VALIDATION]);
        },
        (err) => {
          this.snackService.ErrorOpenSnackBar(err.error.messages[0]);
        }
      );
      console.log(this.labPicture);
    }
  }
}
