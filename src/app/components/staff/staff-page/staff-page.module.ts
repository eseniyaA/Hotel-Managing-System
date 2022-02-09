import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { RippleModule } from 'primeng/ripple';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { StaffPageComponent } from './staff-page.component';
import { CommonModule } from '@angular/common';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffManageModule } from '../staff-manage/staff-manage.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StaffPageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StaffRoutingModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    StaffManageModule,
  ],
  providers: [],
  exports: [StaffPageComponent],
})
export class StaffPageModule {}
