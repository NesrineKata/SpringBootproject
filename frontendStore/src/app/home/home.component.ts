import { Component, OnInit } from '@angular/core';
import { Product } from '../entity/Product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products:Array<Product>;
 // $productsRecieved;
  constructor(private prodService:ProductService) {}
  ngOnInit(){
    this.prodService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    this.products = response;
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
