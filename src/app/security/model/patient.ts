import {User} from "./CreateUsers/user";

export interface Patient {
  id: number,
  dni: string,
  age: number,
  photoUrl: string,
  birthdayDate: string,
  appointmentQuantity: number,
  location: string
  user: User
}
