import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { RippleModule } from 'primeng/ripple';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AdminManageComponent } from './admin-manage.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [AdminManageComponent],
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
  ],
  providers: [ConfirmationService],
  exports: [AdminManageComponent],
})
export class AdminManageModule {}
