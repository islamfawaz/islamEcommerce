import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[authGuard],
    loadComponent: () => import('./components/blank-layout/blank-layout.component').then((m) => m.BlankLayoutComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent) },
      { path: 'brands', loadComponent: () => import('./components/brands/brands.component').then((m) => m.BrandsComponent) },
      { path: 'carts', loadComponent: () => import('./components/carts/carts.component').then((m) => m.CartsComponent) },
      { path: 'categories', loadComponent: () => import('./components/categories/categories.component').then((m) => m.CategoriesComponent) },
      { path: 'products', loadComponent: () => import('./components/products/products.component').then((m) => m.ProductsComponent) },
      { path: 'details/:id', loadComponent: () => import('./components/details/details.component').then((m) => m.DetailsComponent) },
      { path: 'categorydetails/:id', loadComponent: () => import('./components/categorydetails/categorydetails.component').then((m) => m.CategorydetailsComponent) },

      {path:'checkout/:id',loadComponent:()=>import('./components/checkout/checkout.component').then((m)=>m.CheckoutComponent)},
      {path:'forgetpassword',loadComponent:()=>import('./components/forgetpassword/forgetpassword.component').then((m)=>m.ForgetpasswordComponent)},
      { path: 'whishlist', loadComponent: () => import('./components/whis-list/whis-list.component').then((m) => m.WhisListComponent) }
    ]
  },

  {
    path: '', loadComponent: () => import('./components/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      { path: 'login', loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./components/register/register.component').then((m) => m.RegisterComponent) },
      {path:'forgetpassword',loadComponent:()=>import('./components/forgetpassword/forgetpassword.component').then((m)=>m.ForgetpasswordComponent)},


    ]
         
  },
  {path:'**',loadComponent:()=>import('./components/notfound/notfound.component').then((m)=>m.NotfoundComponent)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
