import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CryptoDetailPage } from './crypto-detail.page';

describe('CryptoDetailPage', () => {
  let component: CryptoDetailPage;
  let fixture: ComponentFixture<CryptoDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CryptoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
