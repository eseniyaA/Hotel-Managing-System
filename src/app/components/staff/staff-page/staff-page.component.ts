import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Position, Staff } from '../../../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrls: ['./staff-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffPageComponent implements OnInit {
  staff: Staff[] = [];
  positions: Position[] = [];
  employee: any = {};

  showStaffPage = false;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private cRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    const positions$ = this.httpClient.get<Position[]>(`/api/positions`);
    const staff$ = this.httpClient.get<Staff[]>(`/api/staff`);

    forkJoin([positions$, staff$]).subscribe(([positions, staff]: [Position[], Staff[]]) => {
      this.staff = this.formatStaff([positions, staff]);
      this.positions = positions;
      this.cRef.detectChanges();
    });
  }

  private formatStaff([positions, staff]: [Position[], Staff[]]) {
    staff.forEach((staff) => {
      staff.position = positions.find((position) => position.id === staff.positionId)?.name;
    });
    return staff;
  }

  submit() {
    if (this.form.valid) {
      this.employee = this.staff.find(
        (staff) => staff.firstName == this.form.value.firstName && staff.lastName == this.form.value.lastName
      );
      if (!this.employee) {
        console.log('no staff with this name');
      } else {
        this.showStaffPage = true;
        this.router.navigate(['staff', this.employee.id]);
      }
    }
  }
}
