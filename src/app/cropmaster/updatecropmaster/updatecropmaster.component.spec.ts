import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecropmasterComponent } from './updatecropmaster.component';

describe('UpdatecropmasterComponent', () => {
  let component: UpdatecropmasterComponent;
  let fixture: ComponentFixture<UpdatecropmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecropmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecropmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
