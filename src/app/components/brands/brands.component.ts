import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{
constructor(private _ProductService:ProductService){}
brands:any
ngOnInit(): void {
    this._ProductService.getBrands().subscribe({
      next:(response)=>{
        console.log(response.data);
        this.brands=response.data
      }
    })
}
}
