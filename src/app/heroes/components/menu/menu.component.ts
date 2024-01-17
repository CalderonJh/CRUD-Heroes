import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { AutoCompleteCompleteEvent } from '../../interfaces/form.interface';
import { GetHeroesService } from '../../services/get-heroes.service';
import { map } from 'rxjs';
import {Hero} from "../../interfaces/hero.interface";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'heroes-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  heroesNames: string[] = [];
  items: MegaMenuItem[] | undefined;
  filtered: any[] = [];
  formGroup!: FormGroup;

  constructor(private getHeroesService: GetHeroesService) {}

  suggestion(event: AutoCompleteCompleteEvent) {
    let filtered: string[] = [];
    let query = event.query;

    for (let name of this.heroesNames) {
      if (name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(name);
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

    this.getHeroesService
      .getHeroes()
      .subscribe((heroesRes)=>{
        heroesRes.forEach((h)=>{
          this.heroesNames.push(h.superhero)
        })
      })
    console.log(this.heroesNames);
    this.formGroup = new FormGroup({
      selectedCountry: new FormControl<string>(''),
    });
  }
}
