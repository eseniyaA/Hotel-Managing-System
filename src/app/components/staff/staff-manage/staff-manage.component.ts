import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';
import { Booking, Booking_Room, Breakfast, Room, Staff, Staff_Booking, Tour } from '../../../shared/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff-manage',
  templateUrl: './staff-manage.component.html',
  styleUrls: ['./staff-manage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaffManageComponent implements OnInit {
  @Input() person: Staff | undefined;

  staff: Staff[] = [];
  tours: Tour[] = [];
  bookings: Booking[] = [];

  popularRoom$ = this.httpClient.get(`/api/statistics-rooms`);

  constructor(private cRef: ChangeDetectorRef, private httpClient: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.pipe(map((p) => p.get('id'))).subscribe((id) => {
      if (id) {
        const staff$ = this.httpClient.get<Staff[]>(`/api/staff/${id}`);

        staff$.subscribe(([staff]) => {
          this.person = staff;

          const bookings$ = this.httpClient.get<Booking[]>(`/api/bookings`);
          const staff_booking$ = this.httpClient.get<Staff_Booking[]>(`/api/booking-staff`);
          const booking_room$ = this.httpClient.get<Booking_Room[]>(`/api/booking-room`);
          const staff$ = this.httpClient.get<Staff[]>(`/api/staff`);

          forkJoin([bookings$, staff_booking$, staff$, booking_room$]).subscribe(
            ([bookings, staff_booking, staff, booking_room]: [Booking[], Staff_Booking[], Staff[], Booking_Room[]]) => {
              this.bookings = this.formatBookings([bookings, staff_booking, staff, booking_room]);
              this.staff = staff;
              this.cRef.detectChanges();

              console.log(this.bookings);
              console.log(this.staff);
            }
          );

          this.httpClient.get<Tour[]>(`/api/tours`).subscribe((response) => (this.tours = response));
        });
      }
    });
  }

  private formatBookings([bookings, staff_booking, staff, booking_room]: [
    Booking[],
    Staff_Booking[],
    Staff[],
    Booking_Room[]
  ]) {
    bookings.forEach((booking) => {
      const idStaff = staff_booking.find((link) => link.bookingId === booking.id)?.staffId;
      booking.inCharge = staff.find((staff) => staff.id === idStaff);
      booking.roomsNums = booking_room.filter((link) => link.bookingId == booking.id).map((br) => br.roomId);
    });
    return bookings;
  }
}
