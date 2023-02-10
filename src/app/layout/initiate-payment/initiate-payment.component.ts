import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAV_TO_LAB_REQUEST, NAV_TO_PAYMENT } from 'src/app/Constants/commonRouters';
import { PaymentService } from 'src/app/services/dashboard Service/paymentService/payment.service';

@Component({
  selector: 'app-initiate-payment',
  templateUrl: './initiate-payment.component.html',
  styleUrls: ['./initiate-payment.component.scss']
})
export class InitiatePaymentComponent implements OnInit {
  claimIds:any
  paymentData:any
  spinner:boolean=true
  constructor(private service:PaymentService,private route:Router) { }

  ngOnInit(): void {
    this.getPaymentData()
  }
  getPaymentData() {
    this.claimIds = this.service.getId();
    console.log(this.claimIds, "paymenttttt");
    const payLoad:any = {
      claim_ids:[]
    };
    this.claimIds?.map((item:any) => {
      payLoad.claim_ids.push(item.claim_id);
    })
    console.log(payLoad,"jiiiiiiiiiiii");
    
    this.service.getData(payLoad).subscribe(res => {
      console.log(res, "Payment API");
      this.paymentData = res;
      console.log(this.paymentData);
      
      this.spinner = false;
    }, err => {
      console.log(err, "Error in Payment API");
      this.spinner = false;
    })
  }
  navigateToHome(){
    this.route.navigate([NAV_TO_LAB_REQUEST])
  }
  navigateToPayment(){
    this.route.navigate([NAV_TO_PAYMENT])
  }
}
