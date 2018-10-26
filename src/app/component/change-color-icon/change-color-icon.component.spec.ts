import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeColorIconComponent } from './change-color-icon.component';

describe('ChangeColorIconComponent', () => {
  let component: ChangeColorIconComponent;
  let fixture: ComponentFixture<ChangeColorIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeColorIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeColorIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
