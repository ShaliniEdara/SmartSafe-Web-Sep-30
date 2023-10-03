import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsReportsComponent } from './charts-reports.component';

describe('ChartsReportsComponent', () => {
  let component: ChartsReportsComponent;
  let fixture: ComponentFixture<ChartsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
