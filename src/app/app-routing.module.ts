import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFormComponent } from './components/guests/booking-form/booking-form.component';
import { GuestAuthPageComponent } from './components/guests/guest-auth-page/guest-auth-page.component';
import { AdminManageComponent } from './components/administration/admin-manage/admin-manage.component';
import { StaffPageComponent } from './components/staff/staff-page/staff-page.component';
import { MenuComponent } from './menu/menu.component';
import { StaffManageComponent } from './components/staff/staff-manage/staff-manage.component';
import { GuestProfileComponent } from './components/guests/guest-profile/guest-profile.component';
import { AdminAuthPageComponent } from './components/administration/admin-auth-page/admin-auth-page.component';
import { CreateOrderComponent } from './components/guests/create-order/create-order.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'booking', component: BookingFormComponent },
  { path: 'guest', component: GuestAuthPageComponent },
  { path: 'guest/:id', component: GuestProfileComponent },
  { path: 'admin', component: AdminAuthPageComponent },
  { path: 'admin/manage', component: AdminManageComponent },
  { path: 'staff', component: StaffPageComponent },
  { path: 'staff/:id', component: StaffManageComponent },
  { path: 'order', component: CreateOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
