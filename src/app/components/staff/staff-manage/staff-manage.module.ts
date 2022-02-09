import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { RippleModule } from 'primeng/ripple';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { StaffManageComponent } from './staff-manage.component';
import { StaffRoutingModule } from '../staff-page/staff-routing.module';
import { BookingsTableModule } from '../shared/bookings-table/bookings-table.module';
import { TableModule } from 'primeng/table';
import { BreakfastsTableModule } from '../shared/breakfasts-table/breakfasts-table.module';

@NgModule({
  declarations: [StaffManageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StaffRoutingModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    BookingsTableModule,
    TableModule,
    BreakfastsTableModule,
  ],
  providers: [],
  exports: [StaffManageComponent],
})
export class StaffManageModule {}
