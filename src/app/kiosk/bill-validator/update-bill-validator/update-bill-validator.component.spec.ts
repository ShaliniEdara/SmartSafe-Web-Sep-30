import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBillValidatorComponent } from './update-bill-validator.component';

describe('UpdateBillValidatorComponent', () => {
  let component: UpdateBillValidatorComponent;
  let fixture: ComponentFixture<UpdateBillValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBillValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBillValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
