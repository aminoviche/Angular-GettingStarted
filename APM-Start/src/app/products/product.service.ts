import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, tap, throwError, of } from 'rxjs';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private productUrl = 'api/products/products.json';

  private productUrl = 'api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // Get one product
  // Since we are working with a json file, we can only retrieve all products
  // So retrieve all products and then find the one we want using 'map'
  // getProduct(id: number): Observable<IProduct> {
  //   return this.getProducts()
  //     .pipe(
  //       map((products: IProduct[]) => products.find(p => p.id === id))
  //     );
  // }

  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    
    const url = `${this.productUrl}/${id}`;
    return this.http.get<IProduct>(url)
      .pipe(
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  createProduct(product : IProduct): Observable<IProduct> {
  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = null;
    return this.http.post<IProduct>(this.productUrl, product, {headers})
      .pipe(
        tap(data => console.log('save product: ', data.id)),
        catchError(this.handleError)
      );
  }

  updateProduct(product : IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/${product.id}`;
    return this.http.put<IProduct>(url, product, {headers})
      .pipe(
        tap(() => console.log('update product: ', product.id)),
        map(() => product),
        catchError(this.handleError)
      );
  }


  deleteProduct(id : number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productUrl}/${id}`;
    return this.http.delete<IProduct>(url, {headers})
      .pipe(
        tap(() => console.log('delete product: ',id)),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }


  private initializeProduct(): IProduct {
    // Return an initialized object
    return {
      id: 0,
      productId : 0,
      productName: '',
      productCode: '',
      tags: [''],
      releaseDate: '',
      price: 0,
      description: '',
      starRating: 0,
      imageUrl: ''
    };
  }

}
