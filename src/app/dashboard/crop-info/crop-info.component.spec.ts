import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropInfoComponent } from './crop-info.component';

describe('CropInfoComponent', () => {
  let component: CropInfoComponent;
  let fixture: ComponentFixture<CropInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
