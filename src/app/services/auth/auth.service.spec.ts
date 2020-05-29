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

// Arrange
// Act
// Assert

describe('AuthService', () => {
  let service: AuthService;

  // dependencies that AuthSerive need
  let db: AngularFireDatabase;
  let firebaseAuth: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule( { providers: [AuthService] } );
    // service = new AuthService(db, firebaseAuth); });
  });
  it('#loginUser should return value from promise',
    (done: DoneFn) => {
      // service = TestBed.inject
      service.loginUser('johndoe@gmail.com', 'password')
      .then(value => {expect(value).toBe(firebaseAuth.authState);
                      done();
    });
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
