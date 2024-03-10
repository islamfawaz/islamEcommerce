import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(private _FormBuilder: FormBuilder, private _ActivatedRoute: ActivatedRoute ,private _CartService:CartService) { }

  checkOutForm: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: [''],
    city: ['']
  })

   cartId:any='';
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (parms) => {
        this.cartId=parms.get('id');
      }
    })

  }

  handleForm(): void {
    this._CartService.checkOut(this.cartId,this.checkOutForm.value).subscribe({
      next:(response)=>{
       if (response.status == "success") {
         window.open(response.session.url,"_self");
       }
         
      }
    })
  }
}
