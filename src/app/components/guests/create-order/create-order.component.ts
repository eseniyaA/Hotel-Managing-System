import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  Booking,
  Booking_Breakfast,
  Breakfast,
  Guest,
  Guest_Booking,
  Guest_Tour,
  Tour,
} from '../../../shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

interface customTour {
  id: number;
  title: string;
  price: number;
}

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOrderComponent implements OnInit {
  @Input() guest: Guest | undefined;
  @Input() curBooking: Booking | undefined;

  breakfasts: Breakfast[] = [];
  tours: Tour[] = [];
  orderedTours: customTour[] = [];
  commonGuests: Guest[] = [];

  breakfastOptions: Breakfast[] = [];
  tourOptions: Tour[] = [];

  showBreakfastForm = false;
  showTourForm = false;

  orderBreakfastForm = this.fb.group({
    menu: new FormControl('', Validators.required),
  });

  orderTourForm = this.fb.group({
    tour: new FormControl('', Validators.required),
    guests: new FormControl('', Validators.required), //multiple choice of guests from this booking
  });

  constructor(private cRef: ChangeDetectorRef, private httpClient: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    const breakfasts$ = this.httpClient.get<Breakfast[]>(`/api/breakfasts`);
    const tours$ = this.httpClient.get<Tour[]>(`/api/tours`);
    const guest_booking$ = this.httpClient.get<Guest_Booking[]>(`/api/guest-booking/${this.curBooking!.id}`);
    const booking_breakfast$ = this.httpClient.get<Booking_Breakfast[]>(`/api/booking-breakfast`);
    const guest_tour$ = this.httpClient.get<Guest_Tour[]>(`/api/guest-tour`);
    const guests$ = this.httpClient.get<Guest[]>(`/api/guests`);

    forkJoin([breakfasts$, tours$, guest_booking$, booking_breakfast$, guest_tour$, guests$]).subscribe(
      ([breakfasts, tours, guest_booking, booking_breakfast, guest_tour, guests]: [
        Breakfast[],
        Tour[],
        Guest_Booking[],
        Booking_Breakfast[],
        Guest_Tour[],
        Guest[]
      ]) => {
        this.breakfastOptions = breakfasts;
        this.tourOptions = tours;

        this.breakfasts = this.formatBreakfasts(breakfasts, booking_breakfast);
        this.formatGuests(guest_booking, guests);
        this.formatTours(tours, guest_booking, guest_tour);
        this.cRef.detectChanges();
      }
    );
  }

  private formatBreakfasts(breakfasts: Breakfast[], booking_breakfast: Booking_Breakfast[]): Breakfast[] {
    const breakfastIds = booking_breakfast
      .filter((bb) => bb.bookingId === this.curBooking!.id)
      .map((bb) => bb.breakfastId);

    breakfasts = breakfasts.filter((breakfast) => breakfast.id === breakfastIds.find((id) => id === breakfast.id));
    return breakfasts;
  }

  private formatTours(tours: Tour[], guests: Guest_Booking[], guest_tours: Guest_Tour[]) {
    guest_tours = guest_tours.filter((gt) => guests.find((g) => g.idGuest == gt.guestId));
    guest_tours.forEach((gt) =>
      this.orderedTours.push({
        id: gt.id,
        title: tours.find((t) => t.id === gt.tourId)!.title,
        price: tours.find((t) => t.id === gt.tourId)!.price,
      })
    );
  }

  submitBreakfast() {
    this.httpClient
      .post<Booking_Breakfast>(`/api/booking-breakfast`, {
        bookingId: this.curBooking!.id,
        breakfastId: this.orderBreakfastForm.value.menu.id,
      })
      .subscribe((response) => {
        const breakfast = this.breakfastOptions.find((option) => option.id == response.breakfastId);

        if (!breakfast) return;
        this.breakfasts.push({ id: breakfast.id, menu: breakfast.menu, price: breakfast.price });

        this.cRef.detectChanges();
      });
  }

  submitTour() {
    this.httpClient
      .post<Guest_Tour>(`/api/guest-tour`, {
        guestId: this.orderTourForm.value.guests.id,
        tourId: this.orderTourForm.value.tour.id,
      })
      .subscribe((response) => {
        const tour = this.tourOptions.find((option) => option.id === response.tourId);

        if (!tour) return;
        this.orderedTours.push({ id: tour.id, title: tour.title, price: tour.price });

        this.cRef.detectChanges();
      });
  }

  private formatGuests(guest_booking: Guest_Booking[], guests: Guest[]) {
    this.commonGuests = guests.filter((guest) => guest_booking.find((gb) => gb.idGuest === guest.id));
  }
}
