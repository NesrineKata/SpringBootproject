import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../entity/Product';
import { CartService } from '../service/cart.service';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products:Array<Product>;
  // $productsRecieved;
  info :any;
  car :string;
  constructor(private route:ActivatedRoute,private prodService:ProductService,private api:CartService,private catService:CategoryService) {}
  ngOnInit(){
    this.car=this.route.snapshot.paramMap.get('str');
     console.log("i want this caracter"+this.car)
    this.catService.getProductSearch(this.car).subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    this.products = response;
    console.log(this.products);
  }
  addToCart(e) {
    this.api.addItem(e).subscribe(res => {
      console.log(res);
    })
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
