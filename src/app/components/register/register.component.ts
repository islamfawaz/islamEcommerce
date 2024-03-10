import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errMsg: string = '';
  isLoading: boolean = false;

  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router) {
    this.registerForm = this._FormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,9}$/)]], // Corrected regex
      rePassword: [''],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    }, { validators: this.confirmPassword });
  }

  confirmPassword(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { 'mismatch': true };
  }

  handleForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const UserData = this.registerForm.value;
      this._AuthService.register(UserData).subscribe({
        next: (response) => {
          if (response.message == 'success') { 
  
            this.isLoading = false;
            this._Router.navigate(['./login']);
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
