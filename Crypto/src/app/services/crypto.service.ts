import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'https://api.coincap.io/v2';

  constructor() { }

  // Get the top 20 cryptocurrencies sorted by market capitalization.
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

  // Get details for a specific cryptocurrency by its ID.
  getCryptoDetails(cryptoId: string): Promise<any> {
    const lowerCaseCryptoId = cryptoId.toLowerCase();
    console.log(`Fetching details for crypto: ${lowerCaseCryptoId}`); // Check if this logs

    return axios.get(`${this.apiUrl}/assets/${lowerCaseCryptoId}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  // Get candlestick data for a cryptocurrency pair.
  getCryptoCandles(baseId: string, quoteId: string, interval: string, exchange: string): Promise<any> {
    return axios.get(`${this.apiUrl}/candles`, {
      params: {
        exchange: exchange, // e.g., 'poloniex'
        interval: interval, // e.g., 'h8'
        baseId: baseId.toLowerCase(), // e.g., 'ethereum'
        quoteId: quoteId.toLowerCase() // e.g., 'bitcoin'
      }
    })
      .then(response => {
        console.log('Response from getCryptoCandles:', response.data);

        return response.data;
      })
      .catch(error => {
        console.error('Error in getCryptoCandles:', error);
        throw error;
      });
  }

  // Add this method to fetch historical data for any cryptocurrency
  getHistory(cryptoId: string, interval: string): Promise<any> {
    const url = `${this.apiUrl}/assets/${cryptoId.toLowerCase()}/history?interval=${interval}`;

    return axios.get(url)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }
}
