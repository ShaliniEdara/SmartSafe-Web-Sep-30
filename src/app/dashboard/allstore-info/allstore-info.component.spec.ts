import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllstoreInfoComponent } from './allstore-info.component';

describe('AllstoreInfoComponent', () => {
  let component: AllstoreInfoComponent;
  let fixture: ComponentFixture<AllstoreInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllstoreInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllstoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
