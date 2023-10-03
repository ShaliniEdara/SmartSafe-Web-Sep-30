import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUserToStoreComponent } from './assign-user-to-store.component';

describe('AssignUserToStoreComponent', () => {
  let component: AssignUserToStoreComponent;
  let fixture: ComponentFixture<AssignUserToStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignUserToStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignUserToStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
