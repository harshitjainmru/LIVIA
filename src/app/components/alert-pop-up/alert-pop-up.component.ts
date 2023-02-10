import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/account/verification/add-lab-detail/add-lab-detail.component';
import { Router } from '@angular/router';
import { NAV_TO_REGISTRATION } from 'src/app/Constants/commonRouters';
@Component({
  selector: 'app-alert-pop-up',
  templateUrl: './alert-pop-up.component.html',
  styleUrls: ['./alert-pop-up.component.scss']
})
export class AlertPopUpComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AlertPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private route:Router) {}

ngOnInit() {
}

closeDialog() {
  this.dialogRef.close(false);
}
navigateTologin(){
  
this.route.navigate([NAV_TO_REGISTRATION]);
}
}
