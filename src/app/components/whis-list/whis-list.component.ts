import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhishlistService } from 'src/app/shared/services/whishlist.service';
import { Product } from 'src/app/shared/interface/product';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { TextcutPipe } from 'src/app/shared/pipe/textcut.pipe';

@Component({
  selector: 'app-whis-list',
  standalone: true,
  imports: [CommonModule ,RouterLink ,TextcutPipe ],
  templateUrl: './whis-list.component.html',
  styleUrls: ['./whis-list.component.css']
})
export class WhisListComponent implements OnInit{
  products:Product[]=[];
  wishListData:string[]=[];


  constructor(private _WhishlistService:WhishlistService ,private _ToastrService:ToastrService ,private _Renderer2:Renderer2 ,private _CartService:CartService){}
  ngOnInit(): void {
      this._WhishlistService.getWhislist().subscribe({
        next:(response)=>{
          this.products=response.data
          const newData =response.data.map( (item:any)=>item._id)
          this.wishListData=newData;
           
        }
      })
  }
  trackByProductId(index: number, product: Product ): any {
    return product._id; 
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
           this._ToastrService.success(response.message)
        this.wishListData=response.data;
        const newProductData =this.products.filter( (item)=>this.wishListData.includes(item._id) )
        this.products=newProductData
     }
    })
   }
   addWhish(id:string):void{
    this._WhishlistService.addToWhislist(id).subscribe({
     next:(response)=>{
       this._ToastrService.success(response.message)
       this.wishListData=response.data;
     }
 
    })
   }
 
   
 
}
