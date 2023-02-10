import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileServiceService } from '../services/dashboard Service/profileService/profile-service.service';
import { LogoutPoupUpComponent } from '../components/logout-poup-up/logout-poup-up.component';
import { NAV_TO_PROFILE } from '../Constants/commonRouters';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  message:any
  profile_details:any
  logoImg:any
  img=environment.Image_URL
  constructor(private _route:Router,public dialog:MatDialog,private service:ProfileServiceService) { }

  ngOnInit(): void {
    this.getImage()
  }
  openConfirmDialog(){
    this.dialog.open(LogoutPoupUpComponent,{
      width:'390px',
      disableClose: true,
      data : this.message
    })
  }
  navigateToProfile(){
    this._route.navigate([NAV_TO_PROFILE])

  }
  getImage(){
    this.service.getData().subscribe((res:any)=>{
      this.profile_details = res.body
      this.logoImg = this.img + res.avatar
    })
  }



}
