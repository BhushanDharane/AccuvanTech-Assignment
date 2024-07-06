import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' }, // Default route
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id/edit', component: ProductModalComponent },
  { path: 'products/new', component: ProductModalComponent },
  // Add more routes as needed
  { path: '**', redirectTo: '/products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
