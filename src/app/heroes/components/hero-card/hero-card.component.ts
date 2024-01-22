import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { CreateHeroService } from '../../services/create-hero.service';
import { Observable } from 'rxjs';
import {CardItem} from "../../interfaces/form.interface";

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css',
})
export class HeroCardComponent implements OnInit {
  public data$: Observable<CardItem>;

  constructor(private createHeroService: CreateHeroService) {
    this.data$ = createHeroService.cardItem;
  }

  @Input()
  editable: boolean = false;

  @Input()
  _hero: Hero | undefined;

  @Input()
  header: string = '-';

  @Input()
  subheader: string = '-';

  ngOnInit() {
    this.createHeroService.cardItem.subscribe((res) => {
      this.header = res.header ? res.header : '_';
      this.subheader = res.subheader ? res.subheader : '_';
    });
  }
}
