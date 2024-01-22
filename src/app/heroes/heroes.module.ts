import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HeroListPageComponent } from './pages/hero-list-page/hero-list-page.component';
import { NewHeroPageComponent } from './pages/new-hero-page/new-hero-page.component';

import { MenuComponent } from './components/menu/menu.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    HeroPageComponent,
    LayoutPageComponent,
    HeroListPageComponent,
    NewHeroPageComponent,
    MenuComponent,
    HeroCardComponent,
    HeroImagePipe,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HeroesRoutingModule,
    PrimeNgModule,
    FormsModule,
    NgOptimizedImage,
  ],
  exports: [HeroCardComponent],
})
export class HeroesModule {}
