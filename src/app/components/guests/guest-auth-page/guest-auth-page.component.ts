import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Booking, Guest, Guest_Booking } from '../../../shared/interfaces';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-guest-auth-page',
  templateUrl: './guest-auth-page.component.html',
  styleUrls: ['./guest-auth-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestAuthPageComponent implements OnInit {
  guests: Guest[] = [];
  showBookingForm = false;
  showGuestProfile = false;
  guest: Guest | undefined;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private cRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const guests$ = this.httpClient.get<Guest[]>(`api/guests`);
    const guest_booking$ = this.httpClient.get<Guest_Booking[]>(`api/guest-booking`);
    const bookings$ = this.httpClient.get<Booking[]>(`api/bookings`);

    forkJoin([guests$, guest_booking$, bookings$]).subscribe(
      ([guests, guest_booking, bookings]: [Guest[], Guest_Booking[], Booking[]]) => {
        this.guests = this.formatGuests([guests, guest_booking, bookings]);
        this.cRef.detectChanges();
      }
    );
  }

  private formatGuests([guests, guest_booking, bookings]: [Guest[], Guest_Booking[], Booking[]]) {
    guests.forEach((guest) => {
      const bookingsIds = guest_booking.filter((link) => link.idGuest === guest.id).map((link) => link.idBooking);

      guest.bookings = bookings.filter((booking) => bookingsIds.find((bookingId) => booking.id == bookingId));
    });

    return guests;
  }

  submit() {
    if (this.form.valid) {
      this.guest = this.guests.find(
        (guest: any) => guest.firstName == this.form.value.firstName && guest.lastName == this.form.value.lastName
      );
      if (!this.guest) {
        this.httpClient
          .post<Guest>(`/api/guests`, {
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
          })
          .subscribe((response) => {
            this.cRef.detectChanges();
            this.guest = response;
            this.showGuestProfile = true;

            this.httpClient.get<Guest[]>(`/api/guests`).subscribe((response) => {
              this.guest = response.find(
                (guest: any) =>
                  guest.firstName == this.form.value.firstName && guest.lastName == this.form.value.lastName
              );
              this.router.navigate(['guest', this.guest!.id]);
            });
          });
      } else {
        this.showGuestProfile = true;
        this.router.navigate(['guest', this.guest.id]);
      }
    }
  }
}
