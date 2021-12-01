import { Component, OnInit } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  form!: FormGroup;

  get formGet(): any {
    return this.form?.controls;
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validation();
  }

  public validation(): void {
    this.form = this.formBuilder.group({
      Tema: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]],
      Local: ['', Validators.required],
      DataEvento: ['', Validators.required],
      QtdPessoas: ['', [
        Validators.required,
        Validators.max(120000)
      ]],
      Telefone: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      // ImagemURL: new FormControl(),
    });
  }

}
