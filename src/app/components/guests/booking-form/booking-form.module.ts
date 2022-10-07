import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { RippleModule } from 'primeng/ripple';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BookingFormComponent } from './booking-form.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [BookingFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    MessagesModule,
  ],
  providers: [],
  exports: [BookingFormComponent],
})
export class BookingFormModule {}
