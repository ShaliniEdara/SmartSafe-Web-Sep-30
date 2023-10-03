import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKioskComponent } from './update-kiosk.component';

describe('UpdateKioskComponent', () => {
  let component: UpdateKioskComponent;
  let fixture: ComponentFixture<UpdateKioskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateKioskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateKioskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
