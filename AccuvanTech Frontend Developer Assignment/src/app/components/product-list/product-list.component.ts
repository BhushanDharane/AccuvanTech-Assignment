import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { DeleteConfirmationModalComponent } from '../delete-confirmation-modal/delete-confirmation-modal.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'categories', 'availability', 'price', 'quantity', 'actions'];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  openProductModal(product?: Product) {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '400px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  confirmDelete(product: Product) {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent, {
      width: '300px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProductById(product.id!).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }
}
