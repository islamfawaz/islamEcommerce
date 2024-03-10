import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule ,CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute ,private _ProductService:ProductService ,private _CartService:CartService ,private _ToastrService:ToastrService ,private _Renderer2:Renderer2){}
   productId:string |null='';
   productDetails:any={};



   productOption: OwlOptions  = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  



  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
           this.productId= params.get('id');
        }
      })


   this._ProductService.getProductDetials(this.productId).subscribe({
    next:({data})=>{
      console.log(data);
      this.productDetails=data;
    }
   })
   

  }


  addProductItem(id:string ,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element ,'disabled','true')


    this._CartService.addProduct(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message)
        this._Renderer2.removeAttribute(element ,'disabled')
        this._CartService.cartNumber.next(response.numOfCartItems)

      }
    })
  }

  

   

}
