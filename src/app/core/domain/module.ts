export class Module {
  public id: number;
  public year: number;
  public semmster: number;
  public abb: string;
  public name: string;
  public spcailtyId: number;

  constructor(year: number, semmster: number, abb: string, name: string, spcailtyId: number, id?: number) {
    this.id = id;
    this.year = year;
    this.semmster = semmster;
    this.abb = abb;
    this.name = name;
    this.spcailtyId = spcailtyId;
  }
}
