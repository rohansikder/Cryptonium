import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Login Data Model
  user = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertController: AlertController
  ) { }

  // Method called when the user attempts to log in.
  login() {
    this.authService.login(this.user.email, this.user.password)
      .then(res => {
        console.log('Successfully logged in', res);
        // Redirect the user to the home page upon successful login
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.error('Login error', err);
        this.showAlert("Login Failed", "Invalid email or password.");
      });
  }

  // Display an alert dialog with a given header and message.
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
  }
}
