import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {
  productId!: number;
  productForm: FormGroup;
  categories: string[] = [
    'Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports & Outdoors',
    'Health & Personal Care', 'Toys & Games', 'Automotive', 'Beauty & Grooming', 'Office Supplies'
  ];
  route: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      categories: [[], Validators.required],
      price: ['', Validators.required],
      availability: this.fb.group({
        inStock: [true],
        quantity: [0]
      }),
      attributes: this.fb.array([])
    });

    if (data && data.product) {
      this.productForm.patchValue(data.product);
      data.product.attributes.forEach(attr => {
        this.attributes.push(this.fb.group(attr));
      });
    }
  }

  ngOnInit(): void {
    
  }

  saveProduct(): void {
    // Save product logic
    this.router.navigate(['/products']); // Navigate back to product list
  }

  get attributes() {
    return this.productForm.get('attributes') as FormArray;
  }

  addAttribute() {
    this.attributes.push(this.fb.group({ key: '', value: '' }));
  }

  removeAttribute(index: number) {
    this.attributes.removeAt(index);
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if (this.data && this.data.product) {
        this.productService.updateProduct(product).subscribe(() => this.dialogRef.close(true));
      } else {
        this.productService.createProduct(product).subscribe(() => this.dialogRef.close(true));
      }
    }
  }

  onCancel() {
     this.dialogRef.close();
    // this.router.navigate(['/products']);
  }
}
