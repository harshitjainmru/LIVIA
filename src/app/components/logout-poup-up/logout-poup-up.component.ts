import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/account/verification/add-lab-detail/add-lab-detail.component';
import { NAV_TO_LOGIN } from 'src/app/Constants/commonRouters';

@Component({
  selector: 'app-logout-poup-up',
  templateUrl: './logout-poup-up.component.html',
  styleUrls: ['./logout-poup-up.component.scss']
})
export class LogoutPoupUpComponent implements OnInit {
  // constructor(@Inject(MAT_DIALOG_DATA) public data,
  // public dialogRef: MatDialogRef<LogoutPoupUpComponent>) { }
  constructor(
    public dialogRef: MatDialogRef<LogoutPoupUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private route:Router) {}

ngOnInit() {
}

closeDialog() {
  this.dialogRef.close(false);
}
navigateTologin(){
  localStorage.clear();
this.route.navigate([NAV_TO_LOGIN]);
}

}
