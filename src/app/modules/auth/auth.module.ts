import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [LoginComponent,
    SignupComponent],
    imports: [CommonModule,  ReactiveFormsModule,  
         AuthRoutingModule,  HttpClientModule],
    exports: [],
  })
  export class  AuthModule{}