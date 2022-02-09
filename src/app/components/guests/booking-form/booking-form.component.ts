import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Booking, Booking_Room, Guest, Guest_Booking, Room, RoomType } from '../../../shared/interfaces';
import { forkJoin, switchMap } from 'rxjs';

interface BookingRoomOption {
  roomId?: number;
  bookingRoomId?: number;
  typeId: number;
  type: string;
  price: number;
  guestsAmount: number;
}

interface BookingGuestOption {
  guestId?: number;
  bookingGuestId?: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingFormComponent implements OnInit {
  @Input() guest: Guest | undefined;
  @Input() booking: Booking | undefined;

  bookingRoomsOptions: BookingRoomOption[] = [];
  bookingGuestOptions: BookingGuestOption[] = [];
  roomTypes: RoomType[] = [];
  bookingRooms: Booking_Room[] = [];
  bookingGuests: Guest_Booking[] = [];
  freeRooms: Room[] = [];
  allGuests: Guest[] = [];

  form: FormGroup;
  minimumDate = new Date();

  get rooms() {
    return (this.form.get('rooms') as FormArray).controls as FormControl[];
  }

  get guests() {
    return (this.form.get('guests') as FormArray).controls as FormGroup[];
  }

  constructor(private fb: FormBuilder, private httpClient: HttpClient, private cRef: ChangeDetectorRef) {
    this.form = this.fb.group({
      arrivalDate: ['', Validators.required],
      departureDate: ['', Validators.required],
      rooms: this.fb.array([]),
      guests: this.fb.array([]),
    });
  }

  ngOnInit() {
    if (this.booking) {
      this.setBookingData();
    } else {
      this.setNewBookingData();
    }
  }

  private setNewBookingData() {
    const rooms$ = this.httpClient.get<Room[]>(`api/rooms`);
    const roomsTypes$ = this.httpClient.get<RoomType[]>(`api/roomTypes`);
    const guests$ = this.httpClient.get<Guest[]>(`api/guests`);

    rooms$.subscribe((rooms) => {
      this.freeRooms = rooms;
    });

    roomsTypes$.subscribe((types) => {
      this.roomTypes = types;
      this.bookingRoomsOptions = types.map((rt) => ({
        type: rt.type,
        price: rt.price,
        guestsAmount: rt.guestsAmount,
        typeId: rt.id,
      }));
    });

    guests$.subscribe((guests) => {
      this.allGuests = guests;
    });
  }

  private setBookingData() {
    if (!this.booking) return;

    this.form.patchValue({
      arrivalDate: new Date(this.booking.arrivalDate),
      departureDate: new Date(this.booking.departureDate),
    });

    const rooms$ = this.httpClient.get<Room[]>(`api/rooms`);
    const roomsTypes$ = this.httpClient.get<RoomType[]>(`api/roomTypes`);
    const bookingRooms$ = this.httpClient.get<Booking_Room[]>(`api/booking-rooms/${this.booking!.id}`);
    const bookingGuests$ = this.httpClient.get<Guest_Booking[]>(`/api/guest-booking/${this.booking!.id}`);
    const guests$ = this.httpClient.get<Guest[]>(`/api/guests`);

    forkJoin([rooms$, roomsTypes$, bookingRooms$, bookingGuests$, guests$]).subscribe(
      ([rooms, roomsTypes, bookingRoom, bookingGuests, guests]) => {
        this.roomTypes = roomsTypes;
        this.bookingRooms = bookingRoom;
        this.bookingGuests = bookingGuests;
        this.freeRooms = rooms;
        this.allGuests = guests;

        this.bookingRoomsOptions = roomsTypes.map((rt) => ({
          typeId: rt.id,
          type: rt.type,
          price: rt.price,
          guestsAmount: rt.guestsAmount,
        }));

        const controls = rooms
          .filter((room) => bookingRoom.map((br) => br.roomId).includes(room.id))
          .map((room) => ({
            roomId: room.id,
            bookingRoomId: bookingRoom.find((br) => br.roomId === room.id)!.id,
            price: roomsTypes.find((rt) => rt.id === room.typeId)!.price,
            type: roomsTypes.find((rt) => rt.id === room.typeId)!.type,
            guestsAmount: roomsTypes.find((rt) => rt.id === room.typeId)!.guestsAmount,
            typeId: roomsTypes.find((rt) => rt.id === room.typeId)!.id,
          }));

        this.bookingGuestOptions = guests
          .filter((guest) => bookingGuests.map((bg) => bg.idGuest).includes(guest.id))
          .map((guest) => ({
            guestId: guest.id,
            bookingGuestId: bookingGuests.find((bg) => bg.idGuest === guest.id)!.id,
            firstName: guest.firstName,
            lastName: guest.lastName,
          }))
          .filter((guest) => guest.guestId != this.guest!.id);

        controls.forEach((rt) => {
          this.addRoom(rt);
        });

        this.bookingGuestOptions.forEach((g) => {
          this.addGuest(g);
        });

        this.cRef.detectChanges();
      }
    );
  }

  addRoom(value?: BookingRoomOption) {
    const group = this.form.get('rooms') as FormArray;
    const control = new FormControl('', Validators.required);

    group.push(control);

    if (!value) return;

    control.patchValue({
      type: value.type,
      price: value.price,
      guestsAmount: value.guestsAmount,
      typeId: value.typeId,
    });
  }

  addGuest(value?: BookingGuestOption) {
    const group = this.form.get('guests') as FormArray;

    group.push(this.addGuestGroupControl(value));
  }

  addGuestGroupControl(value?: BookingGuestOption) {
    return this.fb.group({
      firstName: new FormControl(value?.firstName || '', Validators.required),
      lastName: new FormControl(value?.lastName || '', Validators.required),
    });
  }

  deleteRoom(room: FormControl) {
    const roomArray = this.form.controls['rooms'] as FormArray;

    roomArray.controls = roomArray.controls.filter((r) => r !== room);

    this.form.patchValue({ rooms: roomArray.controls.map((c) => c.value) });
  }

  deleteGuest(guest: FormGroup) {
    const guestArray = this.form.controls['guests'] as FormArray;

    guestArray.controls = guestArray.controls.filter((g) => g !== guest);

    this.form.patchValue({ guests: guestArray.controls.map((c) => c.value) });
  }

  submit() {
    if (!this.areRoomsEnough()) {
      console.error('Not enough rooms chosen for this amount of guests!');
      return;
    }

    if (this.booking) {
      const guests = this.form.value.guests;
      console.log(guests);
      console.log('rooms');
      console.log(this.bookingRooms);
      console.log('guests');
      console.log(this.bookingGuests);

      const saveRooms: Booking_Room[] = [];

      const newGuests: Guest[] = [];
      const newRooms: Room[] = [];

      const saveGuests = guests.filter(
        (guest: Guest_Booking) => guest.id === this.bookingGuests.find((bg) => guest.id === bg.idGuest)?.idGuest
      );

      console.log(saveGuests);
    } else {
      const rooms = this.form.value.rooms
        .map((r: BookingRoomOption) => this.freeRooms.find((fr) => fr.typeId === r.typeId)?.id)
        .filter(Boolean);

      this.httpClient
        .post<Booking>(`/api/booking`, {
          arrivalDate: new Date(this.form.value.arrivalDate).toISOString().slice(0, 19).replace('T', ' '),
          departureDate: new Date(this.form.value.departureDate).toISOString().slice(0, 19).replace('T', ' '),
          bill: this.getBill(),
          rooms,
          guests: [],
        })
        .subscribe((booking) => {
          const addBookingGuest = (g: Guest) =>
            this.httpClient.post<Guest_Booking>(`/api/booking-guest`, {
              idGuest: g.id,
              idBooking: booking.id,
            });

          (this.form.value.guests as Guest[]).forEach((g) => {
            const guest = this.allGuests.find((ag) => ag.id === g.id);

            const addGuest = this.httpClient.post<Guest>(`/api/guests`, {
              firstName: g.firstName,
              lastName: g.lastName,
            });

            if (!guest) addGuest.pipe(switchMap((newG) => addBookingGuest(newG))).subscribe();
            else addBookingGuest(guest).subscribe();
          });

          if (this.guest) addBookingGuest(this.guest).subscribe();
        });
    }
  }

  private areRoomsEnough() {
    let guestsAvailable = 0;
    this.form.value.rooms.forEach((room: RoomType) => (guestsAvailable += room.guestsAmount));
    const guestAmount = this.form.value.guests.length + 1;

    return guestsAvailable >= guestAmount;
  }

  getBill(): number {
    const { departureDate, arrivalDate } = this.form.value;

    if (!departureDate || !arrivalDate) return 0;

    const d1 = new Date(departureDate).setHours(0, 0, 0, 0);
    const d2 = new Date(arrivalDate).setHours(0, 0, 0, 0);

    const days = (d1 - d2) / 1000 / 60 / 60 / 24;

    return (
      (this.form.value.rooms as RoomType[])
        .map((room) => room)
        .filter(Boolean)
        .reduce((acc, prev) => acc + prev.price, 0) * days
    );
  }
}
