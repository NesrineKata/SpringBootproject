import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/entity/Category';
import { Product } from 'src/app/entity/Product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  @Input()
  p: Product;
  @Output()
  prodAddedEvent= new EventEmitter();  
  imgURL: string;
  prod:Product;
  categories:Array<Category>;
  selectedCat=1;

  constructor(private serviceCat:CategoryService,private  http:ProductService,private router:Router) { }
 
  ngOnInit(): void {
    this.serviceCat.getCategories().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
   
  
  }
  onChange(val) {
    this.selectedCat=val;
  
}

  handleSuccessfulResponse(response) {
    this.categories = response;
   
  }

  saveProduct(){
      this.p.avaibility=1;
      this.prod=new Product();
    //  let c:Category;
      //this.p.url=this.imgURL;
     
     /* this.categories.forEach(e=>{
          if(e.id==this.selectedCat){
            c=e;  
          }
      })
     
     this.prod.avaibility=1;
     this.prod.url=this.imgURL;
     this.prod.category=this.selectedCat;
     this.prod.stock=this.p.stock;
     this.prod.productName=this.p.productName;
     this.prod.productPrice=this.p.productPrice
      */
     this.p.category=this.selectedCat;

       console.log(this.p);
       console.log(this.prod);
      this.http.addProduct(this.p).subscribe(
          (p) => {
            this.prodAddedEvent.emit();
            this.router.navigate(['admin', 'produits']);
          }
        );
      
    }
   

  public onUrlChanged(event) {
    console.log(event);
    this.imgURL =event.target.value;
    console.log(this.imgURL);
    console.log( event.target.value);

  }
}
