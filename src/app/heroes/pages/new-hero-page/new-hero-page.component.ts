import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators as vd } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from '../../interfaces/form.interface';
import { FileUploadEvent } from 'primeng/fileupload';
import { CreateHeroService } from '../../services/create-hero.service';
import { RestHeroService } from '../../services/rest-hero.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'heroes-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  providers: [MessageService],
  styles: ``,
})
export class NewHeroPageComponent implements OnInit, OnDestroy {
  formGroup: FormGroup = this.formBuilder.group({
    superhero: ['', [vd.required]],
    publisher: ['', [vd.required]],
    alter_ego: [''],
    first_appearance: [''],
    image_url: [''],
  });

  publishers: any[] = [
    'Marvel Comics',
    'DC Comics',
    'Image Comics',
    'Dark Horse Comics',
    'Archie Comics',
    'IDW Publishing',
    'Valiant Comics',
    'Dynamite Entertainment',
    'VIZ Media',
    'Fantagraphics Books',
  ];

  filtered: any[] = [];

  _hero: Hero | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private createHeroService: CreateHeroService,
    private restHeroService: RestHeroService,
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('new')) return;
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.restHeroService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) {
          this.router.navigate(['/404']);
          return;
        }
        this.formGroup.reset(hero);
        this._hero = hero;
        this.createHeroService.setCardItem = {
          header: hero.superhero,
          subheader: hero.publisher,
          url: hero.image_url,
        };

        return;
      });
  }

  formDataToHero(): Hero {
    return this.formGroup.value as Hero;
  }

  suggestion(event: AutoCompleteCompleteEvent) {
    let filtered: string[] = [];
    let query = event.query;

    for (let publisher of this.publishers) {
      if (publisher.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(publisher);
      }
    }
    this.filtered = filtered;
  }

  onUpload(event: FileUploadEvent) {
    console.log(event);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'This functionality is not implemented',
    });
  }

  updateCard() {
    this.createHeroService.setCardItem = {
      header: this.formGroup.value.superhero,
      subheader: this.formGroup.value.publisher,
      url:
        this.formGroup.get('image_url')?.value ||
        `assets/heroes/${this._hero?.id}.jpg` ||
        'https://i0.wp.com/www.primefaces.org/wp-content/uploads/2018/05/primeng-logo-black.png',
    };
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid form',
        detail: "Hero's name and publisher are required",
      });
      return;
    }
    const hero: Hero = this.formDataToHero();
    if (!this._hero?.id) this.restHeroService.post(hero).subscribe();
    else this.restHeroService.update(this.formDataToHero()).subscribe();
    this.router.navigate(['/heroes']);
    this.createHeroService.reset();
  }

  exit() {
    this.router.navigate(['/heroes']);
    this.formGroup.reset();
  }

  ngOnDestroy(): void {
    this.formGroup.reset();
    this.createHeroService.reset();
  }
}
