import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'https://api.coincap.io/v2';

  constructor() { }

  getTop20Cryptos() {
    return axios.get(`${this.apiUrl}/assets`, {
      params: {
        limit: 20, // Get the top 20 assets
        sort: 'marketCapUsd', // Sort by market capitalization
        order: 'desc' // Sort in descending order
      }
    })
      .then(response => response.data.data)
      .catch(error => {
        throw error;
      });
  }

  getCryptoDetails(cryptoId: string): Promise<any> {
    const lowerCaseCryptoId = cryptoId.toLowerCase();

    return axios.get(`${this.apiUrl}/assets/${lowerCaseCryptoId}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  getCryptoCandles(baseId: string, quoteId: string, interval: string, exchange: string): Promise<any> {
    return axios.get(`${this.apiUrl}/candles`, {
      params: {
        exchange: exchange, // e.g., 'poloniex'
        interval: interval, // e.g., 'h8'
        baseId: baseId.toLowerCase(), // e.g., 'ethereum'
        quoteId: quoteId.toLowerCase() // e.g., 'bitcoin'
      }
    })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
  }
}
