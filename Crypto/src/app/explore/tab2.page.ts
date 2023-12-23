import { Component } from '@angular/core';
import { DatabaseManagerService } from '../services/database-manager.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CryptoService } from '../services/crypto.service';
import { LoadingController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  trades: any[] = [];
  trade: any;
  cryptoDetails: any;

  constructor(
    private databaseManagerService: DatabaseManagerService,
    private cryptoService: CryptoService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ionViewDidEnter() {
    this.presentLoading();
    this.loadTrades();
  }

  // Load trades from the database
  loadTrades() {
    this.databaseManagerService.getTradesForCurrentUser().subscribe(
      (data: any[]) => {
        Promise.all(data.map(trade => this.updateTradeWithCurrentPrice(trade)))
          .then(updatedTrades => {
            this.trades = updatedTrades;
          })
          .catch(error => {
            console.error('Error updating trades:', error);
          });
      },
      (error: any) => {
        console.error('Error loading trades:', error);
      }
    );
  }

  // Update trade with current price and handle notifications
  async updateTradeWithCurrentPrice(trade: { symbol: string; buyPrice: number; stopLoss: number; takeProfit: number; quantity:number}) {
    return this.cryptoService.getCryptoDetails(trade.symbol).then(data => {
      const currentPrice = parseFloat(data.data.priceUsd);
      console.log(trade.quantity);
      const updatedTrade = {
        ...trade,
        currentPrice,
        isProfit: currentPrice > trade.buyPrice,
        isStopLossHit: trade.stopLoss && currentPrice <= trade.stopLoss,
        isTakeProfitHit: trade.takeProfit && currentPrice >= trade.takeProfit
      };

      if (updatedTrade.isStopLossHit) {
        // Send a notification when the stop loss is hit
        this.sendStopLossNotification(updatedTrade);
      }

      if (updatedTrade.isTakeProfitHit) {
        // Send a notification when the take profit is hit
        this.sendTakeProfitNotification(updatedTrade);
      }

      return updatedTrade;
    });
  }

  // Send a notification when take profit is hit
  async sendTakeProfitNotification(trade: any) {
    await LocalNotifications['schedule']({
      notifications: [
        {
          title: 'Take Profit Hit!',
          body: `Your trade for ${trade.symbol} has hit the take profit price.`,
          id: 3,
          schedule: { at: new Date() },
          sound: 'default',
          attachments: [],
        },
      ],
    });
  }

  // Send a notification when stop loss is hit
  async sendStopLossNotification(trade: any) {
    await LocalNotifications['schedule']({
      notifications: [
        {
          title: 'Stop Loss Hit!',
          body: `Your trade for ${trade.symbol} has hit the stop loss price.`,
          id: 2,
          schedule: { at: new Date() },
          sound: 'default',
          attachments: [],
        },
      ],
    });
  }


  // Navigate to the add trade page
  navigateToAddTrade() {
    this.router.navigate(['/add-trade']);
  }

  // Delete a trade
  deleteTrade(trade: { id: string }) {
    this.databaseManagerService.deleteTrade(trade.id).then(() => {
      this.trades = this.trades.filter(t => t.id !== trade.id);
    }).catch((error: any) => {
      console.error('Error deleting trade: ', error);
    });
  }

  // Confirm trade deletion
  async confirmDelete(trade: any) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Do you really want to delete this trade?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteTrade(trade);
          }
        }
      ]
    });

    await alert.present();
  }

  // Present loading spinner
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading trades...',
      spinner: 'dots',
      translucent: true
    });

    await loading.present();

    // Dismiss loading after 500 milliseconds
    setTimeout(() => {
      loading.dismiss();
    }, 500);
  }
}
