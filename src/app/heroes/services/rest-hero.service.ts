import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';

import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class RestHeroService {
  private baseURL: string = environments.baseURL;

  constructor(private httpClient: HttpClient) {}

  get(): Observable<Hero[]> {
    return this.httpClient
      .get<Hero[]>(`${this.baseURL}/heroes`)
      .pipe(map((res) => res.reverse()));
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.httpClient
      .get<Hero>(`${this.baseURL}/heroes/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  getSuggestions(q: string) {
    return this.httpClient.get<Hero[]>(
      `${this.baseURL}/heroes/?=${q}`,
    );
  }

  post(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(`${this.baseURL}/heroes`, hero);
  }

  update(hero: Hero): Observable<Hero> {
    if (!hero.id) throw new Error('No hero id');
    return this.httpClient.patch<Hero>(
      `${this.baseURL}/heroes/${hero.id}`,
      hero,
    );
  }

  delete(id: string): Observable<boolean> {
    return this.httpClient.delete(`${this.baseURL}/heroes/${id}`).pipe(
      catchError(() => of(false)),
      map(() => true),
    );
  }
}
