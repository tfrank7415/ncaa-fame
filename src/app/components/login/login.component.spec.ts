import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';
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

}

describe('LoginComponent', () => {
  let component: LoginComponent;
  // let fixture: ComponentFixture<LoginComponent>;
  let authService: MockAuthService;
  // const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(() => {
    TestBed.configureTestingModule({
      // declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        RouterTestingModule
      ],
      providers: [
        LoginComponent,
        { provide: AuthService, useClass: MockAuthService }
        // { provide: FormBuilder, useValue: formBuilder}
      ]
    });
    component = TestBed.inject(LoginComponent);
    authService = TestBed.inject(AuthService);
  });
});
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LoginComponent);
  //   component = fixture.componentInstance;

  //   // component.loginForm = formBuilder.group({
  //   //   email: null,
  //   //   password: null
  //   // });

  //   fixture.detectChanges();
  // });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

