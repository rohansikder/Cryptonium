import { Component, OnInit } from '@angular/core';
import { DatabaseManagerService } from '../services/database-manager.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    trades: any[] = [];

    constructor(private databaseManagerService: DatabaseManagerService, private router: Router
    ) { }

    ngOnInit() {
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
}
