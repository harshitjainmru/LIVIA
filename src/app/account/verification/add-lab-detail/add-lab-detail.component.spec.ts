import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabDetailComponent } from './add-lab-detail.component';

describe('AddLabDetailComponent', () => {
  let component: AddLabDetailComponent;
  let fixture: ComponentFixture<AddLabDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLabDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
