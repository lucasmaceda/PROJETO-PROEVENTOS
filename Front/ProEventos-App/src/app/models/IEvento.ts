import { ILote } from "./ILote";
import { IPalestranteEvento } from "./IPalestranteEvento";
import { IRedeSocial } from "./IRedeSocial";

export interface IEvento {
  Id: number;
  Local: string;
  DataEvento?: Date;
  Tema: string;
  QtdPessoas: number;
  ImagemURL: string;
  Telefone: string;
  Email: string;
  Lotes: ILote[];
  RedeSocial: IRedeSocial[];
  Palestrante: IPalestranteEvento[];
}
