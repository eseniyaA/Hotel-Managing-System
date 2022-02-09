import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Booking, Booking_Room, Staff, Staff_Booking, Tour } from '../../../../shared/interfaces';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.css'],
})
export class BookingsTableComponent implements OnInit {
  @Input() editable = false;
  @Input() person: Staff | undefined;
  @Input() bookings: Booking[] | undefined;

  bookingStaff: Staff_Booking[] = [];
  staff: Staff[] = [];
  maidStaff: Staff[] = [];

  form = this.fb.group({
    inCharge: new FormControl('', Validators.required),
  });

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private cRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.httpClient.get<Staff[]>(`/api/staff`).subscribe((response) => {
      this.staff = response;
      this.filterStaffMaids();
    });
    this.filterBookings();

    this.httpClient.get<Staff_Booking[]>(`/api/booking-staff`).subscribe((response) => (this.bookingStaff = response));
  }

  private filterBookings() {
    if (this.person?.positionId === 10) {
      console.log('maid welcome');
      this.bookings = this.bookings?.filter((booking) => booking.inCharge?.id === this.person?.id);
    } else if (this.person?.position == 'Cleaning Manager') {
      return;
    }
  }

  private filterStaffMaids() {
    this.maidStaff = this.staff?.filter((staff) => staff.positionId === 10);
  }

  updateCharged(booking: any) {
    const person = this.form.value.inCharge;

    if (this.bookingStaff.find((bs) => bs.bookingId == booking.id) && this.bookingStaff) {
      this.httpClient
        .patch<Staff_Booking>(`/api/booking-staff`, {
          staffId: person.id,
          bookingId: booking.id,
        })
        .subscribe((response) => {
          this.cRef.detectChanges();
        });
    } else {
      console.log('else');
      this.httpClient
        .post<Staff_Booking>(`/api/booking-staff`, {
          staffId: person.id,
          bookingId: booking.id,
        })
        .subscribe((response) => this.cRef.detectChanges());
    }
  }
}
