import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

product : IProduct| undefined;


  constructor(private route: ActivatedRoute,
             private productService:ProductService,
             private router: Router ) { 
    
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    if(!isNaN(id)){
      this.productService.getProduct(id).subscribe({
        next: product => this.product = product
      });
    }
  }

  back(){
    this.router.navigate(['/products']);
 
  }

}
