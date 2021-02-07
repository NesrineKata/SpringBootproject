import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { repeat } from 'rxjs/operators';
import { Category } from '../entity/Category';
import { JwtResponse } from '../entity/JwtResponse';
import { Product } from '../entity/Product';
import { CartService } from '../service/cart.service';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Array<Product>;
  selectedCatId:number;
  category:Category;
  currentUserSubscription: Subscription;
  name$;
  name: string;
  currentUser: JwtResponse;
 // @Input() public p;
  //@Output() productAddToCart: EventEmitter<Product> = new EventEmitter<Product>();
  constructor(private router:Router,public userService:UserService,private catService:CategoryService ,private route: ActivatedRoute,private prodService:ProductService,private api:CartService) { 
  }
  ngOnInit(){
    this.name$ = this.userService.name$.subscribe(aName => this.name = aName);
  this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
   
  });
    this.route.params.subscribe(
      params => {console.log(params);
        this.selectedCatId=params.id;}
    );
  this.prodService.getProductsByCat(this.selectedCatId).subscribe(
    response => this.handleSuccessfulResponse(response),
  );
  this.catService.getCategory(this.selectedCatId).subscribe(
      response=>this.handleSuccessfulResponseCat(response)
  );

}

handleSuccessfulResponseCat(response){
  this.category=response;
}
handleSuccessfulResponse(response) {
  this.products = response;
  console.log("hello");
  for (let p of this.products ){
    console.log(p.productName);
  }
}
addToCart(e) {
  if(this.currentUser)
    this.api.addItem(e).subscribe(res => {
      console.log(res);
    })
  else 
  this.router.navigateByUrl("/login");
}
/*addToCart() {
  this.productAddToCart.emit(this.p);
}
*/
}
