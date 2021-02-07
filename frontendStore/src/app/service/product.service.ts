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
     return this.http.get<Product[]>("http://localhost:8080/api/store/products/get");
   }
   getProductsByCat(id:number){
    return this.http.get<Product[]>('http://localhost:8080/api/store/products/getprodbycat/'+id);
  }
  getproductById(id:number){
    return this.http.get<Product>('http://localhost:8080/api/store/products/getproduct/'+id);
  }
  addProduct(p:Product){
    return this.http.post<Product>('http://localhost:8080/api/store/products/add',p);
  }
  deleteById(id:number){
    return this.http.delete<Product>('http://localhost:8080/api/store/products/delete/'+id);
  }
  updateProduct(p:Product){
    return this.http.put<Product>('http://localhost:8080/api/store/products/update',p);
  }

}
