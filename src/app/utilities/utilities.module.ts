import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiLineCheckDirective } from '../multi-line-check.directive';



@NgModule({
  declarations: [MultiLineCheckDirective],
  imports: [
    CommonModule
  ],
  exports: [MultiLineCheckDirective]
})
export class UtilitiesModule { }
