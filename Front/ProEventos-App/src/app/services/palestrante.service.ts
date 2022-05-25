import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPaginatedResult } from '../models/IPagination';
import { IPalestrante } from '../models/IPalestrante';

@Injectable({
  providedIn: 'root',
})
export class PalestranteService {
  baseURL = environment.apiURL + 'api/Palestrante';

  constructor(private http: HttpClient) {}

  public getPalestrantes(
    page?: number,
    itemsPerPage?: number,
    term?: string
  ): Observable<IPaginatedResult<IPalestrante[]>> {
    const paginatedResult: IPaginatedResult<IPalestrante[]> = new IPaginatedResult<
      IPalestrante[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    if (term != null && term != '') params = params.append('term', term);

    return this.http
      .get<IPalestrante[]>(this.baseURL + '/all', { observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.has('Pagination')) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  public getPalestrante(): Observable<IPalestrante> {
    return this.http
      .get<IPalestrante>(`${this.baseURL}`)
      .pipe(take(1));
  }

  public post(): Observable<IPalestrante> {
    return this.http
      .post<IPalestrante>(this.baseURL, {} as IPalestrante)
      .pipe(take(1));
  }

  public put(palestrante: IPalestrante): Observable<IPalestrante> {
    return this.http
      .put<IPalestrante>(`${this.baseURL}`, palestrante)
      .pipe(take(1));
  }
}
