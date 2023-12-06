import { Component, OnInit } from '@angular/core';
import { DatabaseManagerService } from '../services/database-manager.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-trade',
  templateUrl: './add-trade.page.html',
  styleUrls: ['./add-trade.page.scss'],
})
export class AddTradePage implements OnInit {
  symbol: string = '';
  buyPrice: number = 0;
  takeProfit: number = 0;
  stopLoss: number = 0;
  notes: string = '';

  constructor(
    private databaseManagerService: DatabaseManagerService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async saveTrade() {
    try {
      await this.databaseManagerService.saveData(
        this.buyPrice,
        this.symbol,
        this.takeProfit,
        this.stopLoss,
        this.notes
      );
      this.showSuccessAlert();
      this.router.navigate(['/tabs/tab2']);
    } catch (error) {
      console.error('Error saving data: ', error);
      this.showErrorAlert();
    }
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Trade saved successfully!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Failed to save the trade. Please try again.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
