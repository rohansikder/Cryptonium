import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTradePage } from './add-trade.page';

describe('AddTradePage', () => {
  let component: AddTradePage;
  let fixture: ComponentFixture<AddTradePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddTradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
