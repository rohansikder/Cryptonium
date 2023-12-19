import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service'; // Adjust the path as necessary

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  user = { email: '', password: '' };

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertController: AlertController
  ) { }

  // Attempt to sign up the user using provided email and password.
  async signup() {
    try {
      const result = await this.authService.signup(this.user.email, this.user.password);
      console.log('Signup successful', result);
      this.showAlert('Signup Successful', 'Your account has been created.');
      this.router.navigate(['/login']);
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
      this.showAlert('Signup Failed', errorMessage);
    }
  }

  // Display an alert with a given header and message.
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
