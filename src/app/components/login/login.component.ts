import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    errMsg: string = '';
    isLoading: boolean = false;
  
    constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router) {
      this.loginForm = this._FormBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,9}$/)]], 
      });
    }
    handleForm(): void {
      if (this.loginForm.valid) {
        this.isLoading = true;
        const UserData = this.loginForm.value;
        this._AuthService.login(UserData).subscribe({
          next: (response) => {
            if (response.message == 'success') { 
              localStorage.setItem('eToken',response.token);
              this._AuthService.decodeUser();
              this.isLoading = false;
              this._Router.navigate(['./home']);
            }
          },
          error: (err) => {
            this.errMsg = err.error.message;
            this.isLoading = false;
          }
        });
      }
    }
}
