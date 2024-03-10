import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/interface/product';
import { RouterLink } from '@angular/router';
import { TextcutPipe } from 'src/app/shared/pipe/textcut.pipe';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/shared/pipe/search.pipe';
import { WhishlistService } from 'src/app/shared/services/whishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule ,RouterLink,TextcutPipe ,NgxPaginationModule , FormsModule ,SearchPipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products:Product[]=[];
  pageSize:number=0;
  currentPageL:number=1;
  total:number=0;
  searchTerm:string='';



  constructor(private _ProductService:ProductService ,private _CartService:CartService ,private _ToastrService:ToastrService ,private _Renderer2:Renderer2   ,private _WhishlistService:WhishlistService){}
  
  trackByProductId(index: number, product: Product): any {
    return product._id; 
  }
  ngOnInit(): void {
    this._ProductService.getProduct().subscribe({
      next:(response)=>{
        this.products=response.data;
        this.pageSize=response.metadata.limit; 
        this.currentPageL=response.metadata.currentPage;
         this.total = response.results; 
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

  pageChanged(event:any):void{
    this._ProductService.getProduct(event).subscribe({
      next:(response)=>{
        this.products=response.data;
        this.pageSize=response.metadata.limit; 
        this.currentPageL=response.metadata.currentPage;
         this.total = response.results; 
      }
    })   
  }
  removeFav(id:string):void{
    this._WhishlistService.deleteWhislist(id).subscribe({
     next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message)
        
     }
    })
   }
   addWhish(id:string):void{
    this._WhishlistService.addToWhislist(id).subscribe({
     next:(response)=>{
       console.log(response);
       this._ToastrService.success(response.message)
       
     }
 
    })
   }
}
