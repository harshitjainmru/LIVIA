import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabPicComponent } from './add-lab-pic.component';

describe('AddLabPicComponent', () => {
  let component: AddLabPicComponent;
  let fixture: ComponentFixture<AddLabPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLabPicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
