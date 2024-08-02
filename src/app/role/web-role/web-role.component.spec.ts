import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebRoleComponent } from './web-role.component';

describe('WebRoleComponent', () => {
  let component: WebRoleComponent;
  let fixture: ComponentFixture<WebRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
