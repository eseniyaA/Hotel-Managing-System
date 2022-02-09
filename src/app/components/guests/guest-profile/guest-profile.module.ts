import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { RippleModule } from 'primeng/ripple';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BookingFormModule } from '../booking-form/booking-form.module';
import { GuestProfileComponent } from './guest-profile.component';
import { TableModule } from 'primeng/table';
import { CreateOrderModule } from '../create-order/create-order.module';

@NgModule({
  declarations: [GuestProfileComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    InputTextModule,
    BookingFormModule,
    TableModule,
    CreateOrderModule,
  ],
  providers: [],
  exports: [GuestProfileComponent],
})
export class GuestProfileModule {}
