import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../services/crypto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  cryptoList: any[] = [];

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.loadCryptoList();
  }

  loadCryptoList() {
    this.cryptoService.getTop20Cryptos() 
      .then(data => {
        this.cryptoList = data;
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching crypto list:', error);
      });
  }
}
