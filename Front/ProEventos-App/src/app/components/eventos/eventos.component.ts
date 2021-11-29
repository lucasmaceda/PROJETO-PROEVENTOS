import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IEvento } from '../../models/IEvento';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  modalRef?: BsModalRef;

  public eventos: IEvento[] = [];
  public eventosFiltrados: IEvento[] = [];

  public larguraImagem: number = 100;
  public margemImagem: number = 2;
  public mostrarImagem: boolean = true;
  private _filtroLista: string = '';

  constructor(private eventoService: EventoService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService) { }

  public ngOnInit(): void {
    this.spinner.show();
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

  public filtrarEventos(filtrarPor: string): IEvento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento
              .Tema
              .toLocaleLowerCase()
              .indexOf(filtrarPor) !== -1 ||
            evento
              .Local
              .toLocaleLowerCase()
              .indexOf(filtrarPor) !== -1
    );
  }

  public ocultarImagem(): void {
    this.mostrarImagem = !this.mostrarImagem;
  }

  public getEventos(): void {
    this.eventoService
        .getEventos()
        .subscribe({
          next: (_eventos: IEvento[]) => {
            this.eventos = _eventos;
            this.eventosFiltrados = this.eventos;
          },
          error: (error: any) => {
            this.spinner.hide();
            this.toastr.success('Erro ao carregar os eventos.', 'Erro!');
          },
          complete: () => this.spinner.hide()
        });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('O evento foi deletado com sucesso.', 'Deletado!');
  }

  decline(): void {
    this.modalRef?.hide();
  }

}
