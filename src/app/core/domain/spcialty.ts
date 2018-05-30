export class Specialty {
  public id: number;
  public from: number;
  public to: number;
  public abb: string;
  public name: string;

  constructor(from: number, to: number, abb: string, name: string, id?: number) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.abb = abb;
    this.name = name;
  }
}
