import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private authService: AuthenticationService, private router: Router
  ) { }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login').then(() => {
        window.location.reload(); // This forces a reload of the application
      });

    }).catch((error) => {
      console.error('Error logging out: ', error);
    });
  }
}
