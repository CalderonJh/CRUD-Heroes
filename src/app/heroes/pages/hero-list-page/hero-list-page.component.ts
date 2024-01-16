import { Component } from '@angular/core';

@Component({
  selector: 'heores-list-page',
  templateUrl: './hero-list-page.component.html',
  styles: ``
})
export class HeroListPageComponent {

  _show = false;

  showMenu() {
    this._show = true;
  }
}
