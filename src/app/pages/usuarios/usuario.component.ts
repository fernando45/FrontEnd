import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Output,
         EventEmitter, OnDestroy} from '@angular/core';
import { User, Roles } from '../../../../.src/app/generated/types';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { UserQuery } from 'src/app/services/usuario/usuario.graphql-gen';
import { Subscription} from 'rxjs';
import { FormBuilder,  FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsersValidator } from '../../validators/usuarios/users-validators';
import { AddUserMutation } from '../../services/usuario/usuario.graphql-gen';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuarioComponent implements OnDestroy {

  botonVisible: boolean = true;

  constructor( private servicio: UsuarioService, private cdRef: ChangeDetectorRef,
               private fb: FormBuilder, private validador: UsersValidator)   {
  }


get fbControls() {return this.contactForm.controls; }




contactForm: FormGroup;
roles = Roles ;

nombreControl: AbstractControl;
emailControl: AbstractControl;
roleControl: AbstractControl;
passControl: AbstractControl;



usuario: User;
id: string = null;
popupVisible: boolean = false;
popupHeight: string = '550';



private UserService: Subscription = null;
private Guarda: Subscription = null;


@Output() Resultado = new EventEmitter<boolean>();




  showModal(): void {
    this.popupVisible = true;
  }

  public Actualiza( id: string) {
     this.cargaUsuario( id );
  }

  activaPass() {
    if (this.passControl.enabled) {
      this.passControl.disable();
      this.popupHeight = '550';
    } else {
      this.passControl.enable();
      this.popupHeight = '600';
    }
    this.cdRef.markForCheck();
  }

buildForm() {
  this.contactForm = this.fb.group({
    _id: [this.id],
    email: [this.usuario.email , [Validators.required, Validators.email], this.validador.emailExist.bind(this.servicio)],
    nombre: [this.usuario.nombre, [Validators.required, Validators.minLength(6), Validators.maxLength(20)] ],
    role: [this.usuario.role, Validators.required ],
    password: [{disabled: true, value: null }, Validators.required]


  },
    { updateOn: 'blur' }
  );

  this.nombreControl = this.contactForm.controls.nombre;
  this.emailControl = this.contactForm.controls.email;
  this.roleControl = this.contactForm.controls.role;
  this.passControl = this.contactForm.controls.password;


  this.contactForm.statusChanges.subscribe(() => {
    this.cdRef.markForCheck();
  });

  if ( !this.usuario._id === null ) {
  // tslint:disable-next-line: forin
    for ( const i in this.contactForm.controls) {
      const control = this.contactForm.controls[i];
      if ( control.invalid) {
        control.markAsDirty();
      }
   }
  }
}


cargaUsuario( id: string ) {
    this.UserService = this.servicio.getUser( id )
        .subscribe( (resp: UserQuery) => {
          this.usuario = resp.userPorId.user;
          this.id = resp.userPorId.user._id;
          this.buildForm();
          this.popupVisible = true;
          this.cdRef.markForCheck();
        });
  }

  nuevoUsuario() {
    this.usuario = {
      nombre: '',
      email: '',
      password: '',
      google: false,
      role: this.roles.Usuario,
      estado: true,
      img: ''

    };
    this.buildForm();
    this.botonVisible = false;
    this.passControl.enable();
    this.cdRef.markForCheck();
    this.popupVisible = true;
  }

cerrar() {
    this.popupVisible = false;
    this.botonVisible = true;
    this.passControl.disable();
    this.cdRef.markForCheck();
}

guardar() {

  if ( this.contactForm.dirty && this.contactForm.valid) {
    this.usuario = this.contactForm.value;

    let esOK: boolean = true;
    let mensa: string = '';   

    if (this.usuario._id === null) {
     
      this.Guarda = this.servicio.newUser( this.usuario)
        .subscribe( (data: AddUserMutation) => {
          const result = data.register.status;
          if ( result === false) {
            esOK = false;
            mensa = data.register.message;
          }  else {
            this.Resultado.emit(true);
            this.cerrar();
          }
        });

    } else {

      this.Guarda = this.servicio.actualizarUsuario( this.usuario)
      .subscribe( (data) => {
        const result = data.status;
        if ( result === false) {
          esOK = false;
          console.log( data.message );
          mensa = data.message;
        } else {
          this.Resultado.emit(true);
          this.cerrar();
        }
      });

    }

  } else {
    this.cerrar();
  }
}

  ngOnDestroy(): void {
    if ( !this.UserService === null) {  this.UserService.unsubscribe(); }
    if ( !this.Guarda === null ) {this.Guarda.unsubscribe(); }
  }

}
