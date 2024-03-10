import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.css']
})
export class CategorydetailsComponent implements OnInit{
  constructor(private _ProductService:ProductService ,private _ActivatedRoute:ActivatedRoute){}
  categoryId:string |null=''; 
  categoryDetails:any
  ngOnInit(): void {
       this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
         this.categoryId=params.get('id')
        }
       })

       this._ProductService.getCategoryDetials(this.categoryId).subscribe({
        next:(response)=>{
           console.log(response);
           this.categoryDetails=response.data;
        }
       })


     
  }
}
