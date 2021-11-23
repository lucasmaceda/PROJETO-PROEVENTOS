import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];

  larguraImagem: number = 100;
  margemImagem: number = 2;
  mostrarImagem: boolean = true;
  private _filtroLista: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  public get filtroLista() {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ?
                            this.filtrarEventos(this.filtroLista) :
                            this.eventos;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento:
        {
          tema: string;
          local: string;
        }
      ) => evento
              .tema
              .toLocaleLowerCase()
              .indexOf(filtrarPor) !== -1 ||
            evento
              .local
              .toLocaleLowerCase()
              .indexOf(filtrarPor) !== -1
    );
  }

  ocultarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  public getEventos(): void {
    this.http
        .get('https://localhost:7031/api/Evento')
        .subscribe(
          response =>
          {
            this.eventos = response;
            this.eventosFiltrados = this.eventos;
          },
          error => console.log(error)
        );
  }

}
