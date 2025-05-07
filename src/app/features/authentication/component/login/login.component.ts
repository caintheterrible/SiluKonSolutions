import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import {FormFieldComponent} from '../../../../shared/components/form-field/form-field.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{
  loginForm:FormGroup;
  error:string | null =null;

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router
  ){
    this.loginForm= this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit():void {}

  get emailControl(): FormControl{
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl():FormControl{
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit():void{
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next:(response)=>{
          this.authService.saveToken(response.token);
          this.router.navigate(['/dashboard']);
        },
        error:(err)=>{
          this.error='Invalid email or password';
        },
      });
    }
  }
}
