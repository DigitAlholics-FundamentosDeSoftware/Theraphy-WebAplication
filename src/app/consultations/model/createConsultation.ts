export interface CreateConsultation {
  id: number;
  done: boolean;
  topic: string;
  diagnosis: string;
  date: string;
  hour: string;
  place: string;
  physiotherapistId: number;
}

export class CreateConsultation {
  constructor(
    public id: number,
    public done: boolean,
    public topic: string,
    public diagnosis: string,
    public date: string,
    public hour: string,
    public place: string,
    public physiotherapistId: number,
  ) {

  }
}
