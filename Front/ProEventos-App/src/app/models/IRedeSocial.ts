import { IEvento } from "./IEvento";
import { IPalestrante } from "./IPalestrante";

export interface IRedeSocial {
  id: number;
  nome: string;
  url: string;
  eventoId: number;
  palestranteId: number;
}
