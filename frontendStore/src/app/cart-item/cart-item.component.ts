import { Component, OnInit } from '@angular/core';
import { Product } from '../entity/Product';
import { CartService } from '../service/cart.service';
import { CommonModule } from '@angular/common';
import { ProductInOrder } from '../entity/ProductInOrder';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
  
})

export class CartItemComponent implements OnInit {
 
  products:Array<ProductInOrder>;
  totalSum: number = 0;
  stripePromise = loadStripe(environment.stripe_key);

  constructor(private cartService:CartService,private router: Router) {
  }
  ngOnInit() {
    this.cartService.getCart().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

  }
 /* handleSuccessfulUpdateResponse(response){
    this.products=response;
    this.totalSum=0;
    this.products.forEach(value => {
      this.totalSum = this.totalSum + (value.qnt * value.product.productPrice);
    });
  }
  */
  handleSuccessfulResponse(response) {
    //this.cart = response;
    this.products=response;
    this.totalSum=0;
    this.products.forEach(value => {
      this.totalSum = this.totalSum + (value.qnt * value.product.productPrice);
    });
    
    console.log(response);
  } 
  delete(p){
    console.log("this product should be removed"+p);
    this.cartService.remove(p.productioId).subscribe(
      response => this.cartService.getCart().subscribe(
        res => this.handleSuccessfulResponse(res),
      )
    );
    
  } 
  
  /*update(p,qnt){
    console.log("im the id "+p);
    console.log("new qnt"+qnt);
  /*   this.cartService.updateCart(p,qnt).subscribe(
      response => this.handleSuccessfulUpdateResponse(response),
      );
     
  } 
  */
  pay(){
    let amount=this.totalSum;
    this.router.navigate(['payment'], { queryParams: {amount}});
  }
  
}
 



