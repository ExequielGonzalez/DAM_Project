export class Electrovalvula{
  private _evId: number;
  private _nombre: string;
  private _apertura: number;

  constructor(evId: number, nombre: string, apertura: number){
      this._evId=evId;
      this._nombre=nombre;
      this._apertura=apertura;
  }

  public get evId(): number {
      return this._evId;
  }
  public set evId(value: number) {
      this._evId = value;
  }

  public get nombre(): string {
      return this._nombre;
  }
  public set nombre(value: string) {
      this._nombre = value;
  }

  public get apertura(): number {
      return this._apertura;
  }
  public set apertura(value: number) {
      this._apertura = value;
  }
}
