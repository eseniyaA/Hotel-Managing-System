import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { RippleModule } from 'primeng/ripple';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { AdminAuthPageComponent } from './admin-auth-page.component';
import { AdminManageModule } from '../admin-manage/admin-manage.module';

@NgModule({
  declarations: [AdminAuthPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    InputTextareaModule,
    ConfirmDialogModule,
    AdminManageModule,
  ],
  providers: [ConfirmationService],
  exports: [AdminAuthPageComponent],
})
export class AdminAuthPageModule {}
