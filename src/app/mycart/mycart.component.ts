import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/Product.Model';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {
  dafualtQuantity:number=1;
  productAddedTocart:Product[];
  allTotal:number;
  public globalResponse: any;

  constructor(private productService:ProductService) 
  {
    
   }

  ngOnInit() {
    this.productAddedTocart=this.productService.getProductFromCart();
   this.productService.removeAllProductFromCart();
   this.productService.addProductToCart(this.productAddedTocart);
   this.calculteAllTotal(this.productAddedTocart);

  }
  onAddQuantity(product:Product)
  {
    //Get Product
    this.productAddedTocart=this.productService.getProductFromCart();
    this.productAddedTocart.find(p=>p.id==product.id).quantity = 1+ product.quantity;
    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);
   
  }
  onRemoveQuantity(product:Product)
  {
    if(product.quantity==1){
      this.productAddedTocart = this.productAddedTocart.filter(p=>p.id !==product.id);
    }else{
      this.productAddedTocart=this.productService.getProductFromCart();
      this.productAddedTocart.find(p=>p.id==product.id).quantity = product.quantity-1;
    }
    
    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);

  }
  calculteAllTotal(allItems:Product[])
  {
    let total=0;
    for (let i in allItems) {
      total= total+(allItems[i].quantity *allItems[i].unitPrice);
   }
   this.allTotal=total;
  }

  removeAllItems(){
    this.productService.removeAllProductFromCart();
    this.productAddedTocart.splice(0);
    this.allTotal=0;

  }

}