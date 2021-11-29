import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvento } from '../models/IEvento';

@Injectable()
export class EventoService {
  baseURL = "https://localhost:7031/api/Evento";

  constructor(private http: HttpClient) { }

  getEventos(): Observable<IEvento[]> {
    return this.http.get<IEvento[]>(this.baseURL);
  }

  getEventosByTema(tema: string): Observable<IEvento[]> {
    return this.http.get<IEvento[]>(`${this.baseURL}/${tema}/tema`);
  }

  getEventoById(id: number): Observable<IEvento> {
    return this.http.get<IEvento>(`${this.baseURL}/${id}`);
  }
}
