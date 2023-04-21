export class Key {
  id?: number; // make id optional since it will be assigned by the database
  name: string;
  room: string;
  borrowed: boolean = false;
  borrowedBy?: string | null;
  borrowedAt?: Date;

  constructor(name: string, room: string, borrowedBy?: string, borrowedAt?: Date) {
    this.name = name;
    this.room = room;
    this.borrowedBy = borrowedBy;
    this.borrowedAt = borrowedAt;
  }
}
