import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { retry } from "rxjs/operators";
import { AlertPopUpComponent } from "src/app/components/alert-pop-up/alert-pop-up.component";
import { DeleteImageService } from "src/app/services/Images/deleteImages/delete-image.service";
import { UploadImageService } from "src/app/services/Images/upload-image.service";
import { LoginService } from "src/app/services/login.service";
import { RegisterFormService } from "src/app/services/register-form.service";
import { SnackBarServiceService } from "src/app/services/SnackBarCommonService/snack-bar-service.service";

@Component({
  selector: "app-add-doc",
  templateUrl: "./add-doc.component.html",
  styleUrls: ["./add-doc.component.scss"],
})
export class AddDocComponent implements OnInit {
  showErr = false;
  spinner = false;
  formControlName = "";
  imageSrc = "";
  uploadSpin = false;
  message: any;
  //   fileNames: {
  //     tax_compliance: String;
  //     cr_12: String;
  //     kra_pin_certificate: String;
  //     regulator_licenses_1: String;
  //     regulator_licenses_2: String;
  //     regulator_licenses_3: String;
  //   } = {
  //     tax_compliance: '',
  //     cr_12: '',
  //     kra_pin_certificate: '',
  //     regulator_licenses_1: '',
  //     regulator_licenses_2: '',
  //     regulator_licenses_3: '',
  //   };
  //   spinner = false;
  constructor(
    public service: RegisterFormService,
    private apiService: LoginService,
    private uploadService: UploadImageService,
    private snackService: SnackBarServiceService,
    private removeService: DeleteImageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  get addDoc() {
    return this.service.registrationForm.controls.document;
  }

  onChange(event: any, name: string) {
    console.log(event, "pppppppppppppppp");
    this.formControlName = name;
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
    this.uploadSpin = true;
    let reader = e.target;
    this.imageSrc = reader.result.substr(reader.result.indexOf(",") + 1);
    // console.log(this.imageSrc, 'imagggggggggggggggggggggggggggggg!!');
    let payLoad = {
      image: this.imageSrc,
      type: "labs",
    };
    this.uploadService.imagedoc(payLoad).subscribe(
      (res: any) => {
        console.log(res.image, "response from image service!");
        this.addDoc.get(this.formControlName)?.setValue(res.image);
        this.uploadSpin = false;
      },
      (err) => {
        console.log(err, "Error from image service!");
        this.uploadSpin = false;
      }
    );
  }
  deleteImg(file: any) {
    const dialogRef = this.dialog.open(AlertPopUpComponent, {
      width: "390px",
      disableClose: true,
      data: this.message,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formValue = {
          image: [this.addDoc.get(file)?.value],
        };
        this.removeService.deleteImage(formValue).subscribe(
          (res: any) => {
            console.log(res, "delete");

            this.addDoc.get(file)?.reset();
            console.log(this.addDoc.get(file)?.reset(), "deletedelte");
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
  onSubmit() {
    const formValue = this.addDoc.value;
    formValue["steps"] = 3;
    if (this.addDoc.valid) {
      this.spinner = true;
      this.apiService.putData2(formValue).subscribe(
        (res) => {
          this.snackService.openSnackBar(res.message);
          this.spinner = false;
          console.log("hiiiiiiiiii", res.message);
        },
        (err) => {
          this.snackService.ErrorOpenSnackBar(err.error.messages[0]);
          this.spinner = false;
        }
      );
      console.log("hiiiiiiiiiii", this.addDoc);
    }
  }
}
