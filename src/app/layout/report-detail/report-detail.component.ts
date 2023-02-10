import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { NAV_TO_LAB_REPORT, NAV_TO_LAB_REQUEST } from 'src/app/Constants/commonRouters';
import { validation } from 'src/app/Constants/formValidation';
import { ProfileServiceService } from 'src/app/services/dashboard Service/profileService/profile-service.service';
import { ReportDetailService } from 'src/app/services/dashboard Service/reportDetailService/report-detail.service';
import { DeleteImageService } from 'src/app/services/Images/deleteImages/delete-image.service';
import { UploadImageService } from 'src/app/services/Images/upload-image.service';
import { SnackBarServiceService } from 'src/app/services/SnackBarCommonService/snack-bar-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {
  updateData = false;
  spinner = false;
  img = environment.Image_URL;
  imageSrc = '';
  id:any
  detailForm!: FormGroup;
  payLoadData: string[] = [];
  claimData: any;
  emailData = false;
  reportData: any;
  constructor( 
    private fb:FormBuilder,
    private serviceSnack:SnackBarServiceService,
    private uploadService: UploadImageService,
    private removeService: DeleteImageService,
    private reportDetail:ReportDetailService,
    private profileService:ProfileServiceService,
    private router:Router
  ) { 
    
  }
  
  ngOnInit(): void {
    this.getClaimId()
    this.createForm()
    this.profile()
  }
  claim_id=localStorage.getItem('claim_id')
  getClaimId(){
    this.reportDetail.report_Detail(this.claim_id).subscribe(res => {
            this.reportData = res;
            console.log(this.reportData, 'gye2duv2rdf2');
            
            this.spinner = false;
          }, err => {
            this.router.navigate([NAV_TO_LAB_REPORT])
            this.spinner = false;
          })
  }
createForm() {
  this.detailForm = this.fb.group({
    email: ['', [validation.INPUT_REQUIRED,validation.EMAIL.EMAIL_PATTERN,validation.EMAIL.EMAIL_email]],
    notes: ['', [validation.INPUT_REQUIRED]],
    lab_images: ['', [validation.INPUT_REQUIRED]]
  });
}
profile(){
    
  this.profileService.getData().subscribe(
    (res:any) => {
      this.id = res.id;
    
      this.spinner = false;

    },
    (err) => {
      this.spinner = false;
    }
  );
}
snack(){
  if(this.payLoadData.length>4)
  this.serviceSnack.openSnackBar('Cannot upload more than 5 images')
}
setEmail() {
  this.emailData = true;

  const formValue = {
    user_id:this.id, 
    email:this.detailForm.controls.email.value
  }
  console.log(formValue,'hufwiyfctrvew');
  
  this.reportDetail.setEmail(formValue).subscribe((res:any) => {
    console.log(res, "User email set!!");
    this.serviceSnack.openSnackBar(res.messages[0])
    this.emailData = false;
  }, err => {
    console.log(err,"error in user email");
  })
 }
onFileChange(event: any, type: string) {
  this.spinner = true;
  var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
  console.log(file, "imageeeeeee");
  if (file) {
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      this.serviceSnack.ErrorOpenSnackBar('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
}

_handleReaderLoaded(e: any) {
  this.spinner=true
  let reader = e.target;
  this.imageSrc = reader.result.substr(reader.result.indexOf(',') + 1);
  let payLoad = {
    image: this.imageSrc,
    type: 'labs',
  };
  this.uploadService.imagedoc(payLoad).subscribe(
    (res:any) => {
      this.payLoadData.push(res.image);
      this.detailForm.patchValue({
        lab_images: this.payLoadData,
      });
      this.spinner = false;
    },
    (err) => {
      console.log(err, 'Error from image service!');
      this.spinner = false;
    }
  );
}

deleteImg(idx: any) {
  this.removeService.deleteImage(this.payLoadData[idx]).subscribe(res => {
    console.log(res, "delete image");
    this.payLoadData.splice(idx, 1);
    this.detailForm.patchValue({
      lab_images: this.payLoadData,
    });
  }, err => {
    console.log(err, "err in delete img!");
  })
}
saveData(idx:any){
  let id: any;
  id=this.reportData.test_details[idx].lab_request_id;
  const formValue = {
    lab_notes: this.detailForm.controls.notes.value,
    send_to_doctor: 0,
    documents:[]
  }
  console.log(formValue,"hiiii");
  this.reportDetail.saveDetail(id,formValue).subscribe((res:any) => {
    console.log(res, "response from send report!!!");
    this.updateData = false;
    this.serviceSnack.openSnackBar(res.messages[0]);
    // this.router.navigate(['imagingReports'])
  }, err => {
    console.log(err, "error from send report!!!");
    this.updateData = false;
  })
}
sendReport() {
  this.updateData = true;
 
  const formValue = {
    lab_notes: this.detailForm.controls.notes.value,
    send_to_doctor: 1,
    documents:this.detailForm.controls.lab_images.value
  }
  console.log(formValue,"hiiii");
  this.reportDetail.send_lab_report(this.id,formValue).subscribe((res:any) => {
    console.log(res, "response from send report!!!");
    this.updateData = false;
    this.serviceSnack.openSnackBar(res.messages[0]);
    this.router.navigate([NAV_TO_LAB_REPORT])
  }, err => {
    console.log(err, "error from send report!!!");
    this.updateData = false;
  })
}
navigateToLabReport(){
  this.router.navigate([NAV_TO_LAB_REPORT])
}
navigateToHome(){
  this.router.navigate([NAV_TO_LAB_REQUEST])
}
}