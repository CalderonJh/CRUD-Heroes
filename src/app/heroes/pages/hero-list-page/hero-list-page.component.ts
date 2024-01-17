import { Component, OnInit } from '@angular/core';
import { GetHeroesService } from '../../services/get-heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heores-list-page',
  templateUrl: './hero-list-page.component.html',
  styles: ``,
})
export class HeroListPageComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private getHeroesService: GetHeroesService) {}

  ngOnInit(): void {
    this.getHeroesService.getHeroes().subscribe((heroesRes) => {
      this.heroes = heroesRes;
    });
  }
}
