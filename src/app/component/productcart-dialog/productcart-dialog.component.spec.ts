import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcartDialogComponent } from './productcart-dialog.component';

describe('ProductcartDialogComponent', () => {
  let component: ProductcartDialogComponent;
  let fixture: ComponentFixture<ProductcartDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductcartDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
