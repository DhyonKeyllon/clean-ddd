import { UniqueEntityID } from "./unique-entity-id";

export class Entity<Props> {
  private _id: UniqueEntityID;
  protected props: Props;

  get id() {
    return this._id;
  }

  // leaves the constructor protected to be called only by itself or by child classes
  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ?? new UniqueEntityID(id);
  }
}
