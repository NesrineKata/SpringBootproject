import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtResponse } from '../entity/JwtResponse';
import { Product} from '../entity/Product';
import { ProductInOrder} from '../entity/ProductInOrder';

import { CartService } from '../service/cart.service';

import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products:Array<Product>;
  // $productsRecieved;
  info :any;
  currentUserSubscription: Subscription;
  name$;
  name: string;
  currentUser: JwtResponse;
  constructor(private router:Router,public userService:UserService,private prodService:ProductService,private api:CartService) {}
  ngOnInit(){
    this.name$ = this.userService.name$.subscribe(aName => this.name = aName);
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
        this.currentUser = user;
     
    });
    this.prodService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    

  }

  handleSuccessfulResponse(response) {
    this.products = response;
    console.log(this.products);
  }
  addToCart(e) {
    if(this.currentUser){
    this.api.addItem(e).subscribe(res => {
      console.log(res);
    })
    }
    else 
      this.router.navigateByUrl("/login");
  }
 
  

 /*  ngOnInit(){}
   this.prodService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    
  }
  andleSuccessfulResponse(response) {
    this.$products = new Array<Product>();
    //get books returned by the api call
    this.$productsRecieved = response;
  for (const prod of this.$productsRecieved) {
  
    const productwithRetrievedImageField = new Product();
    productwithRetrievedImageField.productId=prod.id;
    productwithRetrievedImageField.productName = prod.productName;
    populate retrieved image field so that book image can be displayed
    productwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + prod.picByte;
    productwithRetrievedImageField.productPrice = prod.productPrice;
    productwithRetrievedImageField.picByte=prod.picByte;
    this.$products.push(productwithRetrievedImageField);

  }
}
  */

}
