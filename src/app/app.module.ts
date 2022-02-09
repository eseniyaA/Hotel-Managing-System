import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { RippleModule } from 'primeng/ripple';
import { GuestAuthPageModule } from './components/guests/guest-auth-page/guest-auth-page.module';
import { BookingFormModule } from './components/guests/booking-form/booking-form.module';
import { GuestProfileModule } from './components/guests/guest-profile/guest-profile.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StaffPageModule } from './components/staff/staff-page/staff-page.module';
import { AdminManageModule } from './components/administration/admin-manage/admin-manage.module';
import { MenuComponent } from './menu/menu.component';
import { StaffManageModule } from './components/staff/staff-manage/staff-manage.module';
import { BookingsTableModule } from './components/staff/shared/bookings-table/bookings-table.module';
import { AdminAuthPageModule } from './components/administration/admin-auth-page/admin-auth-page.module';
import { CreateOrderModule } from './components/guests/create-order/create-order.module';

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    RippleModule,
    GuestAuthPageModule,
    BookingFormModule,
    GuestAuthPageModule,
    GuestProfileModule,
    CreateOrderModule,
    StaffPageModule,
    AdminManageModule,
    StaffManageModule,
    BookingsTableModule,
    AdminAuthPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
