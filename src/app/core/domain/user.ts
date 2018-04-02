export class User {
  public id: number;
  public firstName: string;
  public about: string;
  public lastName: string;
  public email: string;
  public username: string;
  public password: string;
  public year: number;
  public specialtyId: number;
  public isAdmin: boolean;
  public remmberMe: boolean;
  public verified: boolean;
  public profileImage: string;

  constructor(username: string, password: string,
              firstName?: string, lastName?: string, about?: string,
              email?: string, year?: number, specialtyId?: number,
              isAdmin?: boolean, remmberMe?: boolean, verified?: boolean, profileImage?: string) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.about = about;
    this.email = email;
    this.year = year;
    this.specialtyId = specialtyId;
    this.isAdmin = isAdmin;
    this.remmberMe = remmberMe;
    this.verified = verified;
    this.profileImage = profileImage;
  }

}
