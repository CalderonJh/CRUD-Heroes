import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HeroListPageComponent } from './pages/hero-list-page/hero-list-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NewHeroPageComponent } from './pages/new-hero-page/new-hero-page.component';


@NgModule({
  declarations: [
    HeroPageComponent,
    LayoutPageComponent,
    HeroListPageComponent,
    SearchPageComponent,
    NewHeroPageComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
