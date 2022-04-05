import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEvento } from '../models/IEvento';

@Injectable()
export class EventoService {
  baseURL = environment.apiURL + "api/Evento";

  constructor(private http: HttpClient) { }

  public getEventos(): Observable<IEvento[]> {
    return this.http
      .get<IEvento[]>(this.baseURL)
      .pipe(take(1));
  }

  public getEventosByTema(tema: string): Observable<IEvento[]> {
    return this.http
      .get<IEvento[]>(`${this.baseURL}/${tema}/tema`)
      .pipe(take(1));
  }

  public getEventoById(id: number): Observable<IEvento> {
    return this.http
      .get<IEvento>(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }

  public post(evento: IEvento): Observable<IEvento> {
    return this.http
      .post<IEvento>(this.baseURL, evento)
      .pipe(take(1));
  }

  public put(evento: IEvento): Observable<IEvento> {
    return this.http
      .put<IEvento>(`${this.baseURL}/${evento.id}`, evento)
      .pipe(take(1));
  }

  public deleteEvento(id: number): Observable<any> {
    return this.http
      .delete(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }

  postUpload(eventoId: number, file: File): Observable<IEvento> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
                 .post<IEvento>(`${this.baseURL}/upload-image/${eventoId}`, formData)
                 .pipe(take(1));
  }

}
