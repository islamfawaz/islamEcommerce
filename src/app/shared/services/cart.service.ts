import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

 cartNumber:BehaviorSubject<number>=new BehaviorSubject(0);

  constructor(private _HttpClient:HttpClient) { }

  
  addProduct(productId:string):Observable<any>{
   return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
   {
    "productId":productId
  },
  
   )
  }
  getCart():Observable<any>{
     return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,)
  }

  
  updateCart(productId: string ,  count: number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,

    {
      "count":count
    })
  }

  remove(productId: string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, )
  }

  removeAll():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,  )
  }


  checkOut(cartId:string ,userData:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`
    ,{
        shippingAddress:userData
     }
    )
  }
}
