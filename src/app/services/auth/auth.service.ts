import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userCredentialTemp: any;
  user: Observable<firebase.User>;

  constructor(
    private db: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth
  ) {
     this.user = firebaseAuth.authState;
  }

  // Service to login user with email and password
  // If login fails, returns error code
  loginUser(email: string, password: string): Promise<any> {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password)
    // We do not have a then because we don't need return any error code if login is a success
    // Triggered if user is not registered or invalid login credentials
    .catch((error) => {
      console.log('Error: ' + error.code);
      return error.code;
    });
  }

  registerUser(email: string, password: string): Promise<any> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      return error.code;
    });
  }

  logout() {
    this.firebaseAuth.signOut();
  }
}
