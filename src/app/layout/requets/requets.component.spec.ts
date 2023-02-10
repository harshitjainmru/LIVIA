import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequetsComponent } from './requets.component';

describe('RequetsComponent', () => {
  let component: RequetsComponent;
  let fixture: ComponentFixture<RequetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
