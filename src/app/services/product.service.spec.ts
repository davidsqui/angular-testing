import { HttpStatusCode } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from './../../environments/environment';
import {
  generateManyProducts,
  generateOneProduct
} from './../models/product.mock';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO
} from './../models/product.model';
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

  afterEach(() => {
    httpController.verify();
  });

  it('should be create', () => {
    expect(productsService).toBeTruthy();
  });

  describe('test for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      const returnProducts: Product[] = generateManyProducts(2);

      productsService.getAllSimple().subscribe((data) => {
        expect(data.length).toEqual(returnProducts.length);
        expect(data).toEqual(returnProducts);
        doneFn();
      });

      const req = httpController.expectOne(`${apiUrl}/products`);
      req.flush(returnProducts);
    });
  });

  describe('test for getAll', () => {
    it('should return a product list', (doneFn) => {
      const returnProducts: Product[] = generateManyProducts(2);

      productsService.getAll().subscribe((data) => {
        expect(data.length).toEqual(returnProducts.length);
        doneFn();
      });

      const req = httpController.expectOne(`${apiUrl}/products`);
      req.flush(returnProducts);
    });

    it('should return product list with taxes', (doneFn) => {
      const returnProducts: Product[] = [
        {
          ...generateOneProduct(),
          price: 100,
        },
        {
          ...generateOneProduct(),
          price: 200,
        },
        {
          ...generateOneProduct(),
          price: -100,
        },
      ];

      productsService.getAll().subscribe((data) => {
        expect(data.length).toEqual(returnProducts.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        doneFn();
      });

      const req = httpController.expectOne(`${apiUrl}/products`);
      req.flush(returnProducts);
      httpController.verify();
    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      const returnProducts: Product[] = generateManyProducts(2);
      const limit = 10;
      const offset = 3;

      productsService.getAll(limit, offset).subscribe((data) => {
        expect(data.length).toEqual(returnProducts.length);
        doneFn();
      });

      const req = httpController.expectOne(
        `${apiUrl}/products?limit=${limit}&offset=${offset}`
      );
      req.flush(returnProducts);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
    });
  });

  describe('test for create', () => {
    it('should return a new product', (doneFn) => {
      const returnProduct = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new product',
        price: 100,
        images: ['img'],
        description: 'bla bla bla',
        categoryId: 10,
      };

      productsService.create({ ...dto }).subscribe((data) => {
        expect(data).toEqual(returnProduct);
        doneFn();
      });

      const req = httpController.expectOne(`${apiUrl}/products`);
      req.flush(returnProduct);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('test for update', () => {
    it('should return a update product', (doneFn) => {
      const returnProduct = generateOneProduct();
      const id = 'product-1';
      const dto: UpdateProductDTO = {
        title: 'update product',
        price: 500,
      };

      productsService.update(id, { ...dto }).subscribe((data) => {
        expect(data).toEqual(returnProduct);
        doneFn();
      });

      const req = httpController.expectOne(`${apiUrl}/products/${id}`);
      req.flush(returnProduct);
      expect(req.request.body).toEqual(dto);
      expect(req.request.url).toContain(id);
      expect(req.request.method).toEqual('PUT');
    });
  });

  describe('test for delete', () => {
    it('should return a delete product', (doneFn) => {
      const response = true;
      const id = 'product-1';

      productsService.delete(id).subscribe((data) => {
        expect(data).toEqual(response);
        doneFn();
      });

      const req = httpController.expectOne(`${apiUrl}/products/${id}`);
      req.flush(response);
      expect(req.request.url).toContain(id);
      expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('test for getOne', () => {
    it('should return a product', (doneFn) => {
      const returnProduct = generateOneProduct();
      const id = 'product-1';

      productsService.getOne(id).subscribe((data) => {
        expect(data).toEqual(returnProduct);
        doneFn();
      });

      const req = httpController.expectOne(`${apiUrl}/products/${id}`);
      req.flush(returnProduct);
      expect(req.request.url).toContain(id);
      expect(req.request.method).toEqual('GET');
    });

    it('should return a 404 error', (doneFn) => {
      const id = 'product-1';
      const messageError = '404 message';
      const returnError = {
        status: HttpStatusCode.NotFound,
        statusText: messageError,
      };

      productsService.getOne(id).subscribe({
        error: (error) => {
          expect(error).toEqual('El producto no existe');
          doneFn();
        },
      });

      const req = httpController.expectOne(`${apiUrl}/products/${id}`);
      req.flush('', returnError);
      expect(req.request.url).toContain(id);
      expect(req.request.method).toEqual('GET');
    });

    it('should return a 409 error', (doneFn) => {
      const id = 'product-1';
      const messageError = '409 message';
      const returnError = {
        status: HttpStatusCode.Conflict,
        statusText: messageError,
      };

      productsService.getOne(id).subscribe({
        error: (error) => {
          expect(error).toEqual('Algo esta fallando en el server');
          doneFn();
        },
      });

      const req = httpController.expectOne(`${apiUrl}/products/${id}`);
      req.flush('', returnError);
      expect(req.request.url).toContain(id);
      expect(req.request.method).toEqual('GET');
    });

  });
});
