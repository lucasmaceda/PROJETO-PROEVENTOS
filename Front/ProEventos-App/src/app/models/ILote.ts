import { IEvento } from "./IEvento";

export interface ILote {
  Id: number;
  Nome: string;
  Preco: number;
  DataInicio?: Date;
  DataFim?: Date;
  Quantidade: number;
  EventoId: number;
  Evento?: IEvento;
}
