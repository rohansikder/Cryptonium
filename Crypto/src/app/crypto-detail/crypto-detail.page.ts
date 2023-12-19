import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from '../services/crypto.service';

@Component({
  selector: 'app-crypto-detail',
  templateUrl: './crypto-detail.page.html',
  styleUrls: ['./crypto-detail.page.scss'],
})
export class CryptoDetailPage implements OnInit {
  // Properties to store crypto details and name
  cryptoDetails: any;
  cryptoName: string = '';

  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoService,
  ) { }

  ngOnInit() {
    // Subscribe to route parameters to get the crypto name
    this.route.paramMap.subscribe(params => {
      const cryptoNameParam = params.get('name');
      if (cryptoNameParam) {
        this.cryptoName = cryptoNameParam;
        this.loadCryptoDetails(this.cryptoName);
        this.loadCandlestickData(this.cryptoName);
      } else {
        console.error('Crypto name parameter is missing');
      }
    });
  }

  // Function to load crypto details
  loadCryptoDetails(cryptoId: string) {
    this.cryptoService.getCryptoDetails(cryptoId).then(data => {
      this.cryptoDetails = data.data;
      console.log(data);
    }).catch(error => {
      console.error(error);
    });
  }

  // Function to load candlestick data (API not working)
  loadCandlestickData(cryptoId: string) {
    // Example parameters for getCryptoCandles
    const baseId = cryptoId;  // The crypto ID
    const quoteId = 'usd';    // Comparing against USD
    const interval = 'd1';    // Daily candles
    const exchange = 'binance'; // Example exchange

    this.cryptoService.getCryptoCandles(baseId, quoteId, interval, exchange)
      .then(candleData => {
        console.log('Candle Data:', candleData);
      }).catch(error => {
        console.error('Error fetching candlestick data:', error);
      });
  }
}
