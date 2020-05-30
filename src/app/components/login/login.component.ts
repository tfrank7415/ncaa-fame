import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  errorMessage;
  unsuccessfulLogin;
  errorCode;

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
