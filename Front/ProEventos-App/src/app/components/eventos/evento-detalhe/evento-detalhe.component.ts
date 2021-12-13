import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoteService } from './../../../services/lote.service';
import { AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventoService } from 'src/app/services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray,
         FormBuilder,
         FormControl,
         FormGroup,
         Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { IEvento } from 'src/app/models/IEvento';
import { ILote } from 'src/app/models/ILote';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  modalRef!: BsModalRef;
  eventoId!: number;
  evento = {} as IEvento;
  form!: FormGroup;
  estadoSalvar = 'post';
  loteAtual = { id: 0, nome: '', indice: 0 };

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  get formGet(): any {
    return this.form?.controls;
  }

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  constructor(private localeService: BsLocaleService,
              private activatedRouter: ActivatedRoute,
              private eventoService: EventoService,
              private modalService: BsModalService,
              private spinner: NgxSpinnerService,
              private loteService: LoteService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private router: Router) {
                this.localeService.use('pt-br');
              }

  ngOnInit() {
    this.carregarEvento();
    this.validation();
  }

  public carregarEvento(): void {
    this.eventoId = +this.activatedRouter
                              .snapshot
                              .paramMap
                              .get('id')!;

    if(this.eventoId !== null && this.eventoId !== 0)
    {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService
          .getEventoById(this.eventoId)
          .subscribe(
            (evento: IEvento) => {
              this.evento = {...evento};
              this.form.patchValue(this.evento);
              this.carregarLotes();
            },
            (error: any) => {
              this.toastr.error('Erro ao tentar carregar Evento.')
              console.error(error);
            }
          ).add(() => this.spinner.hide());
    }
  }

  public carregarLotes(): void {
    this.loteService
        .getLotesByEventoId(this.eventoId)
        .subscribe(
          (lotesRetorno: ILote[]) => {
            lotesRetorno.forEach(lote => {
              this.lotes.push(this.criarLote(lote));
            });
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar carregar lotes', 'Erro');
            console.log(error);
          }
        ).add(() => this.spinner.hide());
  }

  public validation(): void {
    this.form = this.formBuilder.group({
      tema: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [
        Validators.required,
        Validators.max(120000)
      ]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', [Validators.required]],
      lotes: this.formBuilder.array([])
    });
  }

  public adicionarLote(): void {
    this.lotes.push(this.criarLote({id: 0} as ILote));
  }

  public criarLote(lote: ILote): FormGroup {
    return this.formBuilder.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      preco: [lote.preco, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim]
    });
  }

  public mudarValorData(value: Date,
                        indice: number,
                        campo: string) {
    this.lotes.value[indice][campo] = value;
  }

  public retornaTituloLote(nome: string): string {
    return nome === null ||
           nome === '' ? 'Nome do lote' : nome;
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarEvento(): void {
    this.spinner.show();

    if (this.form.valid)
    {
      if(this.estadoSalvar === 'post')
      {
        this.evento = {...this.form.value};

        this.eventoService
        ['post'](this.evento)
        .subscribe(
          (eventoRetorno: IEvento) => {
            this.toastr.success('Evento salvo com Sucesso!', 'Sucesso');
            this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
          },
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao salvar evento', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
      else
      {
        this.evento = {id: this.evento.id ,...this.form.value};

        this.eventoService
        ['put'](this.evento)
        .subscribe(
          () => this.toastr.success('Evento atualizado com Sucesso!', 'Sucesso'),
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Error ao atualizar evento', 'Erro');
          },
          () => this.spinner.hide()
        );
      }

    }
  }

  public salvarLotes(): void {
    if (this.form.controls['lotes'].valid) {
      this.spinner.show();

      this.loteService
          .saveLote(this.eventoId,
                    this.form.value.lotes)
          .subscribe(
            () => {
              this.toastr.success('lotes salvos com sucesso!', 'Sucesso!');
            },
            (error: any) => {
              this.toastr.error('Erro ao tentar salvar lotes.', 'Erro');
              console.log(error);
            }
          ).add(() => this.spinner.hide());
    }
  }

  public removerLote(template: TemplateRef<any>, indice: number): void {
    this.loteAtual.id = this.lotes.get(indice + '.id')?.value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome')?.value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmDeleteLote(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.loteService
      .deleteLote(this.eventoId, this.loteAtual.id)
      .subscribe(
        () => {
          this.toastr.success('Lote deletado com sucesso', 'Sucesso');
          this.lotes.removeAt(this.loteAtual.indice);
        },
        (error: any) => {
          this.toastr.error(
            `Erro ao tentar deletar o Lote ${this.loteAtual.id}`,
            'Erro'
          );
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  declineDeleteLote(): void {
    this.modalRef.hide();
  }

}
