import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductcartserviceService {

  constructor(private note: HttpClient,
    private service: HttpService) { }
  url = environment.baseUrl;/**url */

  addToCart(body) {
    let url = this.url + "productcarts/addToCart";
    return this.service.httpPost(url, body);
  }

  getCart(cartId) {
    let url = this.url + "productcarts/getCartDetails/"+cartId;
    return this.service.httpget(url);
  }
}
