export interface CreatePhysiotherapist {
  id: number,
  dni: string,
  specialization: string,
  age: number,
  location: string,
  photoUrl: string,
  birthdayDate: string,
  rating: number,
  consultationQuantity: number,
  patientQuantity: number,
  yearsExperience: number,
  fees: number
}

export class CreatePhysiotherapist{
  constructor(
    public id: number,
    public dni: string,
    public specialization: string,
    public age: number,
    public location: string,
    public photoUrl: string,
    public birthdayDate: string,
    public rating: number,
    public consultationQuantity: number,
    public patientQuantity: number,
    public yearsExperience: number,
    public fees: number
  ) {
  }
}
