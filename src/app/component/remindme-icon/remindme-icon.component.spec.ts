import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindmeIconComponent } from './remindme-icon.component';

describe('RemindmeIconComponent', () => {
  let component: RemindmeIconComponent;
  let fixture: ComponentFixture<RemindmeIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindmeIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindmeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
