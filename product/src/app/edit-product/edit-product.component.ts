import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import{ProductModel} from '../product-list/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  title:String='Product Edit';
products:ProductModel[];
product =new ProductModel(null,null,null,null,null,null,null,null);
  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.product=this.productService.back();
  }
  Update()
  {
    this.productService.updateItem(this.product);
    console.log("called");
    alert("success");
    this.router.navigate(['/']);
  }
}
