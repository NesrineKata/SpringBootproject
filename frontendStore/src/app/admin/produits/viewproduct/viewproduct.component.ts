import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/entity/Product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  @Input()
  p: Product;
  @Output()
 prodDeletedEvent = new EventEmitter();
  constructor(private service:ProductService,private router:Router) { }

  ngOnInit(): void {

  }
  deleteProduct() {
    this.service.deleteById(this.p.productId).subscribe(
      (user) => {
        this.prodDeletedEvent.emit();
        this.router.navigate(['admin', 'produits']);
      }
    );
  }

}
