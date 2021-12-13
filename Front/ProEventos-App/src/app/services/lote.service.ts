import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';
import { ILote } from '../models/ILote';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  baseURL = "https://localhost:7031/api/Lote";

  constructor(private http: HttpClient) { }

  public getLotesByEventoId(eventoId: number): Observable<ILote[]> {
    return this.http
               .get<ILote[]>(`${this.baseURL}/${eventoId}`)
               .pipe(take(1));
  }

  public saveLote(eventoId: number, lotes: ILote[]): Observable<ILote[]> {
    return this.http
               .put<ILote[]>(`${this.baseURL}/${eventoId}`, lotes)
               .pipe(take(1));
  }

  public deleteLote(eventoId: number, loteId: number): Observable<any> {
    return this.http
               .delete(`${this.baseURL}/${eventoId}/${loteId}`)
               .pipe(take(1));
  }

}
