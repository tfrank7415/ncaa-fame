import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
    ) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required, ]
      });
}

  ngOnInit() {
  }

  onSubmit() {
    this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password)
    // TODO: 1. Redirect user to home page when they register.
            //  2. Display error message if password is not complex enough
            //     or username is already taken.
    .then();
  }


}
