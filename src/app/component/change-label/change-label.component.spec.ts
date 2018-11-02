import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLabelComponent } from './change-label.component';

describe('ChangeLabelComponent', () => {
  let component: ChangeLabelComponent;
  let fixture: ComponentFixture<ChangeLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
