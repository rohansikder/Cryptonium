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
}
