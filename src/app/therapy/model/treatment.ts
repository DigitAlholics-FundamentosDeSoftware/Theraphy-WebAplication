import {Therapy} from "./therapy";

export interface Treatment {
  id: number,
  therapy: Therapy
  videoUrl: string,
  duration: string,
  title: string,
  description: string,
  day: string,
  viewed: boolean,
  date: string
}
