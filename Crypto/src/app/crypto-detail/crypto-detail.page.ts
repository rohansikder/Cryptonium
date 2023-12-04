import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from '../services/crypto.service'; 


@Component({
  selector: 'app-crypto-detail',
  templateUrl: './crypto-detail.page.html',
  styleUrls: ['./crypto-detail.page.scss'],
})
export class CryptoDetailPage implements OnInit {
  cryptoDetails: any;
  cryptoName: string = '';

  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const cryptoNameParam = params.get('name');
      if (cryptoNameParam) {
        this.cryptoName = cryptoNameParam;
        this.loadCryptoDetails(this.cryptoName);
      } else {
        console.error('Crypto name parameter is missing');
      }
    });
  }

  loadCryptoDetails(cryptoId: string) {
    this.cryptoService.getCryptoDetails(cryptoId).then(data => {
      this.cryptoDetails = data.data;
      console.log(data);
    }).catch(error => {
      console.error(error);
    });
  }
  
}
