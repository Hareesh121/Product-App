import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductModel } from '../product-list/product.model';
import{Router} from '@angular/router';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  title:String='Product Add';
  constructor(private productService:ProductService,private router:Router) { }
productItem=new ProductModel(null,null,null,null,null,null,null,null);
  ngOnInit(): void {
  }
 AddProduct()
 {
   this.productService.newProduct(this.productItem);
   console.log("called");
   alert("success");
   this.router.navigate(['/']);
 }
}
