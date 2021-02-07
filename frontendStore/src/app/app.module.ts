import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsHeaderComponent } from './bs-header/bs-header.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProduitsComponent } from './admin/produits/produits.component';
import { ViewproductComponent } from './admin/produits/viewproduct/viewproduct.component';
import { AddproductComponent } from './admin/produits/addproduct/addproduct.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CookieService } from 'ngx-cookie-service';
import { authInterceptorProviders } from './_interceptors/jwt-interceptor.service';
import { UsersComponent } from './admin/users/users.component';
import { AdduserComponent } from './admin/users/adduser/adduser.component';
import { ViewuserComponent } from './admin/users/viewuser/viewuser.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ViewcategoryComponent } from './admin/categories/viewcategory/viewcategory.component';
import { AddcategoryComponent } from './admin/categories/addcategory/addcategory.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { PaymentComponent } from './payment/payment.component';

import { NgxStripeModule } from 'ngx-stripe';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    BsHeaderComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ProduitsComponent,
    ViewproductComponent,
    AddproductComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CartItemComponent,
    UsersComponent,
    AdduserComponent,
    ViewuserComponent,
    CategoriesComponent,
    ViewcategoryComponent,
    AddcategoryComponent,
    ProductpageComponent,
    PaymentComponent,
    SearchComponent,
  ],
  imports: [
    NgxStripeModule.forRoot('pk_test_51IFiXoAE6Ixp3fxxIVwgn4XHav4gOoAZk0gC5IJylVU01Ul9ABwRLhs13nA6lEo3fZkonyKy1YsjySFODOqdqtKL00PXOmBSr9'),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  


    RouterModule.forRoot([ {path:'', component: HomeComponent},
    {path:'products/category/:id', component: ProductsComponent},
    {path:'admin/produits',component:ProduitsComponent},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent },
    { path: 'cart', component: CartItemComponent },
    {path:'admin/users',component:UsersComponent},
    {path:'admin/categories',component:CategoriesComponent},
    { path: 'payment', component: PaymentComponent },
    {path:'searchhome',component:SearchComponent},
    {path:'profile',component:ProfileComponent},


    


   
  ]),
  ],
  providers: [CookieService,
    authInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule { }
