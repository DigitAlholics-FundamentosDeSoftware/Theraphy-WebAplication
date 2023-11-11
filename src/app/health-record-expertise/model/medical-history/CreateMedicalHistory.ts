export interface CreateMedicalHistory {
  id:number;
  gender:string;
  size: number;
  weight: number;
  birthplace: string;
  hereditaryHistory: string;
  nonPathologicalHistory: string;
  pathologicalHistory: string;
}

export class CreateMedicalHistory {
  constructor(
    public id: number,
    public gender: string,
    public size: number,
    public weight: number,
    public birthplace: string,
    public hereditaryHistory: string,
    public nonPathologicalHistory: string,
    public pathologicalHistory: string,
  ) {

  }
}
