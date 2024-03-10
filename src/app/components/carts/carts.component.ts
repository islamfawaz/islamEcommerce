import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/shared/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule ,RouterLink],
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit{
  cartDetails:any ;
   constructor(private _CartService:CartService, private _Renderer2:Renderer2){}
   ngOnInit(): void {
      this._CartService.getCart().subscribe({
        next:(response)=>{
          this.cartDetails=response.data          
        }
      })
    }

    updateCartItem(id: any, count: number ,element1:HTMLButtonElement ,element2:HTMLButtonElement): void {
      if (count > 0) {
        this._Renderer2.setAttribute(element1,'disabled','true')
        this._Renderer2.setAttribute(element2,'disabled','true')

        this._CartService.updateCart(id, count).subscribe({
          next: (response) => {
            this.cartDetails = response.data;
            this._Renderer2.removeAttribute(element1,'disabled');
            this._Renderer2.removeAttribute(element1,'disabled');


          }
        })
      }
  
    }

    removeItem(id: any ,element:HTMLButtonElement): void {
      this._Renderer2.setAttribute(element ,'disabled','true')
      
      this._CartService.remove(id).subscribe({
          next: (response) => {
            this.cartDetails = response.data;
            this._Renderer2.removeAttribute(element ,'disabled')
            this._CartService.cartNumber.next(response.numOfCartItems)

          }
        })
      }

      removeAllItem(): void {
        
        this._CartService.removeAll().subscribe({
            next: (response) => {
                if (response.message=='success') {
                  this.cartDetails=null;
                  this._CartService.cartNumber.next(response.numOfCartItems)

                }
            }
          })
        }
  
    
   }

