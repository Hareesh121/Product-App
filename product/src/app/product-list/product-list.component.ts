import { Component, OnInit } from '@angular/core';
import{ProductModel} from './product.model';
import{ProductService}from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title:String='Product List';
  //PRoduct is the model class for a product item
  products:ProductModel[];
  //image properties
  imageWidth:number=50;
  imageMargin:number=2;
  
showImage: boolean = false;
//creating service object for calling getProducts()
  constructor(private productService:ProductService, private router:Router) { }
// title:String="Product-List";

toggleImage():void{
  this.showImage = !this.showImage;
}
doUpdate(product){
  this.productService.setter(product);
  console.log('function called')
  this.router.navigate(['/edit'])
}


  ngOnInit(): void {
    //calling getProduct() and loading the products to product array
    this.productService.getProducts().subscribe((data)=>{
      this.products= JSON.parse(JSON.stringify(data));
    })
    
  }
deleteItem(product){
  this.productService.deleteProduct(product._id)
  .subscribe(res=>{
    this.products.splice(this.products.indexOf(product),1);
    // this.router.navigate(['/'])
  })
}
}
