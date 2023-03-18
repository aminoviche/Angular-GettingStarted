import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  this.productService.getProducts().subscribe({
    next: products => {
      this.products = products;
      this.filteredProducts = this.products;
    },
   error :(err) => console.log(err)

  })
  }

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

   toogleImage(){
    this.showImage= !this.showImage;
  }


  performFilter(filterBy:string): IProduct[] {
    filterBy = filterBy.toLowerCase();
      return this.products.filter((product : IProduct)=> product.productName.toLowerCase().includes(filterBy));
  }

}
