import { Pipe, PipeTransform } from '@angular/core';
import {Hero} from "../interfaces/hero.interface";

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero | undefined, ext:string): string {
    if (!hero) return `assets/no-image.${ext}`
    return `assets/heroes/${hero.id}.${ext}`
  }

}
