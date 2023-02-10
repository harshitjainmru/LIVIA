import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutPoupUpComponent } from '../components/logout-poup-up/logout-poup-up.component';
import { NAV_TO_LOGIN } from '../Constants/commonRouters';
import { SnackBarServiceService } from '../services/SnackBarCommonService/snack-bar-service.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
message:any
  constructor(private route:Router,public dialog:MatDialog,private snackService:SnackBarServiceService) { }

  ngOnInit(): void {
  }
  openConfirmDialog(){
    this.dialog.open(LogoutPoupUpComponent,{
      width:'390px',
      disableClose: true,
      data : this.message
    })
  }
  navigateToLogin(){
    this.snackService.openSnackBar("You don't have any credentials.Please wait 2 to 3 days")
    this.route.navigate([NAV_TO_LOGIN])

  }

}
