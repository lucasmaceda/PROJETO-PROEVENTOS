import { IPalestrante } from "./IPalestrante";
import { IEvento } from "./IEvento";

export interface IPalestranteEvento {
  PalestranteId: number;
  Palestrante: IPalestrante;
  EventoId: number;
  Evento?: IEvento;
}
