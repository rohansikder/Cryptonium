import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Login Data Model
  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthenticationService) {}

  // Method called when the user attempts to log in.
  login() {
    this.authService.login(this.user.email, this.user.password)
      .then(res => {
        console.log('Successfully logged in', res);
      })
      .catch(err => {
        console.error('Login error', err);
      });
  }

  ngOnInit() {
  }

}
