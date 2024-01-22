import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from '../../interfaces/form.interface';
import { RestHeroService } from '../../services/rest-hero.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'heroes-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  _heroes: Hero[] = [];
  items: MegaMenuItem[] | undefined;
  filtered: any[] = [];
  formGroup!: FormGroup;

  constructor(
    private restHeroService: RestHeroService,
    private router: Router,
  ) {}

  suggestion(event: AutoCompleteCompleteEvent) {
    let filtered: string[] = [];
    let query = event.query;

    for (let { superhero } of this._heroes) {
      if (superhero.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(superhero);
      }
    }
    this.filtered = filtered;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'List',
        icon: 'pi pi-list',
        routerLink: 'list',
      },
      {
        label: 'Add',
        icon: 'pi pi-plus',
        routerLink: 'new',
      },
    ];

    this.formGroup = new FormGroup({
      searchInput: new FormControl<string>(''),
    });
  }

  filter() {
    console.log(this.formGroup.value.searchInput);

    const value = this.formGroup.value.searchInput;
    this.restHeroService.getSuggestions(value).subscribe((heroesRes) => {
      this._heroes = heroesRes;
    });
  }

  keyupEvent() {
    this.restHeroService
      .getSuggestions(this.formGroup.value.searchInput)
      .pipe(debounceTime(300))
      .subscribe((heroesRes) => (this._heroes = heroesRes));
  }

  heroPage() {
    for (const { id, superhero } of this._heroes) {
      if (this.formGroup.value.searchInput == superhero) {
        this.router.navigateByUrl(`/heroes/id/${id}`);
        this.formGroup.reset('searchInput');
        break;
      }
    }
  }
}
