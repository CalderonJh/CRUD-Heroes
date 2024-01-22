import { Component, OnInit } from '@angular/core';
import { RestHeroService } from '../../services/rest-hero.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heores-list-page',
  templateUrl: './hero-list-page.component.html',
  styles: ``,
})
export class HeroListPageComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private restHeroService: RestHeroService) {}

  ngOnInit(): void {
    this.restHeroService.get().subscribe((heroesRes) => {
      this.heroes = heroesRes;
    });
  }
}
