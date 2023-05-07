import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component_sort.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  headers = ['Name', 'Product', 'Code', 'Available', 'Price', 'star rating'];
  pageTitle = 'Product List';
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;


  constructor(private productService: ProductService,
    private router: Router) { }

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

  fireEvent(message: string):void{
    this.pageTitle = 'Product List' + message;
  }

  deleteProduct(id:number):void{
    
    this.productService.deleteProduct(id).subscribe({
      next:()=> {
        console.log("delete" + id);
        this.router.navigate(["welcome"]);
      },
      error : err =>console.log("delete" + err)
    })
  }

}
