import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsHeaderComponent } from './bs-header/bs-header.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';


@NgModule({
  declarations: [
    AppComponent,
    BsHeaderComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([ {path:'', component: HomeComponent}]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
