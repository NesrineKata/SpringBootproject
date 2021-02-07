import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../entity/Category';
import { Product } from '../entity/Product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getCategories(){
    return this.http.get<Category[]>("http://localhost:8080/api/store/categories/get");
  }
  getCategory(id:number){
    return this.http.get<Category>("http://localhost:8080/api/store/categories/"+id);
  }
  getProductSearch(car:string){
    return this.http.get<Product[]>("http://localhost:8080/api/store/categories/search/"+car);
  }

}
