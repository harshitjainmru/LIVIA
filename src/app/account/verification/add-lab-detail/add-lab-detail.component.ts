import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteImageService } from 'src/app/services/Images/deleteImages/delete-image.service';
import { UploadImageService } from 'src/app/services/Images/upload-image.service';
import { LoginService } from 'src/app/services/login.service';
import { RegisterFormService } from 'src/app/services/register-form.service';
import { SnackBarServiceService } from 'src/app/services/SnackBarCommonService/snack-bar-service.service';
import { environment } from 'src/environments/environment';
import { AddressPopUpComponent } from '../../../components/address-pop-up/address-pop-up.component';

export interface DialogData {
  address: string;
}
@Component({
  selector: 'app-add-lab-detail',
  templateUrl: './add-lab-detail.component.html',
  styleUrls: ['./add-lab-detail.component.scss'],
})
export class AddLabDetailComponent implements OnInit {
  address: any;
  show:boolean=true
  spinner: boolean = false;
  imageSrc: any = '';
  btn = true;
  avatarBase:any;
  img=environment.Image_URL
  country_data:any
  constructor(
    public dialog: MatDialog,
    public service: RegisterFormService,
    private apiService: LoginService,
    private uploadService:UploadImageService,
    private snackService:SnackBarServiceService,
    private deleteService:DeleteImageService
  ) {}

  ngOnInit(): void {
    this.service.createForm();
    this.getCountryData()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddressPopUpComponent, {
      data: this.address,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.address = result;
      this.service.registrationForm.controls.profileDetails
        .get('address')
        ?.setValue(this.address);
    });
  }

  get profileForm() {
    return this.service.registrationForm.controls.profileDetails;
  }

  onFileChange(event: any) {
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    if (file) {
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        this.snackService.ErrorOpenSnackBar('invalid format');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }
  _handleReaderLoaded(e: any) {
    this.spinner = true;
    this.btn = false;
    let reader = e.target;
    this.imageSrc = reader.result.substr(reader.result.indexOf(',') + 1);
    let payLoad = {
      image: this.imageSrc,
      type:'labs'
    }
    this.uploadService.imagedoc(payLoad).subscribe((res:any) => {
      this.profileForm.get('avatar')?.patchValue(res.image);
      this.btn = false;
      this.spinner = false;
    }, err => {
      this.btn = true;
      this.spinner = false;
      console.log(err,"Error from image service!");
    });
  }
  deleteImg() {
    const formValue = {
      image:[this.profileForm?.get('avatar')?.value]
    }
    console.log(this.profileForm?.get('avatar')?.value,"del image");
     this.deleteService.deleteImage(formValue).subscribe((res:any) => {
       console.log(res, "delete image");
        this.spinner = false;
       this.btn = true;
       this.profileForm.get('avatar')?.reset();
    }, (err:any) => {
      console.log(err,"err in delete img!");
     })
  }
  getCountryData(){
    this.apiService.getCountry().subscribe(res=>{
      this.country_data=res.body
      console.log(res.body,'harshit country data');
      console.log(res.body.country,'harshit country');
      
    })
  }
  errorMessage() {
    this.snackService.ErrorOpenSnackBar('logo is required')
  }
  onSubmit() {
    const formValue = this.profileForm.value;
    (formValue['avatar']= this.avatarBase),
    (formValue['steps'] = 2),
      (formValue['lab_bio'] = ''),
      (formValue['latitude'] = 11.11),
      (formValue['longitude'] = 33.33),
      (formValue['city_id'] = 200787);
     
    if (this.profileForm.valid) {
      this.spinner = true;
      console.log('dhqgif', this.profileForm);
      this.apiService.putDta(formValue).subscribe(
        (res) => {
          console.log('hiiiiiiiiii', res);
          this.snackService.openSnackBar(res.message)
          this.spinner = false;
          console.log('hiiiiiiiiii', res.message);
        },
        (err) => {
          this.snackService.ErrorOpenSnackBar(err.error.messages[0])
          this.spinner = false;
        }
      );
    }
  }
}
