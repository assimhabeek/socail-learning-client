export class Attachment {

  id: number;
  link: string;
  name: string;

  constructor(id: number, name: string, link: string) {
    this.id = id;
    this.name = name;
    this.link = link;
  }

}
