import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { FrontComponent } from './front/front.component';
import {ProdutoHomeComponent} from "./produto/produto-home/produto-home.component";

const routes: Routes = [
  { path: 'front', component: FrontComponent },
  { path: 'login', component: LoginComponent },
  { path: 'produto/home', component: ProdutoHomeComponent},
  { path: '',   redirectTo: '/front', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
