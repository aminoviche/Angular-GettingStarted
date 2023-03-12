import { Injectable } from "@angular/core";
import { IProduct } from "./product";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable, catchError, tap, throwError, map } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class ProductService{

    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient){}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl);
      }

      getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts()
          .pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id))
          );
      }
}

