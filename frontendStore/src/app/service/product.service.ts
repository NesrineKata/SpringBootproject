import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../entity/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {
   }
   getProducts(){
     return this.http.get<Product[]>("http://localhost:8080/products/get");
   }
   getProductsByCat(id:number){
    return this.http.get<Product[]>("http://localhost:8080/products/getprodbycat/"+id);
  }
}
