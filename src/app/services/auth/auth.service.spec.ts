import { TestBed, async } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AppComponent } from 'src/app/app.component';
import { AuthMasterService } from './auth-master.service';

// Arrange
// Act
// Assert

describe('AuthService', () => {
    let masterService: AuthMasterService;
    let authServiceSpy: jasmine.SpyObj<AuthService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('AuthService', ['loginUser', 'registerUser']);

        TestBed.configureTestingModule({
            providers: [
                AuthMasterService,
                { provide: AuthService, useValue: spy }
            ]
        });
        masterService = TestBed.inject(AuthMasterService);
        authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    });

    it('#loginUser should return promise value without error message', () => {
        // So I can also do promise.reject(new Error('error code')) to return errors.
        const stubValue = Promise.resolve();

        authServiceSpy.loginUser.and.returnValue(stubValue);

        expect(masterService.loginUser('johndoe@gmail.com', 'password'))
            .toBe(stubValue, 'service returned promise without error data');
        expect(authServiceSpy.loginUser.calls.count())
            .toBe(1, 'spy method was called once');
        expect(authServiceSpy.loginUser.calls.mostRecent().returnValue)
            .toBe(stubValue);
    });

    it('#loginUser should return promise value with error message', () => {
        const stubValue = Promise.reject('invalid password');

        authServiceSpy.loginUser.and.returnValue(stubValue);

        // pass incorrect password
        expect(masterService.loginUser('johndoe@gmail.com', 'wrongpassword'))
            .toBe(stubValue, 'service returned promise with error data');
        expect(authServiceSpy.loginUser.calls.count())
            .toBe(1, 'spy method was called once');
        expect(authServiceSpy.loginUser.calls.mostRecent().returnValue)
            .toBe(stubValue);
    });

    it('#registerUser should return promise value without error message', () => {
        const stubValue = Promise.resolve();

        authServiceSpy.registerUser.and.returnValue(stubValue);

        expect(masterService.registerUser('johnsmoe@gmail.com', 'newaccount'))
            .toBe(stubValue, 'service returned promise without error data');
        expect(authServiceSpy.registerUser.calls.count())
            .toBe(1, 'spy method was called once');
        expect(authServiceSpy.registerUser.calls.mostRecent().returnValue)
            .toBe(stubValue);
    });

    it('#registerUser should return promise value with error message', () => {
        const stubValue = Promise.reject('Account already exists');

        authServiceSpy.registerUser.and.returnValue(stubValue);

        expect(masterService.registerUser('johndoe@gmail.com', 'password'))
            .toBe(stubValue, 'service returned promise with error data');
        expect(authServiceSpy.registerUser.calls.count())
            .toBe(1, 'spy method was called once');
        expect(authServiceSpy.registerUser.calls.mostRecent().returnValue)
            .toBe(stubValue);
    });
});


// TODO********* UNCOMMENT OUT THE BELOW WHEN DONE TESTING
// describe('AuthService', () => {

//   let service: AuthService;
//   let spy: jasmine.Spy;

//   beforeEach(() => {
//     // spy = spyOn(service, 'loginUser').arguments('johndoe@gmail.com', 'password').and.returnValue(null);

//     TestBed.configureTestingModule({
//     providers: [ AuthService ],
//     imports: [
//       HttpClientTestingModule,
//       MatMenuModule,
//       AngularFireModule.initializeApp(environment.firebaseConfig),
//       AngularFireDatabaseModule,
//       AngularFireAuthModule
//      ]
//     });
//   });

//   it('should use AuthService', () => {
//     service = TestBed.get(AuthService);
//     expect(service.loginUser())
//   });

//   it('should be created', () => {
//     // const service: AuthService = TestBed.get(AuthService);
//     const authService: AuthService = TestBed.get(AuthService);
//     expect(authService).toBeTruthy();
//   });

//   it('true should be true', () => {
//     expect(true).toBe(true);
//   });

//   // Arrange
//   // Act
//   // Assert

//   it('loginUser should not return an error message', () => {
//     const fixture = TestBed.createComponent(AuthService);

//     const errorMessage = 'Not null';
//     expect(errorMessage).toBe(null);
//   });
// });
