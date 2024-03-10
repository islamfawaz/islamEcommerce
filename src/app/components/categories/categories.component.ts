import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule ,RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
 constructor(private _ProductService:ProductService){}
  categories:any;

  ngOnInit(): void {
     this._ProductService.getAllCetgory().subscribe({
      next:(response)=>{
         console.log(response.data);  
         this.categories=response.data; 
      }
     })
  }

}
