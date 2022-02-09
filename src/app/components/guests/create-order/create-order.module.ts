import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { RippleModule } from 'primeng/ripple';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { CreateOrderComponent } from './create-order.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [CreateOrderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
    DropdownModule,
  ],
  providers: [],
  exports: [CreateOrderComponent],
})
export class CreateOrderModule {}
