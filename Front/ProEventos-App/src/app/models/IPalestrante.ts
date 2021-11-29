import { IPalestranteEvento } from "./IPalestranteEvento";
import { IRedeSocial } from "./IRedeSocial";

export interface IPalestrante {
  Id: number;
  Nome: string;
  MiniCurriculo: string;
  ImagemURL: string;
  Telefone: string;
  Email: string;
  RedeSocial: IRedeSocial[];
  PalestranteEvento: IPalestranteEvento[];
}
