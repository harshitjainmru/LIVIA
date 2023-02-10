import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/dashboard Service/commonService/dropdownService/settings.service';

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.scss']
})
export class CreateClaimComponent implements OnInit {
  insurance_company:any
  hidden_data=false
    
    constructor(
      private dropService: SettingsService,
    ) { }

  ngOnInit(): void {
    this.getInsuranceData()
  }
  getInsuranceData() {
    this.dropService.getInsurance().subscribe((res: any) => {
      this.insurance_company =
        res.list_of_countries[1].list_of_insurance_company;
      console.log(
        res.list_of_countries[1].list_of_insurance_company,
        "jingalala hoo hoo jingalala hoo hoo"
      );
    });
  }
  dropInsuFilter(event: any) {
    console.log(event, "dropdown values");
    if(event){
      this.hidden_data=true
    }else{
      this.hidden_data=false
    }
  
  }
}
