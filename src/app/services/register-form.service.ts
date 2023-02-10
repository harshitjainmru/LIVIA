import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {

registrationForm!:FormGroup
  constructor(private _fb:FormBuilder) { }
  createForm(){
    this.registrationForm=this._fb.group({
      profileDetails:this._fb.group({
        avatar:['',[Validators.required]],
        lab_name:[
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)
          ],
        ],
            address:['',[Validators.required,
            Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
          ],
          physical_address:['',Validators.required],
      }),
        document: this._fb.group({
        tax_compliance:['',Validators.required],
        cr_12:['',Validators.required],
        kra_pin_certificate:['',Validators.required],
        regulator_licenses_1:['',Validators.required],
        regulator_licenses_2:['',Validators.required],
        regulator_licenses_3:['',Validators.required],
      }),
        labPic:this._fb.group({
          images:['',Validators.required]

      })
  });
    }
    get formControls(){
      return this.registrationForm.controls;

    }
  }

  // this.registrationForm.control.get('docu')