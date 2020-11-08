import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../entity/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getCategories(){
    return this.http.get<Category[]>("http://localhost:8080/categories/get");
  }

}
