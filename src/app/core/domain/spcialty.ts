export class Specialty {
  public id: number;
  public form: number;
  public to: number;
  public abb: string;
  public name: string;

  constructor(form: number, to: number, abb: string, name: string, id?: number) {
    this.id = id;
    this.form = form;
    this.to = to;
    this.abb = abb;
    this.name = name;
  }
}
