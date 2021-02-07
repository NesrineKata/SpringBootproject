import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/entity/Category';
import { Order } from 'src/app/entity/Order';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  orders: Array<Order>;
  //booksRecieved: Array<Book>;
  //selectedCategory: Category;
 // action: string;

  constructor(private catService: CartService,
    private route: ActivatedRoute,
    private router: Router) { }


    ngOnInit() {
      this.refreshData();
    }
  
    refreshData() {
      this.catService.getallOrders().subscribe(
        response=>this.handleSuccessfulResponse(response)
    );
      /*
      this.catService.getCategories().subscribe(
        response => this.handleSuccessfulResponse(response)
      );
     
     this.route.queryParams.subscribe(
        (params) => {
          this.action=params.action;
          const id= params.id;
          if (id) {
            this.selectedCategory = this.categories.find(p => p.id ==id);
          }
        });
        */
  
    }
  
   
    handleSuccessfulResponse(response) {
      
      this.orders = response;
      console.log(this.orders);
    }
  /*
    addCategory() {
      this.selectedCategory = new Category();
      this.router.navigate(['admin', 'categories'], { queryParams: { action: 'add' } });
    }
  
    viewCategory(id: number) {
      this.router.navigate(['admin', 'categories'], { queryParams: { id, action: 'view' } });
    }
    */
  }