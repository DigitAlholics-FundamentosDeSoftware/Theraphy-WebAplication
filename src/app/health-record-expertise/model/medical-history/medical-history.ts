import {Patient} from "../../../security/model/patient";

export interface MedicalHistory {
  id:number;
  patient: Patient;
  gender:string;
  size: number;
  weight: number;
  birthplace: string;
  hereditaryHistory: string;
  nonPathologicalHistory: string;
  pathologicalHistory: string;
}
