import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [CommonModule, NgxSpinnerModule],
  exports: [
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective
  ]
})
export class SharedModule {}
