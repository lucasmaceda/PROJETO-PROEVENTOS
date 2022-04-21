import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEvento } from '../models/IEvento';
import { IPaginatedResult } from '../models/IPagination';

@Injectable()
export class EventoService {
  baseURL = environment.apiURL + "api/Evento";

  constructor(private http: HttpClient) { }

  public getEventos(page?: number, itemsPerPage?: number, term?: string): Observable<IPaginatedResult<IEvento[]>> {
    const paginatedResult: IPaginatedResult<IEvento[]> = new IPaginatedResult<IEvento[]>();

    let params = new HttpParams;

    if(page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize',   itemsPerPage.toString());
    }

    if(term != null && term != "")
      params = params.append("term", term);

    return this.http
      .get<IEvento[]>(this.baseURL, { observe: 'response', params })
      .pipe(take(1),
           map((response) => {
            paginatedResult.result = response.body;

            if(response.headers.has('Pagination')){
              paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }

            return paginatedResult;
           }));
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
