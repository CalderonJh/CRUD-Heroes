import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {AutoCompleteCompleteEvent, UploadEvent} from "../../interfaces/form.interface";
import {FileUploadEvent} from "primeng/fileupload";

@Component({
  selector: 'heroes-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  providers: [MessageService],
  styles: ``,
})
export class NewHeroPageComponent implements OnInit {
  formGroup!: FormGroup;
  name: string = '';
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

  constructor(private messageService: MessageService) {}
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      selectedCountry: new FormControl<string>(''),
    });
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
    console.log({event})
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }
}
