import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from 'src/app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form!: FormGroup;

  get formGet(): any { return this.form?.controls; };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validation();
  }

  private validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmeSenha')
    }

    this.form = this.formBuilder.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      descricao: [''],
      telefone: [''],
      userName: ['', Validators.required],
      senha: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmeSenha: ['', Validators.required]
    }, formOptions);
  }

}
