import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColloboratorDialogComponent } from './colloborator-dialog.component';

describe('ColloboratorDialogComponent', () => {
  let component: ColloboratorDialogComponent;
  let fixture: ComponentFixture<ColloboratorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColloboratorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColloboratorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
