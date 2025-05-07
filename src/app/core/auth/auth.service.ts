// Handles login/signup API calls and management

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn:'root',
})

export class AuthService{
  private apiUrl=`${environment.apiUrl}/auth`;

  constructor(private http:HttpClient){}

  login(credentials: {email:string; password:string}):Observable<{token:string; user:User}> {
    return this.http.post<{token:string; user:User}>(`${this.apiUrl}/login`, credentials);
  }

  signup(user:User):Observable<{token:string; user:User}>{
    return this.http.post<{token:string; user:User}>(`${this.apiUrl}/signup`, user);
  }

  saveToken(token:string):void{
    localStorage.setItem('token', token);
  }

  getToken():string | null{
    return localStorage.getItem('token');
  }

  logout():void{
    localStorage.removeItem('token');
  }

}
