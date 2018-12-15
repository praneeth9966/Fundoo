import { Component, OnInit, HostListener, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UsersService } from 'src/app/core/services/users/users.service';
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductcartserviceService } from 'src/app/core/services/productcart/productcartservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Output() hovered = new EventEmitter();
  private hide = true;
  private records = {};
  private isLeftVisible = false;
  public body = {
    "email": "",
    "password": "",
    "cartId":localStorage.getItem('cartId')
  }
  private cards=[];
  private service: any;
  public  cartId=localStorage.getItem("cartId");
  private productId;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :'';
  }

  constructor(private matSnackBar: MatSnackBar, private userService: UsersService,
     private notesService: NotesService,private cartService:ProductcartserviceService) { }

  ngOnInit() {
    this.getCartDetails();
    this.getCards();
  }

  register() {
    if (!this.email.invalid) {
      this.isLeftVisible = !this.isLeftVisible
    }
    else {
      alert('invalid email');
    }
  }

  @HostListener('mouseenter', ['$event'])
  onHover(e) {
    this.hovered.emit('howdy')
  }

  login() {
    this.records = this.userService.postlogin(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        localStorage.setItem('token', data['id']);
        localStorage.setItem('firstName', data['firstName']);
        localStorage.setItem('lastName', data['lastName']);
        localStorage.setItem('userId', data['userId']);
        localStorage.setItem('email', data['email']);
        localStorage.setItem('imageUrl', data['imageUrl']);
        this.matSnackBar.open("Login Successful ", "Successful", {
          duration: 3000,
        });
        let pushToken = localStorage.getItem('pushToken')
        let body = {
          "pushToken": pushToken
        }
        this.notesService.postRegisterPushToken(body)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            data => {
              window.location.href = 'homepage';
            })
      })
  }




  getCards(){
    this.records = this.userService.getDataService1()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        let data = result['data'];
        for (let i = 0; i < data.data.length; i++) {
          data.data[i].select = false;
          this.cards.push(data.data[i])
        }
      });
  }

  getCartDetails(){ 
      this.cartService.getCart(this.cartId)
      .subscribe(result => {
        console.log(result);
         this.productId=result['data']['product']['id'];
        console.log("productId",this.productId); 
      });
  }

  // getCards() {
  //   this.userService.getDataService1()
  //     .subscribe((response) => {
  //       let data = response["data"];
  //       for (let i = 0; i < data.data.length; i++) {
  //         this.cards.push(data.data[i]);
  //       }
  //       console.log(this.cards)
  //     })
  // }

  // respond(card) {
  //   this.service = card.name;
  //   card.select = !card.select;
  //   for (let i = 0; i < this.cards.length; i++) {
  //     if (card.name == this.cards[i].name) { continue }
  //     this.cards[i].select = false;
  //   }
  // }

  /*
  This method will be executed just before Angular destroys the components
  */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}