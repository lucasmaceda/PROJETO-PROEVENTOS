import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounce, debounceTime, Subject } from 'rxjs';
import { IEvento } from 'src/app/models/IEvento';
import { IPaginatedResult, IPagination } from 'src/app/models/IPagination';
import { EventoService } from 'src/app/services/evento.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  modalRef?: BsModalRef;

  public eventos: IEvento[] = [];
  public eventosFiltrados: IEvento[] = [];
  public eventoId = 0;
  public pagination = {} as IPagination;

  public larguraImagem: number = 100;
  public margemImagem: number = 2;
  public imagem: boolean = false;

  constructor(private eventoService: EventoService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  public ngOnInit(): void {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1
    } as IPagination;

    this.carregarEventos();
  }

  termoBuscaChanged: Subject<string> = new Subject<string>();

  public filtrarEventos(event: any): void {
    if(this.termoBuscaChanged.observers.length === 0)
    {
      this.termoBuscaChanged.pipe(debounceTime(500)).subscribe(
        filtrarPor => {
          this.spinner.show();

          this.eventoService.getEventos(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            filtrarPor
          ).subscribe(
            (paginatedResult: IPaginatedResult<IEvento[]>) => {
              this.eventos = paginatedResult.result;
              this.pagination = paginatedResult.pagination;
            },
            (error: any) => {
              this.spinner.hide();
              this.toastr.error('Erro ao carregar os eventos.', 'Erro!');
            }
          ).add(() => this.spinner.hide());
        }
      );
    }

    this.termoBuscaChanged.next(event.value);
  }

  public ocultarImagem(): void {
    this.imagem = !this.imagem;
  }

  public carregarImagem(imagemURL: string): string {
    return imagemURL !== '' ?
            `${environment.apiURL}resources/images/${imagemURL}`
            : 'assets/img/semImagem.jpeg';
  }

  public carregarEventos(): void {
    this.spinner.show();

    this.eventoService.getEventos(
      this.pagination.currentPage,
      this.pagination.itemsPerPage
    ).subscribe(
        (paginatedResult: IPaginatedResult<IEvento[]>) => {
          this.eventos = paginatedResult.result;
          this.pagination = paginatedResult.pagination;
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar os eventos.', 'Erro!');
        },
      ).add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, eventoId: number) {
    event.stopPropagation();
    this.eventoId = eventoId
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public pageChanged(event): void {
    this.pagination.currentPage = event.page;
    this.carregarEventos();
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventoService
        .deleteEvento(this.eventoId)
        .subscribe(
          (result: any) => {
            if(result.message === 'Deletado') {
              this.toastr.success('O evento foi deletado com sucesso.', 'Deletado!');
              this.carregarEventos();
            }
          },
          (error: any) => {
            console.error(error);
            this.toastr.error(`Erro ao tentar deletar o evento ${this.eventoId}`, 'Erro');
          }
        ).add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }

}
