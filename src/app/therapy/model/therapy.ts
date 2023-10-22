import {Patient} from "../../security/model/patient";
import {Physiotherapist} from "../../security/model/physiotherapist";

export interface Therapy {
  id: number,
  therapyName: string,
  description: string,
  appointmentQuantity: string,
  startAt: string,
  finishAt: string,
  finished: boolean,
  patient: Patient,
  physiotherapist: Physiotherapist

}
