import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { RippleModule } from 'primeng/ripple';
import { GuestAuthPageComponent } from './guest-auth-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BookingFormModule } from '../booking-form/booking-form.module';
import { GuestProfileModule } from '../guest-profile/guest-profile.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [GuestAuthPageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    InputTextModule,
    BookingFormModule,
    GuestProfileModule,
  ],
  providers: [],
  exports: [GuestAuthPageComponent],
})
export class GuestAuthPageModule {}
