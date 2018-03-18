export class User {
  public id: number;
  public firstName: string;
  public about: string;
  public lastName: string;
  public email: string;
  public username: string;
  public password: string;
  public year: number;
  public specialty: number;


  constructor(username: string, password: string,
              firstName?: string, lastName?: string, about?: string,
              email?: string, year?: number, specialty?: number) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.about = about;
    this.email = email;
    this.year = year;
    this.specialty = specialty;
  }

}
