import { Component, OnInit } from '@angular/core';
import { Category } from '../entity/Category';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  categories:Array<Category>;
  constructor(private seviceCat:CategoryService) { 
  }

  ngOnInit(): void {
    this.seviceCat.getCategories().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    this.categories = response;
  }

}
