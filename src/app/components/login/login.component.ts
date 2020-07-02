import { Component, OnInit, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, NavigationStart } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm;
  errorMessage;
  unsuccessfulLogin;
  errorCode;
  loginWithGoogleWithRedirect = false;

  // authState = new Observable((observer) => {
  //   observer.next(console.log('Next'));
  //   observer.complete();
  // });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Create form
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Why can't I create an method of type observable which observes
    // this.user in my service class.  Then if changes happen I will know

    // I will need to subscribe to the observable in
    // authService here.

    // BIG BRAIN
    this.authService.user.subscribe(
      value => {console.log(value); },
      err => {console.log(err); }
    );
  }

  ngOnDestroy() {
  }


  // Called when user submits form
  async onSubmit() {
    this.unsuccessfulLogin = false;
    await this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password)
    .then( data => { this.displayErrorMessage(data); } );

    if (this.unsuccessfulLogin === false) {
      this.router.navigateByUrl('');
    }
  }

  isUserLoggedIn(user) {
    if (user) {
      // this.authService.getRedirectResultsFromGoogle()
      // .then( data => { console.log(data); } );
      alert(user);
    } else {
      alert('Not logged in');
      return;
    }
  }

  async loginWithGoogle() {
    this.authService.loginUserWithGoogle()
    // .then(await this.authService.getRedirectResultsFromGoogle())
    .then( data => { console.log(data); } );
  }

  // TODO: move this method to a service.  Maybe create an error service.
  displayErrorMessage(data: string) {
    if (data === 'auth/user-not-found') {
      this.errorMessage = 'Email address is not associated with a current user.  Please register.';
      this.unsuccessfulLogin = true;
    }
    if (data === 'auth/wrong-password') {
      this.errorMessage = 'Incorrect password.';
      this.unsuccessfulLogin = true;
    }
    if (data === 'auth/invalid-email') {
      this.errorMessage = 'Invalid email.  Enter an actual email address.';
      this.unsuccessfulLogin = true;
    }
    this.resetFormGroupValues();
    // console.log(data);
  }
  // Called when logout button is clicked.
  logout() {
    this.authService.logout();
  }

  resetFormGroupValues() {
    this.loginForm.reset({ email: '', password: ''  });
  }
}
