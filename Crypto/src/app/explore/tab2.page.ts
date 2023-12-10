import { Component } from '@angular/core';
import { DatabaseManagerService } from '../services/database-manager.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    trades: any[] = [];
    trade: any;

    constructor(
        private databaseManagerService: DatabaseManagerService,
        private router: Router,
        private alertController: AlertController
    ) { }

    ionViewDidEnter() {
        this.loadTrades();
    }

    loadTrades() {
        this.databaseManagerService.getTradesForCurrentUser().subscribe(
            (data: any[]) => {
                this.trades = data;
            },
            (error: any) => {
                console.error('Error loading trades: ', error);
            }
        );
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
