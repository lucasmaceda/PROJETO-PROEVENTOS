import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ValidatorField } from 'src/app/helpers/ValidatorField';
import { UserUpdate } from 'src/app/models/identity/UserUpdate';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form!: FormGroup;
  userUpdate = {} as UserUpdate;

  get formGet(): any { return this.form.controls; };

  constructor(
    private formBuilder: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.validation();
    this.carregarUsuario();
  }

  private carregarUsuario(): void {
    this.spinner.show();

    this.accountService.getUser().subscribe(
      (userRetorno: UserUpdate) => {
        this.userUpdate = userRetorno;
        this.form.patchValue(this.userUpdate);
        this.toastr.success('Usuario Carregado', 'Sucesso');
      },
      (error) => {
        console.log(error);
        this.toastr.error('Usuario nao carregado', 'Erro');
        this.router.navigate(['/dashboard']);
      }
    )
    .add(() => this.spinner.hide());
  }

  private validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmePassword')
    }

    this.form = this.formBuilder.group({
      username: [''],
      titulo: ['NaoInformado', Validators.required],
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      descricao: [''],
      funcao: ['NaoInformado', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', [
        Validators.minLength(4),
        Validators.nullValidator
      ]],
      confirmePassword: ['', Validators.nullValidator]
    }, formOptions);
  }

  onSubmit(): void {
    if(this.form.invalid) {
      this.atualizarUsuario();
    }
  }

  public atualizarUsuario() {
    this.userUpdate = { ...this.form.value }
    this.spinner.show();

    this.accountService.updateUser(this.userUpdate).subscribe(
      () => this.toastr.success('Usuario atualizado!', 'Sucesso'),
      (error) => {
        this.toastr.error(error.error);
        console.log(error);
      },
    ).add(() => this.spinner.hide());
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

}
