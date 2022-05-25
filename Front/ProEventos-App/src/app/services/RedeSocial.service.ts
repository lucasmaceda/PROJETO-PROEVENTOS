import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IRedeSocial } from '../models/IRedeSocial';

@Injectable({
  providedIn: 'root',
})
export class RedeSocialService {
  baseURL = environment.apiURL + 'api/RedeSocial';

  constructor(private http: HttpClient) {}

  /**
   *
   * @param origem Precisa passar a palavra 'palestrante' ou 'evento' - Escrito em minúsculo.
   * @param id Precisa passar o PalestranteId ou o EventoId dependendo da sua Origem.
   * @returns Observable<RedeSocial[]>
   */
  public getRedesSociais(origem: string, id: number): Observable<IRedeSocial[]> {
    let URL =
      id === 0
        ? `${this.baseURL}/${origem}`
        : `${this.baseURL}/${origem}/${id}`;

    return this.http.get<IRedeSocial[]>(URL).pipe(take(1));
  }

  /**
   *
   * @param origem Precisa passar a palavra 'palestrante' ou 'evento' - Escrito em minúsculo.
   * @param id Precisa passar o PalestranteId ou o EventoId dependendo da sua Origem.
   * @param redesSociais Precisa adicionar Redes Sociais organizadas em RedeSocial[].
   * @returns Observable<RedeSocial[]>
   */
  public saveRedesSociais(
    origem: string,
    id: number,
    redesSociais: IRedeSocial[]
  ): Observable<IRedeSocial[]> {

    console.log(redesSociais);

    let URL =
      id === 0
        ? `${this.baseURL}/${origem}`
        : `${this.baseURL}/${origem}/${id}`;

    return this.http.put<IRedeSocial[]>(URL, redesSociais).pipe(take(1));
  }

   /**
   *
   * @param origem Precisa passar a palavra 'palestrante' ou 'evento' - Escrito em minúsculo.
   * @param id Precisa passar o PalestranteId ou o EventoId dependendo da sua Origem.
   * @param redeSocialId Precia usar o id da Rede Social
   * @returns Observable<any> - Pois é o retorno da Rota.
   */
    public deleteRedeSocial(
      origem: string,
      id: number,
      redeSocialId: number
    ): Observable<any> {
      let URL =
        id === 0
          ? `${this.baseURL}/${origem}/${redeSocialId}`
          : `${this.baseURL}/${origem}/${id}/${redeSocialId}`;

      return this.http.delete(URL).pipe(take(1));
    }
}
