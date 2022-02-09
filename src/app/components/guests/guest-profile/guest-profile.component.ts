import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Booking, Guest, Guest_Booking, Room, RoomType, Staff } from '../../../shared/interfaces';
import { forkJoin, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guest-profile',
  templateUrl: './guest-profile.component.html',
  styleUrls: ['./guest-profile.component.css'],
})
export class GuestProfileComponent implements OnInit {
  guest: Guest | undefined;
  curBooking: Booking | undefined;

  showNewBookingForm = false;
  showBookingForm = false;
  showPreviousBookings = false;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private cRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(map((p) => p.get('id'))).subscribe((id) => {
      if (id) {
        const guest$ = this.httpClient.get<Guest>(`/api/guest/${id}`);
        const guest_booking$ = this.httpClient.get<Guest_Booking[]>(`api/guest-booking`);
        const bookings$ = this.httpClient.get<Booking[]>(`api/bookings`);

        forkJoin([guest$, guest_booking$, bookings$]).subscribe(
          ([guest, guest_booking, bookings]: [Guest, Guest_Booking[], Booking[]]) => {
            this.guest = this.formatGuest([guest, guest_booking, bookings]);

            this.curBooking = this.guest?.bookings?.find((booking: Booking) => {
              const today = new Date();

              return new Date(booking.departureDate).getTime() > new Date(today).getTime();
            });

            this.cRef.detectChanges();
          }
        );
      }
    });
  }

  private formatGuest([guest, guest_booking, bookings]: [Guest, Guest_Booking[], Booking[]]) {
    const bookingsIds = guest_booking.filter((link) => link.idGuest === guest.id).map((link) => link.idBooking);
    guest.bookings = bookings.filter((booking) => bookingsIds.find((bookingId) => booking.id == bookingId));
    console.log(guest);

    return guest;
  }
}
