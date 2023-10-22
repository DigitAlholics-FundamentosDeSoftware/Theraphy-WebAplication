export interface User {
  id: number,
  firstname: string,
  lastname: string,
  username: string,
  password: string,
  role: string;
}

export class User {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public username: string,
    public password: string,
    public role: string
  ) {}
}
