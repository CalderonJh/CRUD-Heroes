import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [LayoutPageComponent, LoginPageComponent, SignUpPageComponent],
  imports: [CommonModule, BrowserModule, AuthRoutingModule, PrimeNgModule, FormsModule],
})
export class AuthModule {}
