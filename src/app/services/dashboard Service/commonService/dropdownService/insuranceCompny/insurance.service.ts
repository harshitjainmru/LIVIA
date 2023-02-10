import { Injectable } from '@angular/core';
import { SettingsService } from '../settings.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
insurance_company:any
  constructor(private dropService:SettingsService) { }
  get insuranceData(){
    this.dropService.getInsurance().subscribe((res:any)=>{
      this.insurance_company = res.list_of_countries[1].list_of_insurance_company;
      console.log(this.insurance_company,'jingalala hoo hoo jingalala hoo hoo');
    })
    return this.insurance_company
  }
}
