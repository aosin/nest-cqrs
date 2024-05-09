export class AddContactCommand {
  constructor(
    public name: string,
    public tags?: string,
  ) {}
}
