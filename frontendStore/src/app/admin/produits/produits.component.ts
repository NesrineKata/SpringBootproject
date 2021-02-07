import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/entity/Product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  products: Array<Product>;
  //booksRecieved: Array<Book>;
  selectedProduct: Product;
  action: string;

  constructor(private prodService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.prodService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
   
   this.route.queryParams.subscribe(
      (params) => {
        this.action=params.action;
        const id= params.id;
        if (id) {
          this.selectedProduct = this.products.find(p => p.productId ==id);
        }
      });
    
   /*
    this.route.params.subscribe(
      (params) => {
        this.action = params.action;
	      const id = params['id'];
        if (id) {
          this.selectedProduct = this.products.find(p => {
            return p.productId === +id;
          });
        }
      }
    );
    */
    
  }

 
  handleSuccessfulResponse(response) {
  
    this.products = response;
  }

  addProduct() {
    this.selectedProduct = new Product();
    this.router.navigate(['admin', 'produits'], { queryParams: { action: 'add' } });
  }

  viewProduct(id: number) {
    this.router.navigate(['admin', 'produits'], { queryParams: { id, action: 'view' } });
  }
}


