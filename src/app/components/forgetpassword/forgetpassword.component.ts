// forgetpassword.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetpasswordService } from 'src/app/shared/services/forgetpassword.service';

@Component({
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  constructor(private _ForgetpasswordService: ForgetpasswordService ,private _Router:Router) {}

  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  email: string = '';
  userMsg:string=''
  isLoading:boolean=false

  forgotForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('')
  });

  resetPassword: FormGroup = new FormGroup({
    newPassword: new FormControl('',[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,9}$/)])
  });

  forgotPassword(): void {
    let userEmail = this.forgotForm.value;
    this.email = userEmail.email;
    this.isLoading=true;

    this._ForgetpasswordService.forgotPassword(userEmail).subscribe({
      next: (response) => {
        this.isLoading=false;

        this.userMsg=response.message;
        this.step1=false
        this.step2=true


      },
      error:(err)=>{
        this.isLoading=false;

        this.userMsg=err.error.message;

      }
    });
  }

  resetCode(): void {
    let userCode=this.resetCodeForm.value;
    this.isLoading=true;

    this._ForgetpasswordService.resetCode(userCode).subscribe({
      next:(response)=>{
        this.isLoading=false;
          this.userMsg=response.status;
           this.step2=false
           this.step3=true
      },
      error:(err)=>{
        this.isLoading=false;

        this.userMsg=err.error.message;
      }
      
      
    })
  }

  newPassword(): void {
    this.isLoading=false;

    let resetForm=this.resetPassword.value;
    resetForm.email=this.email;
    if (this.resetPassword.valid) {
      this._ForgetpasswordService.resetPassword(resetForm).subscribe({
        next:(response)=>{
          this.isLoading=false;
          if (response.token) {
            localStorage.setItem('eToken',response.token);
            this._Router.navigate(['/home']);
           }
        },
        error:(err)=>{
          this.isLoading=false;
          this.userMsg=err.error.message;
        }
       })
      }
    }
 
}
