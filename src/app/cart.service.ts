import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './products';
import { CookieService } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: Product[] = [];
  cookies: Object = {};
  keys: Array<string> = [];

  constructor(private http: HttpClient,
              public cookieService: CookieService) {
    this.update();
  }

  update() {
    this.cookies = this.cookieService.getAll();
    this.keys = Object.keys(this.cookies);
  }

  addToCart(product: Product) {
    this.items.push(product);
    this.cookieService.set('cartItemsCount', this.items.length.toString());
    this.update();
  }

  getItems() {
    if (this.cookieService.get('cartItemsCount') != '') {
      console.log('count ' + this.cookieService.get('cartItemsCount'));
    }

    return this.items;
  }

  clearCart() {
    this.items = [];
    this.cookieService.delete('cartItemsCount');
    this.update();
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{type: string, price: number}[]>('/assets/shipping.json');
  }
}
