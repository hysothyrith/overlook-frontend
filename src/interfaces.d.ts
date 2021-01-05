interface Booking {
  id: number;
  check_in_date: string;
  check_out_date: string;
  hotel: Hotel;
  roomType: RoomType;
}

interface BookingForm {
  hotel: number;
  persons: number;
  checkInDate: string;
  checkOutDate: string;
}

interface BookingOffer {
  id: number;
  roomType: RoomType;
  quantity: number;
}

interface Hotel {
  id: number;
  name: string;
  streetAddress: string;
  city: string;
  country: string;
  zip: string;
}

interface Image {
  id: number;
  src: string;
  alt: string;
}

interface Registration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RoomType {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface SignInCredential {
  email: string;
  password: string;
}

interface SpotlightSlide {
  id: number;
  imageSrc: string;
  imageAlt: string;
  caption: string;
  title: string;
  description: string;
  hotelId: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserState {
  token: string | null;
  user: User | null;
}
