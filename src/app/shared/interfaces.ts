export interface Room {
  id: number;
  typeId: number;
  type?: string;
}

export interface Booking {
  id: number;
  arrivalDate: Date;
  departureDate: Date;
  bill: number;
  rooms?: Room[];
  roomsNums?: number[];
  guests?: Guest[];
  inCharge?: Staff;
}

export interface Booking_Room {
  id: number;
  bookingId: number;
  roomId: number;
}

export interface Staff_Booking {
  id: number;
  staffId: number;
  bookingId: number;
}

export interface Booking_Breakfast {
  id: number;
  breakfastId: number;
  bookingId: number;
}

export interface Tour {
  id: number;
  title: string;
  commonAmount: number;
  amountOfGuests: number;
  description: string;
  price: number;
}
export interface Breakfast {
  id: number;
  menu: string;
  price: number;
}

export interface Staff {
  id: number;
  firstName: string;
  lastName: string;
  rating: number;
  salary: number;
  positionId?: number;
  position?: string;
}

export interface Position {
  id: number;
  basicSalary: number;
  name: string;
}

export interface Description {
  description: string;
}

export interface Id {
  id: number;
}

export interface RoomType {
  id: number;
  type: string;
  price: number;
  roomsAmount: number;
  guestsAmount: number;
}

export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  rating?: number;
  bookings: Booking[];
}

export interface Guest_Booking {
  id: number;
  idGuest: number;
  idBooking: number;
}

export interface Guest_Tour {
  id: number;
  guestId: number;
  tourId: number;
}
