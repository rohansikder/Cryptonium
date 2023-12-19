import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../services/crypto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  cryptoList: any[] = [];
  filteredCryptoList: any[] = [];

  constructor(private cryptoService: CryptoService) { }

  ngOnInit() {
    this.loadCryptoList();
  }

  // Load the list of the top 20 cryptocurrencies.
  loadCryptoList() {
    this.cryptoService.getTop20Cryptos()
      .then(data => {
        this.cryptoList = data;
        this.filteredCryptoList = this.cryptoList; // Initialize filtered list
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching crypto list:', error);
      });
  }

  // Search for cryptocurrencies based on the user's input.
  searchCrypto(event: any) {
    const searchTerm = event.detail.value.toLowerCase();

    if (!searchTerm) {
      this.filteredCryptoList = this.cryptoList;
      return;
    }

    this.filteredCryptoList = this.cryptoList.filter(crypto => {
      return crypto.name.toLowerCase().includes(searchTerm) ||
        crypto.symbol && crypto.symbol.toLowerCase().includes(searchTerm);
    });
  }
}
