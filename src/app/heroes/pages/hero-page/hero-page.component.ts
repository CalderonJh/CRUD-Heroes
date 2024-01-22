import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { RestHeroService } from '../../services/rest-hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'heroes-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: `./hero-page.component.css`,
  providers: [MessageService],
})
export class HeroPageComponent implements OnInit {
  hero!: Hero;
  fields(): any[] {
    if (!this.hero) return [];
    return [
      { title: 'Name', value: this.hero.superhero },
      { title: 'Alter ego', value: this.hero.alter_ego },
      { title: 'Publisher', value: this.hero.publisher },
      { title: 'Characters', value: this.hero.characters },
    ];
  }

  constructor(
    private restHeroService: RestHeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.restHeroService.getHeroById(id)))
      .subscribe((res) => {
        if (!!res) this.hero = res;
        else this.router.navigateByUrl('/404');
      });
  }

  deleteHero(id: string | undefined) {
    if (!id) return;
    this.restHeroService.delete(id).subscribe((res) => {
      if (res)
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Hero was deleted',
        });
    });
    setTimeout(() => {
      this.router.navigateByUrl('/heroes');
    }, 400);
  }
}
