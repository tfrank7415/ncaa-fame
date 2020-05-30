import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ncaa-fame';

  // Injecting authService so we can display/hide certain ui elements if the user is logged in.
  constructor(public authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }
}
