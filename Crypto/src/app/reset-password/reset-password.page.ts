import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})

export class ResetPasswordPage {
  userEmail: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private alertController: AlertController
  ) { }

  // Method called when the user requests a password reset.
  async resetPassword() {
    if (this.userEmail) {
      try {
        // Attempt to reset the user's password
        await this.authService.resetPassword(this.userEmail);
        this.showAlert('Check Your Email', 'Please check your email to reset your password.');
        this.router.navigate(['/login']); // Redirect to the login page
      } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'This email does not exist';
        this.showAlert('Password Reset Failed', errorMessage);
      }
    }
  }

  // Display an alert with the given header and message.
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
