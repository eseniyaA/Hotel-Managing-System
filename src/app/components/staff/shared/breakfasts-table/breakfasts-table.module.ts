import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { RippleModule } from 'primeng/ripple';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { BreakfastsTableComponent } from './breakfasts-table.component';

@NgModule({
  declarations: [BreakfastsTableComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    TableModule,
    DropdownModule,
  ],
  providers: [],
  exports: [BreakfastsTableComponent],
})
export class BreakfastsTableModule {}
