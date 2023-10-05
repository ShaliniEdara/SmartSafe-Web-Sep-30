import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecropmasterComponent } from './createcropmaster.component';

describe('CreatecropmasterComponent', () => {
  let component: CreatecropmasterComponent;
  let fixture: ComponentFixture<CreatecropmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecropmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecropmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
