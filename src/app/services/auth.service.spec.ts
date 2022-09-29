import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

fdescribe('Authservice', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  let apiUrl = `${environment.API_URL}/api/v1/auth`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, TokenService],
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be create', () => {
    expect(authService).toBeTruthy();
  });

  describe('test for login', () => {
    it('should return a token', (doneFn) => {
      const email = 'david@gmail.com';
      const password = '123456';
      const returnAuth: Auth = {
        access_token: '121212',
      };

      authService.login(email, password).subscribe((data) => {
        expect(data).toEqual(returnAuth);
        doneFn();
      });

      const req = httpController.expectOne(`${apiUrl}/login`);
      req.flush(returnAuth);
    });
  });

  describe('test for login', () => {
    it('should call to saveToken', (doneFn) => {
      const email = 'david@gmail.com';
      const password = '123456';
      const returnAuth: Auth = {
        access_token: '121212',
      };
      spyOn(tokenService, 'saveToken').and.callThrough();

      authService.login(email, password).subscribe((data) => {
        expect(data).toEqual(returnAuth);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith('121212');
        doneFn();
      });

      const req = httpController.expectOne(`${apiUrl}/login`);
      req.flush(returnAuth);
    });
  });
});
