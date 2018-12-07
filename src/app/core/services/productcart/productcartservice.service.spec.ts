import { TestBed } from '@angular/core/testing';

import { ProductcartserviceService } from './productcartservice.service';

describe('ProductcartserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductcartserviceService = TestBed.get(ProductcartserviceService);
    expect(service).toBeTruthy();
  });
});
