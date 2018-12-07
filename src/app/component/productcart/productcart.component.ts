import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UsersService } from 'src/app/core/services/users/users.service';
import { ProductcartDialogComponent } from '../productcart-dialog/productcart-dialog.component';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { ProductcartserviceService } from 'src/app/core/services/productcart/productcartservice.service';

@Component({
  selector: 'app-productcart',
  templateUrl: './productcart.component.html',
  styleUrls: ['./productcart.component.scss']
})

export class ProductcartComponent implements OnInit {
  public cards = [];
  private service: any;

  constructor(public userService: UsersService,public dialog: MatDialog,
    private cartService:ProductcartserviceService) { }
  ngOnInit() {
    this.getCards();
  }

  getCards() {
    this.userService.getDataService1()
      .subscribe((response) => {
        let data = response["data"];
        for (let i = 0; i < data.data.length; i++) {
          this.cards.push(data.data[i]);
        }
        console.log(this.cards)
      })
  }

  respond(card) {
    this.service = card.name;
    card.select = !card.select;
    for (let i = 0; i < this.cards.length; i++) {
      if (card.name == this.cards[i].name) { continue }
      this.cards[i].select = false;
    }
  }

  productcart(data) { 

    this.cartService.addToCart(
      {"productId":data.id})
      .subscribe(response => {
        console.log(response);
       var response1= response['data']['details']['id']
        console.log(response1);
        localStorage.setItem("cartId",response1);
      })

    this.dialog.open(ProductcartDialogComponent, {
      // width: '500px',
      height:'auto',
      maxWidth:'auto',
      panelClass: 'myapp-no-padding-dialog',
      data: data
    });
  }

}
