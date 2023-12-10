import { Component } from '@angular/core';
import { DatabaseManagerService } from '../services/database-manager.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CryptoService } from '../services/crypto.service';


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
        private alertController: AlertController
    ) { }

    ionViewDidEnter() {
        this.loadTrades();
      }
    
      loadTrades() {
        this.databaseManagerService.getTradesForCurrentUser().subscribe(
          (data: any[]) => {
            Promise.all(data.map(trade => this.updateTradeWithCurrentPrice(trade)))
              .then(updatedTrades => {
                this.trades = updatedTrades;
              })
              .catch(error => console.error('Error updating trades:', error));
          },
          (error: any) => console.error('Error loading trades:', error)
        );
      }
    
      updateTradeWithCurrentPrice(trade: { symbol: string; buyPrice: number; stopLoss: number; takeProfit: number; }) {
        return this.cryptoService.getCryptoDetails(trade.symbol).then(data => {
          const currentPrice = parseFloat(data.data.priceUsd);
          return {
            ...trade,
            currentPrice,
            isProfit: currentPrice > trade.buyPrice,
            isStopLossHit: trade.stopLoss && currentPrice <= trade.stopLoss,
            isTakeProfitHit: trade.takeProfit && currentPrice >= trade.takeProfit
          };
        });
      }
    

    navigateToAddTrade() {
        this.router.navigate(['/add-trade']);
    }


    deleteTrade(trade: { id: string }) {
        this.databaseManagerService.deleteTrade(trade.id).then(() => {
            this.trades = this.trades.filter(t => t.id !== trade.id);
        }).catch((error: any) => {
            console.error('Error deleting trade: ', error);
        });
    }



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
}
