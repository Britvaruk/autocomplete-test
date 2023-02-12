import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomePageComponent,
    AutocompleteInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule { }
