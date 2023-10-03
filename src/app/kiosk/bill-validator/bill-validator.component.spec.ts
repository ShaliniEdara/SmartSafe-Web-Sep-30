import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillValidatorComponent } from './bill-validator.component';

describe('BillValidatorComponent', () => {
  let component: BillValidatorComponent;
  let fixture: ComponentFixture<BillValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
