import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {CardItem} from "../interfaces/form.interface";



@Injectable({ providedIn: 'root' })
export class CreateHeroService {
  private _cardItem: BehaviorSubject<CardItem> = new BehaviorSubject<CardItem>({
    header: ' - ',
    subheader: ' - ',
    url:'https://i0.wp.com/www.primefaces.org/wp-content/uploads/2018/05/primeng-logo-black.png'
  });

  get cardItem(): Observable<CardItem> {
    return this._cardItem.asObservable();
  }

  set setCardItem(value: CardItem) {
    this._cardItem.next(value);
  }

  constructor() {}
}
