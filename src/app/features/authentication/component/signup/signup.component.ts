import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../../core/auth/auth.service';
import {FormFieldComponent} from '../../../../shared/components/form-field/form-field.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  signupForm:FormGroup;
  error:string | null= null;

  constructor(
    private fb:FormBuilder,
    private authService: AuthService,
    private router:Router,
  ) {
    this.signupForm=this.fb.group({
      name:['', Validators.required],
      companyName:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit():void {}

  get nameControl():FormControl{
    return this.signupForm.get('name') as FormControl;
  }

  get companyNameControl():FormControl{
    return this.signupForm.get('companyName') as FormControl;
  }

  get emailControl():FormControl{
    return this.signupForm.get('email') as FormControl;
  }

  get passwordControl():FormControl{
    return this.signupForm.get('password') as FormControl;
  }

  onSubmit():void{
    if(this.signupForm.valid){
      this.authService.signup(this.signupForm.value).subscribe({
        next:(response)=>{
          this.authService.saveToken(response.token);
          this.router.navigate(['/dashboard']);
        },
        error:(err)=>{
          this.error='Signup failed. Please try again.';
        },
      });
    }
  }
}
