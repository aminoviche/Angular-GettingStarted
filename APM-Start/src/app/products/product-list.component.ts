import { Component, OnInit,OnDestroy } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy {

  pageTitle = 'Titre de la Page';
  products:IProduct[] = [] ;
  filteredProducts:IProduct[] = [] ;
  displayImage = false;
  private _listFilter = '';
  sub!: Subscription;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
   
        this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      //error: err => this.errorMessage = err
    });
  }

  showImage(){
    this.displayImage = !this.displayImage;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy));
  }

  showRating(message:string){
    this.pageTitle = 'Titre de la Page' + message;
  }

 }


