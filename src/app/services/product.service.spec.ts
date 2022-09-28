import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from './../../environments/environment';
import { Product } from './../models/product.model';
import { ProductsService } from './product.service';

describe('ProductService', () => {
  let productsService: ProductsService;
  let httpController: HttpTestingController;

  let apiUrl = `${environment.API_URL}/api/v1`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    productsService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be create', () => {
    expect(productsService).toBeTruthy();
  });

  describe('test for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      const returnProducts: Product[] = [
        {
          id: '123',
          title: 'title',
          price: 12,
          description: 'blbla',
          category: {
            id: 1,
            name: 'as',
          },
          images: ['img', 'img'],
        },
      ];

      productsService.getAllSimple().subscribe((data) => {
        expect(data.length).toEqual(returnProducts.length);
        expect(data).toEqual(returnProducts);
        doneFn();
      });

      const req = httpController.expectOne(`${apiUrl}/products`);
      req.flush(returnProducts);
      httpController.verify();
    });
  });
});
