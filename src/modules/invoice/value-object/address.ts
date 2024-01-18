export default class Address {
  _street: string = "";
  _number: string = "";
  _zip: string = "";
  _city: string = "";
  _complement: string = "";
  _state: string = "";

  constructor(
    street: string,
    number: string,
    complement: string,
    city: string,
    state: string,
    zip: string
  ) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this._complement = complement;
    this._state = state;
    this.validate();
  }
  get street(): string {
    return this._street;
  }
  get number(): string {
    return this._number;
  }
  get zip(): string {
    return this._zip;
  }
  get city(): string {
    return this._city;
  }
  get complement(): string {
    return this._complement;
  }
  get state(): string {
    return this._state;
  }

  validate(): void {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
    if (this._number.length === 0) {
      throw new Error("Number is required");
    }
    if (this._zip.length === 0) {
      throw new Error("Zip is required");
    }
    if (this._city.length === 0) {
      throw new Error("City is required");
    }
    if (this._complement.length === 0) {
      throw new Error("Complement is required");
    }
    if (this._state.length === 0) {
      throw new Error("State is required");
    }
  }
  toString() {
    return `${this._street} ${this._number} ${this._zip} ${this._city} ${this._complement} ${this._state}`;
  }
}
