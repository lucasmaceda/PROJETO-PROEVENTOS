import { IEvento } from "./IEvento";
import { IPalestrante } from "./IPalestrante";

export interface IRedeSocial {
  Id: number;
  Nome: string;
  URL: string;
  EventoId?: number;
  Evento?: IEvento;
  PalestranteId?: number;
  Palestrante?: IPalestrante;
}
