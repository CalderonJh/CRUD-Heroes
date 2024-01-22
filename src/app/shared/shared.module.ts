import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [CommonModule, RouterLink],
  exports: [NotFoundPageComponent],
})
export class SharedModule {}
