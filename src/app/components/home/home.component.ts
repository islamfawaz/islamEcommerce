import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/interface/product';
import { RouterLink } from '@angular/router';
import { TextcutPipe } from 'src/app/shared/pipe/textcut.pipe';
import { Category } from 'src/app/shared/interface/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from 'src/app/shared/services/whishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink ,TextcutPipe ,CarouselModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products:Product[]=[];
  categories:Category[]=[];
  wishListData:string[]=[];
  
  
  constructor(private _ProductService:ProductService ,private _CartService:CartService ,private _ToastrService:ToastrService ,private _Renderer2:Renderer2 ,private _WhishlistService:WhishlistService){}
  ngOnInit(): void {
      this._ProductService.getProduct().subscribe({
        next:(response)=>{
          this.products=response.data;
          console.log(response.data);
          
        }
      })


      this._ProductService.getCategory().subscribe({
        next:(response)=>{
          this.categories=response.data;
        }
      })
      this._WhishlistService.getWhislist().subscribe({
        next:(response)=>{
           const newData =response.data.map( (item:any)=>item._id)
           this.wishListData=newData;
           console.log('daaa',response.count);
           this._WhishlistService.whishListNo.next(response.count); 
           
        }
      })

  }
  trackByProductId(index: number, product: Product): any {
    return product._id; 
  }

  trackByCategoryId(index: number, category: Category): any {
    return category._id;
  }
  

  addWhish(id:string):void{
   this._WhishlistService.addToWhislist(id).subscribe({
    next:(response)=>{
      this._ToastrService.success(response.message)
      this.wishListData=response.data;
    }

   })
  }


  categoryOptions: OwlOptions = {
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:1000,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }


  mainSliderOptions: OwlOptions = {
    autoplayTimeout:3500,
    autoplaySpeed:1000,
    autoplay:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
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
  removeFav(id:string):void{
   this._WhishlistService.deleteWhislist(id).subscribe({
    next:(response)=>{
       console.log(response);
       this._ToastrService.success(response.message)
       this.wishListData=response.data;
 
       
    }
   })
  }

}
