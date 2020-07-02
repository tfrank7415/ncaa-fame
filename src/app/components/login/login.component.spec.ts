import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators, FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from '../../app-routing.module';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';

class MockAuthService {
  loginUser(testResult: boolean): Promise<any> {
    if (testResult === true) {
        return Promise.resolve();
    } else { return Promise.reject('login error'); }
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        RouterTestingModule
      ],
      providers: [
        LoginComponent,
        { provide: AuthService, useClass: MockAuthService },
        { provide: FormBuilder, useValue: formBuilder}
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

        // Creating login form
    // component.loginForm = formBuilder.group({
    //       email: '',
    //       password: ''
    //     });
    component.ngOnInit();
    // component = TestBed.inject(LoginComponent);

    authService = TestBed.inject(AuthService);


    // fixture.detectChanges();
  });

  it('should not have error message after construction', () => {
    expect(component.errorMessage).toBeUndefined();
  });

  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  // it('should reset form values when #resetFormGroupValues() is called', () => {
  //   component.ngOnInit();
  //   component.loginForm.email = 'test@email.com';
  //   component.loginForm.password = 'password';
  //   component.resetFormGroupValues();
  //   expect(component.loginForm.email).toEqual('');
  //   expect(component.loginForm.password).toBeUndefined();

  //   fixture.componentInstance.ngOnInit();
  //   fixture.componentInstance.loginForm.email = 'test@email.com';
  //   fixture.componentInstance.loginForm.password = 'password';
  //   fixture.componentInstance.loginForm.reset();
  //   fixture.detectChanges();
  //   expect(fixture.componentInstance.loginForm.email).toEqual('');
  //   expect(fixture.componentInstance.loginForm.password).toBeUndefined();
  // });
});
