import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddressPopUpComponent } from 'src/app/components/address-pop-up/address-pop-up.component';
import { NAV_TO_LAB_REQUEST, NAV_TO_PROFILE } from 'src/app/Constants/commonRouters';
import { validation } from 'src/app/Constants/formValidation';
import { ProfileServiceService } from 'src/app/services/dashboard Service/profileService/profile-service.service';
import { DeleteImageService } from 'src/app/services/Images/deleteImages/delete-image.service';
import { UploadImageService } from 'src/app/services/Images/upload-image.service';
import { LoginService } from 'src/app/services/login.service';
import { SnackBarServiceService } from 'src/app/services/SnackBarCommonService/snack-bar-service.service';
import { environment } from 'src/environments/environment';
export interface DialogData {
  address: any;
}
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  address:any
  deleteProfile = false;
  spinner = false;
  userData: any;
  editFrom!: FormGroup;
  country_data: any;
  payLoadData: string[] = [];
  imageSrc = '';
  spinner1 = false;
  imgUrl=environment.Image_URL
  typeUpload!: string;
  constructor( 
          public dialog: MatDialog,
          private fb:FormBuilder,
          private serviceSnack:SnackBarServiceService,
          private service:ProfileServiceService,
          private apiService:LoginService,
          private uploadService: UploadImageService,
          private removeService: DeleteImageService,
          private route:Router
        ) { }
  ngOnInit(): void {
    this.getProfileDetail();
    this.createForm();
    this.getCountryData();
  }
  getProfileDetail() {
    this.service.getData().subscribe(
      (res) => {
        this.userData = res;
        this.user();
        this.spinner = false;
        this.apiService.setUserData(res)
      },
      (err) => {
        localStorage.removeItem('tok');
        this.spinner = false;
      }
    );
  }
  createForm() {
    this.editFrom = this.fb.group({
      avatar: ['', [validation.INPUT_REQUIRED]],
      phone_number: ['', [validation.INPUT_REQUIRED]],
      lab_name: ['', [validation.INPUT_REQUIRED]],
      physical_address: ['', [validation.INPUT_REQUIRED]],
      county: ['', [validation.INPUT_REQUIRED]],
      lab_bio: ['', [validation.INPUT_REQUIRED]],
      lab_images: ['', [validation.INPUT_REQUIRED]]
    });
  }
  user() {
    this.editFrom.patchValue({
      avatar: this.userData?.avatar,
      lab_name: this.userData?.name_prefix + " " + this.userData?.first_name + " " + this.userData?.last_name,
      physical_address: this.userData.physical_address,
      phone_number: "+" + this.userData.phone_code + " " + this.userData.phone_number,
      lab_bio: this.userData.lab_bio,
      lab_images: this.userData.lab_images
    })
    this.country_data?.map((item: any) => {
      if (this.userData.city_name == item.name) {
        this.editFrom.controls.county.patchValue(item)
      }
    })
    this.userData.lab_images.map((item: any) => {
      this.payLoadData.push(item);
    })
  }
   getCountryData(){
    this.apiService.getCountry().subscribe(res=>{
      this.country_data=res.body      
    })
  }
  openDialog(): void {
        const dialogRef = this.dialog.open(AddressPopUpComponent, {
          data: this.address,
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          this.address = result;
          this.editFrom?.get('physical_address')
            ?.setValue(this.address);
        });
      }
      snack(){
        if(this.payLoadData.length>4)
        this.serviceSnack.openSnackBar('Cannot upload more than 5 images')
      }
  onFileChange(event: any, type: string) {
    this.typeUpload = type;
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    console.log(file, "imageeeeeee");
    if (file) {
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        this.serviceSnack.openSnackBar('invalid format');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }
  _handleReaderLoaded(e: any) {
    
    this.typeUpload == 'document' ? this.spinner = true : this.spinner1 = true;
    let reader = e.target;
    this.imageSrc = reader.result.substr(reader.result.indexOf(',') + 1);
    let payLoad = {
      image: this.imageSrc,
      type: 'labs',
    };
    this.uploadService.imagedoc(payLoad).subscribe(
      (res:any) => {
        if (this.typeUpload == 'document') {
          this.payLoadData.push(res.image);
          this.editFrom.patchValue({
            lab_images: this.payLoadData,
          });
          this.spinner = false;
        } else {
          this.editFrom.get('avatar')?.patchValue(res.image);
          this.deleteProfile = false;
          this.spinner = false;
        }
      },
      (err) => {
        console.log(err, 'Error from image service!');
        this.spinner = false;
        this.spinner = false;
      }
    );
  }
  deleteImg(idx: any) {
    if (idx == 'delProfile') {
      this.removeService.deleteImage(this.userData.avatar).subscribe(res => {
        console.log(res, "delete image");
        this.deleteProfile = true;
      }, err => {
        console.log(err, "err in delete img!");
      })
    } else {
      this.removeService.deleteImage(this.payLoadData[idx]).subscribe(res => {
        console.log(res, "delete image");
      }, err => {
        console.log(err, "err in delete img!");
      })
      this.payLoadData.splice(idx, 1);
      this.editFrom.patchValue({
        lab_images: this.payLoadData,
      });
    }
  }
  updateUser() {
    if (this.editFrom.valid) {
      const firstFormValue = {
        steps: 2,
        avatar: this.editFrom.get('avatar')?.value,
        lab_name: this.editFrom.get('lab_name')?.value,
        physical_address: this.editFrom.get('physical_address')?.value,
        lab_bio: this.editFrom.get('lab_bio')?.value,
        latitude: 11.11,
        longitude: 33.33,
        city_id: this.editFrom.get('county')?.value.id,
      };
      const secondFormValue = {
        steps: 4,
        images: this.editFrom.get('lab_images')?.value,
      };
      console.log(firstFormValue, "hiiiiiiiiiiiiiiiiiiiihhhhhhhhhii", secondFormValue);

      this.apiService.putDta(firstFormValue).subscribe(res => {
        console.log(res, "Step 1 response from sub");
        this.serviceSnack.openSnackBar(res.message);
        this.spinner = false;
      }, err => {
        this.serviceSnack.ErrorOpenSnackBar(err.error.messages[0]);
        console.log(err, 'Err in register step 1!');
        this.spinner = false;
      })

      this.apiService.putDta(secondFormValue).subscribe(
        (res: any) => {
          if (res.code == 200) {
            console.log(res, 'Lab photo Added');
            this.serviceSnack.openSnackBar(res.message);
            this.route.navigate([NAV_TO_PROFILE]);
          } else {
            this.serviceSnack.openSnackBar(res.message);
          }
        },
        (err) => {
          console.log(err, 'errrr');
          this.serviceSnack.ErrorOpenSnackBar(err.error.messages[0], );
        }
      );
    }
  }
  navigateToHome(){
    this.route.navigate([NAV_TO_LAB_REQUEST])
  }
  navigateToProfile(){
    this.route.navigate([NAV_TO_PROFILE])
  }
}