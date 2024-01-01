import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from '../services/crypto.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-crypto-detail',
  templateUrl: './crypto-detail.page.html',
  styleUrls: ['./crypto-detail.page.scss'],
})
export class CryptoDetailPage implements OnInit, AfterViewInit {
  // Properties to store cryptocurrency details and selected name
  cryptoDetails: any;
  cryptoName: string = '';
  currentTimeFrame: string = 'd1'; // Default timeframe for data display
  chart: Chart | undefined; 

  constructor(
    private route: ActivatedRoute, // ActivatedRoute to access route parameters
    private cryptoService: CryptoService // CryptoService for API calls
  ) {
    Chart.register(...registerables); // Register chart components for Chart.js
  }

  ngOnInit() {
    // Subscribe to route parameters on component initialization
    this.route.paramMap.subscribe(params => {
      const cryptoNameParam = params.get('name');
      if (cryptoNameParam) {
        this.cryptoName = cryptoNameParam;
        // Load crypto details and candlestick data for the given crypto name
        this.loadCryptoDetails(this.cryptoName);
        this.loadCandlestickData(this.cryptoName, this.currentTimeFrame);
      } else {
        console.error('Crypto name parameter is missing');
      }
    });
  }

  ngAfterViewInit() {
    // After the view initializes, load historical data for the cryptocurrency
    this.loadHistoricalData(this.cryptoName, this.currentTimeFrame);
  }

  // Method to load historical data based on cryptocurrency ID and timeframe
  loadHistoricalData(cryptoId: string, timeFrame: string) {
    this.cryptoService.getHistory(cryptoId, timeFrame).then(historyData => {
      // Create a chart with the obtained historical data
      this.createChart(historyData.data);
    }).catch(error => {
      console.error('Error fetching historical data:', error);
    });
  }

  // Event handler for time frame selection changes
  onTimeFrameChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedTimeFrame = selectElement.value;
    // Reload historical data with the new time frame
    this.loadHistoricalData(this.cryptoName, selectedTimeFrame);
  }

  // Method to create a chart using Chart.js with the provided historical data
  createChart(historicalData: any[]) {
    const ctx = document.getElementById('cryptoChart') as HTMLCanvasElement;
    
    if (this.chart) {
      this.chart.destroy(); // Clear the previous chart if it exists
    }

    const dates = historicalData.map(data => new Date(data.time).toLocaleDateString());
    const prices = historicalData.map(data => data.priceUsd);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: `${this.cryptoName} Price (USD)`,
          data: prices,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }

  // Method to load details of a specific cryptocurrency
  loadCryptoDetails(cryptoId: string) {
    this.cryptoService.getCryptoDetails(cryptoId).then(data => {
      this.cryptoDetails = data.data;
      console.log(data);
    }).catch(error => {
      console.error(error);
    });
  }

  // Method to load candlestick data for a cryptocurrency
  loadCandlestickData(cryptoId: string, timeFrame: string) {
    const baseId = cryptoId;
    const quoteId = 'usd';
    const interval = timeFrame; // Use the currently selected time frame
    const exchange = 'binance';

    this.cryptoService.getCryptoCandles(baseId, quoteId, interval, exchange)
      .then(candleData => {
        console.log('Candle Data:', candleData);
      }).catch(error => {
        console.error('Error fetching candlestick data:', error);
      });
  }
}
