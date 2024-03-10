import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { WhishlistService } from 'src/app/shared/services/whishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLinkActive ,RouterLink],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit{
   constructor(private _Router:Router ,private _CartService:CartService ,private _Renderer2:Renderer2,private _WhishlistService:WhishlistService){}
   cartNum:number=0;
   whishNum:number=0;


@ViewChild('navBar')navElement!:ElementRef;

@HostListener('window:scroll')
 onScroll():void{
  if (scrollY >500) {
    this._Renderer2.addClass(this.navElement.nativeElement ,'px-5')
    this._Renderer2.addClass(this.navElement.nativeElement ,'shadow')

  }
  else{
    this._Renderer2.removeClass(this.navElement.nativeElement ,'px-5')
    this._Renderer2.removeClass(this.navElement.nativeElement ,'shadow')

  }
 } 

 ngOnInit(): void {
     this._CartService.cartNumber.subscribe({
      next:(data)=>{
        this.cartNum=data;
      }

     })

     this._CartService.getCart().subscribe({
      next:(response)=>{
        this.cartNum=response.numOfCartItems;
      }
     })
     this._WhishlistService.whishListNo.subscribe({
      next:(data)=>{
       console.log('nav',data);
       this.whishNum=data;
      }
     })
     this._WhishlistService.getWhislist().subscribe({
      next:(response)=>{
              this.whishNum=response.count;    
      }
     })
 }
 
 
   signOut(){
     this._Router.navigate(['./login'])
   }


}
