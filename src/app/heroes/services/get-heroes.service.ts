import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';

import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class GetHeroesService {
  private baseURL: string = environments.baseURL;

  constructor(private httpClient: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseURL}/heroes`);
  }
}
