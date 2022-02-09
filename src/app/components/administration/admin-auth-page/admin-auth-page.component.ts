import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SECRET_PASSWORD } from '../../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-auth-page',
  templateUrl: './admin-auth-page.component.html',
  styleUrls: ['./admin-auth-page.component.css'],
})
export class AdminAuthPageComponent implements OnInit {
  showManagePage = false;

  form = this.fb.group({
    password: ['', Validators.required],
  });
  invalidPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  submit() {
    if (this.form.valid) {
      if (this.form.value.password === SECRET_PASSWORD) {
        this.invalidPassword = false;
        this.router.navigate(['admin/manage']);
      } else {
        this.invalidPassword = true;
      }
    }
  }
}
