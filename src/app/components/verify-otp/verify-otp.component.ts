import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { interval, Subscription } from "rxjs";
import { NAV_TO_LAB_REPORT } from "src/app/Constants/commonRouters";
import { SendotpService } from "src/app/services/sendOTP/sendotp.service";
import { SnackBarServiceService } from "src/app/services/SnackBarCommonService/snack-bar-service.service";

export interface Data {
  data: string;
}
@Component({
  selector: "app-verify-otp",
  templateUrl: "./verify-otp.component.html",
  styleUrls: ["./verify-otp.component.scss"],
})
export class VerifyOTPComponent implements OnInit {
  otp = "";
  disable_btn=true
  interval: any;
  resend = false;
  verificationCode:any
  claimId:any
requestData:any[]=[];
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    inputStyles: {
      width: "80px",
      height: "65px",
      backgroundColor: "#f2f9fc",
      border: "none",
      margin: "0 8.4% 0 0",
    },
  };
  constructor(
    public dialogRef: MatDialogRef<VerifyOTPComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service:SendotpService,
    private snackService:SnackBarServiceService,
    private route:Router
  ) {
    this.claimId=data.data.claim_id
    this.requestData.push(data.data);
    this.verificationCode = data.id;
    console.log(data,'verify harshit');
    
  }
  ngOnInit(): void {
  }
  onOtpChange(otp: any) {
    this.otp = otp;

    if(otp.length==4){
      this.disable_btn = false
    }
    console.log(otp);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  resendCode(){
    let requestId:any=[]
    const value = {
      phone_id:localStorage.getItem('phone_id'),
      lab_request_ids: [],
      declined_lab_request_due_to_user_balance:[]
      
    }
    let data=this.requestData[0].lab_requests;
    console.log(data,'verify data');
    
    data?.map((item:any)=>{
      requestId.push(item.lab_request_id)      
    })
    value['lab_request_ids']=requestId
    JSON.stringify(value['lab_request_ids']);
    this.service.getOTP(value, this.claimId).subscribe(res=>{
      if(res.code ==200)
      console.log(res,'jainsahab');
      this.verificationCode = res.verification_id
      this.snackService.openSnackBar(res.messages)
      
    },err=>{
      console.log(this.verificationCode,'verifyvv'); 
      this.snackService.ErrorOpenSnackBar(err.error.messages)
    })
  }
  confirm(){
    console.log(this.verificationCode,'confom OTP');
    if(this.otp.length==4){
    const formValue = {
      phone_id:localStorage.getItem('phone_id'),
      auth_code:this.otp,
      verification_id:this.verificationCode
    }
    console.log(formValue,'success');
    this.service.verifyOtp(formValue,this.claimId).subscribe((res:any)=>{
      if(res.code==200){
        this.disable_btn=false
        this.snackService.openSnackBar(res.messages)
        this.onNoClick()
        this.route.navigate([NAV_TO_LAB_REPORT])

      }
      
    },err=>{
      this.disable_btn=true
      this.snackService.ErrorOpenSnackBar(err.error.messages);
      setTimeout(() => {
        this.disable_btn = false
        }, 3000);
      
    })
  } else{
    this.disable_btn=true
  }
  }
}
