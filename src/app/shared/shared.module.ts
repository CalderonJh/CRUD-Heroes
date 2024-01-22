import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RouterLink } from '@angular/router';
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [CommonModule, BrowserModule, RouterLink],
  exports: [NotFoundPageComponent],
})
export class SharedModule {}
