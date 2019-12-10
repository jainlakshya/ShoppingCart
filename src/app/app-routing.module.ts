import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MycartComponent } from './mycart/mycart.component';
import { ProductdisplayComponent } from './productdisplay/productdisplay.component';


const routes: Routes = [

  {path:"mycart",component:MycartComponent},
  {path:"productCatalog",component:ProductdisplayComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
