import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: Auth) {}

  // Login Method
  async login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Logout Method
  async logout(): Promise<void> {
    return signOut(this.auth);
  }

  // Check User Authentication Status
  getAuthState() {
    return authState(this.auth);
  }
}
