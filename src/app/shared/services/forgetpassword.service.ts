// forgetpassword.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {
  constructor(private _HttpClient: HttpClient) { }

  forgotPassword(userEmail: any): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, userEmail);
  }
  
  resetCode(userCode: any): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, userCode);
  }
  resetPassword(resetPasswordForm:object ):Observable<any>{
   return   this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,resetPasswordForm)
  }
}
