import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAV_TO_EDIT_PROFILE, NAV_TO_LAB_REQUEST } from 'src/app/Constants/commonRouters';
import { ProfileServiceService } from 'src/app/services/dashboard Service/profileService/profile-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile_data:any
  image=environment.API_BASE_PATH
  showCurosal:boolean=false
  slides:string[] = [];
  spinner=false
  bioValue:boolean=true
  images='https://staging.liviaapp.com'
  constructor(private service:ProfileServiceService,private _route:Router) { }

  ngOnInit(): void {
    this.getProfileData()
  }

  getProfileData(){
    this.spinner=true
    this.service.getData().subscribe(res=>{
      this.profile_data=res
      console.log(res,'harshit Profile');
      if(this.profile_data.lab_images.length>0){
        this.showCurosal=true
        this.spinner=false
      
      for(let i =0; i < this.profile_data.lab_images.length;i++){
        this.slides.push(this.images + this.profile_data.lab_images[i]);
      } }else {
        this.showCurosal=false
      }
      
    },err=>{
          localStorage.removeItem('tok')
    })
  }
  navigateToEditProfile(){
    this._route.navigate([NAV_TO_EDIT_PROFILE])
  }
  navigateToHome(){
    this._route.navigate([NAV_TO_LAB_REQUEST])
  }

}
