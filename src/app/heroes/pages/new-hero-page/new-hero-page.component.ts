import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
export class NewHeroPageComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<string>(''),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    image_url: new FormControl<string>(''),
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
          this.router.navigateByUrl('/404');
          return;
        }
        this.formGroup.reset(hero);
        this._hero = hero;
        this.createHeroService.setCardItem = {
          header: hero.superhero,
          subheader: hero.publisher,
        };

        return;
      });
  }


  toHero(): Hero {
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
    console.log({ event });
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }


  updateCard() {
    this.createHeroService.setCardItem = {
      header: this.formGroup.value.superhero,
      subheader: this.formGroup.value.publisher,
    };
  }


  onSubmit(): void {
    console.log(this.formGroup.valid);
    console.log(this.formGroup.getRawValue());
    if (this.formGroup.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: "Invalid form",
        detail: 'Hero\'s name is required',
      });
    }
    const hero: Hero = this.toHero();
    if (!!hero.id) {
      this.restHeroService.update(this.toHero()).subscribe();
      return;
    }
    this.restHeroService.post(hero).subscribe();
  }
}
