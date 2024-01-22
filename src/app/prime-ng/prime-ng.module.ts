import { NgModule } from '@angular/core';

import {ButtonModule} from "primeng/button";
import {MegaMenuModule} from "primeng/megamenu";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {FileUploadModule} from "primeng/fileupload";
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {DataViewModule} from "primeng/dataview";
import {PasswordModule} from "primeng/password";


@NgModule({
  exports:[
    ButtonModule,
    MegaMenuModule,
    InputTextModule,
    CardModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastModule,
    TableModule,
    DataViewModule,
    PasswordModule,
    ToastModule
  ]
})
export class PrimeNgModule { }
