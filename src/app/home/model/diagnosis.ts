import {Physiotherapist} from "../../security/model/physiotherapist";
import {Patient} from "../../security/model/patient";

export interface Diagnosis {
  id: number;
  physiotherapist: Physiotherapist
  patient: Patient;
  diagnosis: string;
  date: string;

}
