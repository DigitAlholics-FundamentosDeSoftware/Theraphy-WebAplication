import {Physiotherapist} from "../../security/model/physiotherapist";

export interface Certification {
  id: number;
  title: string;
  school: string;
  year: string;
  physiotherapist: Physiotherapist;
}
