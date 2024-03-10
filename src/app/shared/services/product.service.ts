import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  getProduct(pageNo:number=1):Observable<any>{
   return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNo}`);
  }

  getCategory():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/categories');
   }

   getProductDetials(id:string | null):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
   }

   
   getAllCetgory():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   }

   getCategoryDetials(id:string | null):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)

   }

   
   getBrands():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`);
   }
   
 
}
