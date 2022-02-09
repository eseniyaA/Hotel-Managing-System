import { Component, Input, OnInit } from '@angular/core';
import { Booking, Breakfast, Staff } from '../../../../shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { Form, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-breakfasts-table',
  templateUrl: './breakfasts-table.component.html',
  styleUrls: ['./breakfasts-table.component.css'],
})
export class BreakfastsTableComponent implements OnInit {
  @Input() editable = false;
  breakfasts$ = this.httpClient.get<Breakfast[]>(`/api/breakfasts`);

  form = this.fb.group({
    menu: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    //
  }
}
