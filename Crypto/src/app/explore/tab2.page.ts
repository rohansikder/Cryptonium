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
  async updateTradeWithCurrentPrice(trade: { symbol: string; buyPrice: number; stopLoss: number; takeProfit: number; quantity: number }) {
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

  // Dashboard Data Calculation Methods
  get totalInvestment(): number {
    return this.trades.reduce((acc, trade) => acc + (trade.buyPrice * trade.quantity), 0);
  }

  get currentValue(): number {
    return this.trades.reduce((acc, trade) => acc + (trade.currentPrice * trade.quantity), 0);
  }

  get netProfitLoss(): number {
    return this.currentValue - this.totalInvestment;
  }

  get averageBuyPrice(): number {
    return this.trades.length > 0 ? this.totalInvestment / this.trades.length : 0;
  }

  get averageProfitLossPerTrade(): number {
    return this.trades.length > 0 ? this.netProfitLoss / this.trades.length : 0;
  }

  get profitableTradesCount(): number {
    return this.trades.filter(trade => trade.isProfit).length;
  }

  get losingTradesCount(): number {
    return this.trades.filter(trade => !trade.isProfit).length;
  }

  // Method to convert trades data to CSV
  // Method to convert trades data to CSV, including dashboard figures
  exportTradesToCsv() {
    // Dashboard summary
    const dashboardSummary = `Total Investment,Current Value,Net Profit/Loss,Average Buy Price,Profitable Trades,Losing Trades\n` +
      `${this.totalInvestment},${this.currentValue},${this.netProfitLoss},${this.averageBuyPrice},${this.profitableTradesCount},${this.losingTradesCount}\n\n`;

    // Define the header for CSV file
    const headers = 'Symbol,Buy Price,Quantity,Total Investment,Take Profit,Stop Loss,Current Price,Profit/Loss,ROI\n';

    // Convert each trade to CSV format
    const csvData = this.trades.map(trade => {
      const profitLoss = (trade.currentPrice - trade.buyPrice) * trade.quantity;
      const roi = ((trade.currentPrice - trade.buyPrice) / trade.buyPrice * 100).toFixed(2);
      return `${trade.symbol},${trade.buyPrice},${trade.quantity},${trade.buyPrice * trade.quantity},${trade.takeProfit},${trade.stopLoss},${trade.currentPrice},${profitLoss.toFixed(2)},${roi}`;
    }).join('\n');

    // Combine dashboard summary, headers, and rows
    const csvContent = dashboardSummary + headers + csvData;

    // Trigger the download
    this.downloadCsv(csvContent, 'trades.csv');
  }

  // Method to trigger the CSV download
  private downloadCsv(csvContent: string, fileName: string) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
