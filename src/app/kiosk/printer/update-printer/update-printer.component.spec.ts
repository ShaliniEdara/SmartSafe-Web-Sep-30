import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrinterComponent } from './update-printer.component';

describe('UpdatePrinterComponent', () => {
  let component: UpdatePrinterComponent;
  let fixture: ComponentFixture<UpdatePrinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePrinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePrinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
