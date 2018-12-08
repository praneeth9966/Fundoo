import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { ProductcartserviceService } from 'src/app/core/services/productcart/productcartservice.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  constructor(public userService: UsersService,
    private cartService:ProductcartserviceService) { }

  ngOnInit() {
    this.getCartDetails();
  }
  private content;
  private name;
  private price;
  private desc;
  private product = localStorage.getItem("cartId");
  private productId;

  getCartDetails() {
    this.cartService.getCart(this.product)
    .subscribe(response => {
      console.log('cartDetails', response);
      this.productId = response['data']['product']['id']
      this.name = response['data']['product']['name']
      this.price = response['data']['product']['price']
      this.desc = response['data']['product']['description']
      console.log(this.productId);
    });
  }

}
