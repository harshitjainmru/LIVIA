import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProfileServiceService } from 'src/app/services/dashboard Service/profileService/profile-service.service';
import { LabRequestService } from 'src/app/services/dashboard Service/requestService/lab-request.service';
import { SendotpService } from 'src/app/services/sendOTP/sendotp.service';
import { SnackBarServiceService } from 'src/app/services/SnackBarCommonService/snack-bar-service.service';
import { environment } from 'src/environments/environment';
import { VerifyOTPComponent } from '../verify-otp/verify-otp.component';
 
export interface RequestData {
 data:string
 
}


@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.scss']
})
export class InsuranceDetailsComponent implements OnInit {
imageURL=environment.Image_URL
showImage:any
claimId:any
requestData:any[]=[];
spinner=false;
showData:any
profileData:any
disable_btn=false
box=false

  constructor(public dialogRef: MatDialogRef<InsuranceDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service:LabRequestService,
    private otpService:SendotpService,
    private snackService:SnackBarServiceService,
    private dialog:MatDialog) { 
      this.claimId=data.data.claim_id;
      this.requestData.push(data.data);
      console.log(data,"sajfnklasjfcl");
      this.showData = data.data;
      
    }
    ELEMENT_DATA!: RequestData[];
    @ViewChild(MatPaginator, { static: true }) 
    paginator!: MatPaginator;
    displayedColumns: string[] = ['select', 'doctor_note', 'lab_test_name', 'status'];
    dataSource = new MatTableDataSource<RequestData>(this.ELEMENT_DATA);
    
  ngOnInit(): void {
    this.getUserData()
   
  }
  // getUserData(){
  //   this.service.getData().subscribe((res:any)=>{
  //     this.showImage=res
  //     console.log(this.showImage,'hdqwuirfibekjfhgeiwtfgbwkfe');
      
  //     console.log(res, 'insurance fwheuifyiw');
      
  //   })
  // }
  getUserData() {
    let queryObj = {
      offset: 0,
      limit: 10,
      search:this.claimId
    }
    this.service.getLabRequest(queryObj).subscribe(
      (res) => {
        this.profileData = res.body[0];
        this.spinner = false;
        console.log(res,"jiiiiiiiiiiiiiiiiiiiiiiiii",this.profileData);
      },
      (err:any) => {
        localStorage.removeItem('isAuth');
        console.log(err, 'err from Lab Request');
      }
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog() {
    this.onNoClick();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = ' 600px';
    dialogConfig.data = {
      data: this.showData,
      id:this.verifyId,
    }
    const dialogRef = this.dialog.open(VerifyOTPComponent, dialogConfig);
    dialogRef.afterClosed();
  }

  actionMethod() {
    this.disable_btn=false
    setTimeout(()=>{        
      this.disable_btn = true;
 }, 3000);
  }
  verifyId:any;
  sendOTP(){
    this.spinner=true
    // this.actionMethod()
    console.log(this.requestData,'harshiter6');
    let requestId:any=[]
    const value = {
      phone_id:localStorage.getItem('phone_id'),
      lab_request_ids: [],
      declined_lab_request_due_to_user_balance:[]
      
    }
    let data=this.requestData[0].lab_requests;
    data?.map((item:any)=>{
      requestId.push(item.lab_request_id)
      console.log(item,"jpiojoihoho");
      
    })
    value['lab_request_ids']=requestId
    JSON.stringify(value['lab_request_ids']);
    this.otpService.getOTP(value, this.claimId).subscribe(res=>{
      if(res.code == 200){
        this.spinner=false
        this.snackService.openSnackBar(res.messages)
        this.verifyId=res.verification_id;
        this.openDialog()
        console.log(res,'harshit');
      }
    })
  }

}
