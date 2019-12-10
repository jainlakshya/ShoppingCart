import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/Product.Model';
import { ProductService } from '../Services/product.service';
import { IAlert } from '../Models/IAlert';

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
  public alerts: Array<IAlert> = [];

  constructor(private productService:ProductService) 
  {
    
   }

  ngOnInit() {
    this.productAddedTocart=this.productService.getProductFromCart();
    for (let i in this.productAddedTocart) {
      this.productAddedTocart[i].Quantity=1;
   }
   this.productService.removeAllProductFromCart();
   this.productService.addProductToCart(this.productAddedTocart);
   this.calculteAllTotal(this.productAddedTocart);

  }
  onAddQuantity(product:Product)
  {
    //Get Product
    this.productAddedTocart=this.productService.getProductFromCart();
    this.productAddedTocart.find(p=>p.Id==product.Id).Quantity = product.Quantity+1;
    //Find produc for which we want to update the quantity
    //let tempProd= this.productAddedTocart.find(p=>p.Id==product.Id);  
    //tempProd.Quantity=tempProd.Quantity+1;
   
    //this.productAddedTocart=this.productAddedTocart.splice(this.productAddedTocart.indexOf(product), 1)
   //Push the product for cart
   // this.productAddedTocart.push(tempProd);
  this.productService.removeAllProductFromCart();
  this.productService.addProductToCart(this.productAddedTocart);
  this.calculteAllTotal(this.productAddedTocart);
   
  }
  onRemoveQuantity(product:Product)
  {
    this.productAddedTocart=this.productService.getProductFromCart();
    this.productAddedTocart.find(p=>p.Id==product.Id).Quantity = product.Quantity-1;
    this.productService.removeAllProductFromCart();
    this.productService.addProductToCart(this.productAddedTocart);
    this.calculteAllTotal(this.productAddedTocart);

  }
  calculteAllTotal(allItems:Product[])
  {
    let total=0;
    for (let i in allItems) {
      total= total+(allItems[i].Quantity *allItems[i].UnitPrice);
   }
   this.allTotal=total;
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
} 

}