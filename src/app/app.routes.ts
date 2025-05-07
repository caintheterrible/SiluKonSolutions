import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadChildren:()=>
      import('./features/authentication/authentication.module').then(
        (m)=>m.AuthenticationModule
      ),
  },
  // To add other routes here
];
