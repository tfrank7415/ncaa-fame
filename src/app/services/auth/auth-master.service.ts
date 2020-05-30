import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()

export class AuthMasterService {

  constructor(private authService: AuthService) { }

    loginUser(email, password) { return this.authService.loginUser(email, password); }

    registerUser(email, password) { return this.authService.registerUser(email, password); }
}
