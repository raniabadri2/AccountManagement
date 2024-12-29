import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { Error404Component } from "./error404/error404.component";
import { ShowcompteComponent } from "./showcompte/showcompte.component";
import { ShowclientComponent } from "./showclient/showclient.component";
import { AjoutClientComponent } from "./ajout-client/ajout-client.component";
import { AjoutCompteComponent } from "./ajout-compte/ajout-compte.component";
import { EditCompteComponent } from "./edit-compte/edit-compte.component";
import { EditClientComponent } from "./edit-client/edit-client.component";
import {AuthGuard} from "./auth/auth-guard.service";
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'showcompte',
    component: ShowcompteComponent,
       // Add canActivate guard
  },
  {
    path: 'showclient',
    component: ShowclientComponent,
      // Add canActivate guard
  },
  {
    path: 'ajoutclient',
    component: AjoutClientComponent,
      // Add canActivate guard
  },
  {
    path: 'ajoutcompte',
    component: AjoutCompteComponent,
       // Add canActivate guard
  },
  {
    path: 'editcompte/:cin',
    component: EditCompteComponent,
       // Add canActivate guard
  },
  {
    path: 'editclient/:rib',
    component: EditClientComponent,
      // Add canActivate guard
  },

  { path: 'home',
     component: HomeComponent },
  
  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
