export class Category {
  public id: number;
  public title: string;
  public icon: string;
  public description: string;

  constructor(id: number, title: string, icon: string, description?: string) {
    this.id = id;
    this.title = title;
    this.icon = icon;
    this.description = description;
  }
}
