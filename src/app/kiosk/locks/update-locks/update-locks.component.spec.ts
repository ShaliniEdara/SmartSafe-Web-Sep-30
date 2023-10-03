import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLocksComponent } from './update-locks.component';

describe('UpdateLocksComponent', () => {
  let component: UpdateLocksComponent;
  let fixture: ComponentFixture<UpdateLocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
