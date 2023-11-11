import {Physiotherapist} from "../../security/model/physiotherapist";
import {Patient} from "../../security/model/patient";

export interface Job {
  id: number;
  position: string;
  organization: string;
  physiotherapist: Physiotherapist;
}
