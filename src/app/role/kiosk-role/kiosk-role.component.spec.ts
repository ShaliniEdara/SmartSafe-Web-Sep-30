import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskRoleComponent } from './kiosk-role.component';

describe('KioskRoleComponent', () => {
  let component: KioskRoleComponent;
  let fixture: ComponentFixture<KioskRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
