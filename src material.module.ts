import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const materialModule = [
 ...
  MatAutocompleteModule,
 ... // these are modules skipped for this article
 
];

@NgModule({
  imports: [
    CommonModule,
    ...
  ],
  exports: [
    ...
    materialModule
  ],
})

export class MaterialModule { }