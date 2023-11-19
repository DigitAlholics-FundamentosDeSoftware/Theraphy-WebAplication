import {Physiotherapist} from "../../security/model/physiotherapist";
import {Patient} from "../../security/model/patient";

export interface Review {
  id: number;
  content: string;
  score: number;
  physiotherapist: Physiotherapist;
  patient: Patient;

}
