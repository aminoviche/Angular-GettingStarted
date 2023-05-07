import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailGuard } from './product-detail.guard';
import { ProductEditComponent } from './product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductData } from './product-data';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent

  ],
  imports: [
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      },
      {
        path: 'products/:id/edit',

        component: ProductEditComponent
      }
    ]),
    SharedModule
  ]
})
export class ProductModule { }
