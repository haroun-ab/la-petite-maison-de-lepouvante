import { TestBed } from '@angular/core/testing';

import { ProductService } from './product';
import {Product} from '../../entities/product/product.model';

describe('Productservice', () => {
  let service: Product;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Product);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
