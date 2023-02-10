import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutPoupUpComponent } from './logout-poup-up.component';

describe('LogoutPoupUpComponent', () => {
  let component: LogoutPoupUpComponent;
  let fixture: ComponentFixture<LogoutPoupUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutPoupUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutPoupUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
