export class Key {
  id!: number;
  name: string;
  room: string;
  borrowed: boolean = false;
  borrowedBy?: string | null;
  borrowedAt?: Date;

  constructor(name: string, room: string) {
    this.name = name;
    this.room = room;
  }
}
