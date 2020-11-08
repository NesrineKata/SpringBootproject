import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../entity/Product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Array<Product>;
  selectedCatId:number;
  constructor(private route: ActivatedRoute,private prodService:ProductService) { 
  }
  ngOnInit(){
    this.route.params.subscribe(
      params => {console.log(params);
        this.selectedCatId=params.id;}
    );
    
  this.prodService.getProductsByCat(this.selectedCatId).subscribe(
    response => this.handleSuccessfulResponse(response),
  );
}

handleSuccessfulResponse(response) {
  this.products = response;
}
}
