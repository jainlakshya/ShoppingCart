import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';  
import { Observable, of, throwError, pipe} from "rxjs"
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public apiURL:string="http://localhost:8083/products/getProductDetails";
  constructor(private httpClient:HttpClient) { }

  getAllProducts ()
  {
    return this.httpClient.get(this.apiURL)
    .pipe(
      map(res => res),
       catchError( this.errorHandler)
      );
  }
  addProductToCart(prodcuts: any) {
    localStorage.setItem("product", JSON.stringify(prodcuts));
  }
  getProductFromCart() {
    //return localStorage.getItem("product");
    return JSON.parse(localStorage.getItem('product'));
  }
  removeAllProductFromCart() {
    return localStorage.removeItem("product");
  }
  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} 
}