export class Key {
  constructor(
    public keyName: string,
    public roomName: string,
    public borrowed: boolean = false,
    public borrowedBy?: string | null,
    public borrowedAt?: Date | undefined
  ) {}
}
