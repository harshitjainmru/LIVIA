import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressPopUpComponent } from './address-pop-up.component';

describe('AddressPopUpComponent', () => {
  let component: AddressPopUpComponent;
  let fixture: ComponentFixture<AddressPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
