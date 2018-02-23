export class User {
  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _username: string;
  private _password: string;
  private _year: number;
  private _specialty: number;


  constructor(username: string, password: string,
              firstName?: string, lastName?: string,
              email?: string, year?: number, specialty?: number) {
    this._username = username;
    this._password = password;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._year = year;
    this._specialty = specialty;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get year(): number {
    return this._year;
  }

  set year(value: number) {
    this._year = value;
  }

  get specialty(): number {
    return this._specialty;
  }

  set specialty(value: number) {
    this._specialty = value;
  }
}
